/** 正常检测方案的编辑保存证明；复用既有force-save/status与temp字节读回，不调用批次commit或跨purpose伪造收据。 */
import { receiptFor } from "./batchSaveSession.js";
const validId = value => /^[1-9][0-9]*$/.test(String(value || ""));
const signature = context => JSON.stringify([String(context?.actorId),String(context?.taskListId),String(context?.taskPoolId),context?.fileKey,context?.documentKey,context?.sessionEpoch]);

/** 原保存R按本人/任务/真实文件隔离；存储只含公开关联身份，无token或签名。 */
export function normalPlanSaveProofStore(storage, context) {
  const key = `limis.plan.normal.force.v1.${context.actorId}.${context.taskListId}.${context.fileKey}`;
  return {
    read() { try { const value=storage.getItem(key);return value ? JSON.parse(value) : null; } catch { return { storageUnavailable:true }; } },
    keep(request) { try { const raw=JSON.stringify(request);storage.setItem(key,raw);return storage.getItem(key)===raw; } catch { return false; } },
    archive(request, contentSha256) {
      try { const originalKey=key+".completed."+request.saveRequestId;
        const record=JSON.stringify({request,contentSha256}),old=storage.getItem(originalKey);
        if(old && old!==record)return false;storage.setItem(originalKey,record);return storage.getItem(originalKey)===record;
      } catch { return false; }
    },
    clear(request) { try { const old=this.read();if(old?.saveRequestId===request.saveRequestId)storage.removeItem(key); } catch { /* 保留原R，仅允许查询。 */ } },
  };
}

/** 构造独立保存状态；未编辑正常文件继续走原{id}，已编辑只能自动保存核验后返回params。 */
export function createNormalPlanSaveState() { return { binding:null,generation:0,revision:0,edited:false,sending:false,ready:false,busy:false,pending:null,notice:"" }; }

/** 保存过程中身份/路由/文件/Core会话变化使证明失效；未知保存只能查原R，不再发command。 */
export function createNormalPlanSaveProof(state, api, options={}) {
  const timeout=options.timeoutMs ?? 12000,tick=options.tickMs ?? 400;
  const pause=options.pause || (ms=>new Promise(resolve=>setTimeout(resolve,ms)));
  function bind(context) {
    if (signature(context)===signature(state.binding)) return;
    state.generation++;state.binding={...context};state.ready=false;state.sending=false;state.busy=false;state.revision=0;state.edited=false;
    const stored=normalPlanSaveProofStore(api.storage(),context).read();
    state.pending=stored;state.edited=Boolean(stored);state.notice=stored ? "原文档保存结果仍待核验，将只读查询原保存请求，不会重新保存。" : "";
  }
  function changed(event) {
    if (event===true || event?.data===true) {state.edited=true;state.revision++;state.sending=true;}
    else if (event===false || event?.data===false) state.sending=false;
  }
  function current(request, generation) {
    return generation===state.generation && signature(state.binding)===signature(api.context())
      && request.actorId===String(state.binding.actorId) && request.taskListId===String(state.binding.taskListId)
      && request.fileKey===state.binding.fileKey && request.documentKey===state.binding.documentKey
      && request.sessionEpoch===state.binding.sessionEpoch;
  }
  const fail=message=>{state.notice=message;return {ok:false,message};};
  async function prepare(context) {
    bind(context);
    // 未编辑兼容路径不新增force-save调用，Core仍核当前原字节和无pending条件。
    if (!state.edited && !state.pending) return {ok:true,params:null};
    if (state.busy) return fail("文档保存正在核验，请等待原保存结果。");
    if (!state.ready || state.sending || !validId(context.actorId) || !validId(context.taskListId) || !context.fileKey || !context.documentKey) {
      return fail("请完成单元格编辑并等待当前文档连接就绪，再生成方案；系统将自动保存核验。");
    }
    const generation=state.generation,revision=state.revision,store=normalPlanSaveProofStore(api.storage(),context);
    let request=state.pending;state.busy=true;
    try {
      if (request?.storageUnavailable) return fail("浏览器未能保留原文档保存记录，请恢复存储后再办理，当前没有生成方案。");
      if (!request) {
        request={actorId:String(context.actorId),taskListId:String(context.taskListId),taskPoolId:String(context.taskPoolId),
          fileKey:context.fileKey,documentKey:context.documentKey,sessionEpoch:context.sessionEpoch,revision,saveRequestId:api.newId()};
        if (!store.keep(request)) return fail("无法保留本次文档保存记录，当前没有发送保存或生成。");
        state.pending=request;state.notice="正在自动保存当前文档并核对原保存结果，请稍候。";
        // 写前保留原R，失败/离页也不再次调用force-save。ACK并非完成证据。
        try { await api.force(request.fileKey,request.documentKey,request.saveRequestId); }
        catch { /* 原保存结果未知，继续只读查询同R；绝不重发。 */ }
      }
      if (!current(request,generation)) return fail("当前身份或文档会话已变化，原保存证明不可用于新页面；请核对原保存结果。");
      const deadline=Date.now()+timeout;
      do {
        let response;
        try {response=await api.status(request.fileKey,request.saveRequestId);} catch (err) {
          response = (err && typeof err === "object" && err.msg) ? err : {code:500,msg:String(err?.message||err||"status未知")};
        }
        if (!current(request,generation)) return fail("任务、账号或文档会话已变化，未提交生成。原保存请求已保留。");
        const receipt=receiptFor(response,request);
        if (receipt.kind==="CONFIRMED") {
          const bytes=await api.readBytes(request.fileKey);
          if (!current(request,generation) || !(bytes instanceof ArrayBuffer) || !bytes.byteLength) return fail("当前文档字节或会话尚未核对完整，未提交生成。");
          const digest=await api.hash(bytes);
          if (!current(request,generation) || digest!==receipt.contentSha256) return fail("当前文件与原回调摘要不一致，原请求已保留，未提交生成。");
          // 原R已确切完成但后续编辑使proof失效：留档旧R后仅允许下一次显式保存最新内容，绝不自动再写。
          if (state.revision!==revision || request.revision!==revision) {
            if (store.archive(request,digest)) {store.clear(request);state.pending=null;}
            return fail("原保存已核验，但之后还有新编辑。请完成当前输入，再点击生成；系统会自动保存核验最新内容。");
          }
          if (!state.ready || state.sending) return fail("保存期间文档或来源已有变化，原收据不能证明最新编辑，未提交生成；请核对原结果。");
          if (!store.archive(request,digest)) return fail("原保存证据未能留档，当前没有生成，请恢复浏览器存储后办理。");
          store.clear(request);state.pending=null;state.notice="当前文档已按原保存请求完成字节核验，可以生成方案。";
          return {ok:true,params:{fileKey:request.fileKey,documentKey:request.documentKey,saveRequestId:request.saveRequestId,contentSha256:digest}};
        }
        if (receipt.kind==="INVALID" || receipt.kind==="SUPERSEDED") {
          const raw = response?.msg || response?.message || "";
          const tag = /entry_batch_source|doesn.?t exist|不存在|BadSqlGrammar|Table /i.test(raw) ? "缺表/SQL"
            : /不属于|属主|owner/i.test(raw) ? "属主" : raw ? "业务失败" : "收据INVALID";
          return fail(raw
            ? `文档保存核验失败（${tag}）：${raw}；未提交生成。`
            : "文档保存核验失败（收据INVALID/SUPERSEDED；常见真因：缺表 entry_batch_source 或属主不符）；请查 Core 日志，未提交生成。");
        }
        await pause(tick);
      } while (Date.now()<deadline);
      return fail("文档保存结果仍待确认，请查询原保存结果；未重复保存，也未提交生成。");
    } catch {return fail("原文档保存或字节读回尚未确认，请查询原结果；未重新发送保存或生成。");}
    finally {if (generation===state.generation) state.busy=false;}
  }
  return {bind,changed,prepare};
}
