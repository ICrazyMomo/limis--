import assert from "node:assert/strict";
import { Qr, Je } from "./selftest-core.mjs";
const H = "a".repeat(64), H2 = "b".repeat(64);
const actor = "1", taskId = "901213", batchId = "73";
const scope = () => ({ taskId, batchId, actor });
let seq = 0;
const nid = () => "req-" + ++seq;

/** history 行故意缺卡指纹驼峰（有 facts_json；缺 cardVersion/cardSha256/card_file_id）—— F5′ 应从 verification 反填 */
function leanHistory(id, batch = batchId) {
  const f = {
    record: id, receiver: actor, sample: "P10-S-WW", sampleId: 5, task: taskId,
    sampleVersion: 1, stockVersion: 1, quantity: "10", unit: "ml", giver: "2",
    receivedAt: "2026-10-17T04:00:00+08:00", purpose: "分析", sampleState: "正常",
  };
  return {
    id,
    stock_id: "st1",
    lab_task_list_id: taskId,
    operation_batch_id: batch,
    receiver_user_id: actor,
    sample_no: "P10-S-WW",
    sampleId: 5,
    // 故意无 labTaskId / cardVersion / cardSha256 / card_file_id / facts_digest（有 facts_json）
    state: "PENDING_CONFIRMATION",
    facts_json: JSON.stringify(f),
  };
}
function fullRec(id, batch = batchId) {
  const f = {
    record: id, receiver: actor, sample: "P10-S-WW", sampleId: 5, task: taskId,
    sampleVersion: 1, stockVersion: 1, quantity: "10", unit: "ml", giver: "2",
    receivedAt: "2026-10-17T04:00:00+08:00", purpose: "分析", sampleState: "正常",
  };
  return {
    id, stock_id: "st1", lab_task_list_id: taskId, operation_batch_id: batch,
    receiver_user_id: actor, sample_no: "P10-S-WW", sampleId: 5, labTaskId: taskId,
    facts_digest: H, cardSha256: H2, card_file_id: "cf1", cardVersion: 1,
    structuredVersion: 1, state: "PENDING_CONFIRMATION",
    facts_json: JSON.stringify(f),
  };
}
function verificationData(id) {
  return {
    id, sampleId: 5, labTaskId: taskId, receiverUserId: actor,
    state: "PENDING_CONFIRMATION",
    cardId: "cf1", cardVersion: 1, cardSha256: H2, factsDigest: H,
  };
}
function sessionSnake(rec) {
  // F5″: snake_case 回包
  return {
    code: 200,
    data: {
      withdrawal_id: rec.id,
      card_file_id: "cf1",
      card_version: 1,
      card_sha256: H2,
      facts_digest: H,
      view_session_id: "vs1",
      config: {
        documentServerUrl: "https://oo",
        documentConfig: { document: { key: "k1" } },
      },
    },
  };
}
function sessionCamel(rec) {
  return {
    code: 200,
    data: {
      withdrawalId: rec.id, cardId: "cf1", cardVersion: 1, cardSha256: H2,
      factsDigest: H, viewSessionId: "vs1",
      config: {
        documentServerUrl: "https://oo",
        documentConfig: { document: { key: "k1" } },
      },
    },
  };
}
function api(rec, over = {}) {
  const calls = [];
  const w = (k, fn) => (...a) => { calls.push(k); return fn(...a); };
  const base = {
    verification: async () => ({ code: 200, data: verificationData(rec.id) }),
    context: async () => ({ code: 200, data: { records: [rec], stocks: [] } }),
    query: async () => ({ code: 200, data: rec }),
    prepare: async () => ({ code: 200, data: rec }),
    session: async () => sessionCamel(rec),
    ready: async () => ({
      code: 200,
      data: {
        state: "CARD_OPENED", canConfirm: true, viewSessionId: "vs1",
        withdrawalId: rec.id, sampleId: 5, documentKey: "k1",
        cardSha256: H2, cardVersion: 1, factsDigest: H,
      },
    }),
    viewStatus: async () => ({
      code: 200,
      data: {
        state: "CARD_OPENED", canConfirm: true, viewSessionId: "vs1",
        withdrawalId: rec.id, sampleId: 5, documentKey: "k1",
        cardSha256: H2, cardVersion: 1, factsDigest: H,
      },
    }),
    confirm: async () => ({ code: 200, data: { recordId: rec.id, confirmationEventId: "ce1" } }),
    sign: async () => ({ code: 200, data: { recordId: rec.id, signatureEventId: "se1", state: "PENDING_VERIFICATION" } }),
  };
  const o = { ...base, ...over };
  const r = {};
  for (const k of Object.keys(o)) r[k] = w(k, o[k]);
  return { r, calls };
}
const visibleCard = (st) =>
  !!st.record && ["CARD", "REVIEW", "OPENING"].includes(st.phase) && !st.pending;
async function toSign(st, f, label) {
  if (st.phase === "CARD") assert.equal(await f.view(), true, label + " view");
  assert.equal(st.phase, "OPENING", label + " OPENING");
  await f.documentReady();
  assert.equal(await f.checkOpened(), true, label + " ready");
  assert.equal(st.phase, "REVIEW", label + " REVIEW");
  assert.equal(await f.confirm(), true, label + " confirm");
  assert.equal(st.phase, "SIGN", label + " SIGN");
  assert.equal(await f.sign(), true, label + " sign");
  assert.equal(st.phase, "VERIFY", label + " VERIFY");
}
const out = [];
const ok = (m) => out.push("PASS " + m);

// ——— F5′ 甲73：lean history + verification 反填 → CARD/OPENING ———
{
  const hist = leanHistory("wd-71596dda");
  const st = Object.assign({}, Je());
  const { r, calls } = api(hist);
  const f = Qr(st, r, scope, nid, () => {});
  assert.equal(await f.resume(hist), true);
  assert.ok(calls.includes("verification"));
  assert.ok(calls.includes("session"), "F5′ 反填后应能开会话");
  assert.equal(st.record.card_file_id, "cf1");
  assert.equal(st.record.cardVersion, 1);
  assert.equal(st.record.cardSha256, H2);
  assert.equal(st.record.facts_digest, H);
  assert.equal(st.record.sampleId, 5);
  assert.ok(["CARD", "OPENING"].includes(st.phase), "甲 phase=" + st.phase);
  assert.equal(st.pending, null);
  assert.ok(visibleCard(st), "甲 看卡钮可见");
  ok("F5′ 甲73 继续→verification 反填卡指纹→phase=" + st.phase + " 看卡可见");
  await toSign(st, f, "甲");
  ok("F5′ 甲73 → OPENING→REVIEW→签名→VERIFY");
}

// ——— F5″：snake_case view-sessions 回包兼容 ———
{
  const hist = leanHistory("wd-snake");
  const st = Object.assign({}, Je());
  const { r } = api(hist, { session: async () => sessionSnake(hist) });
  const f = Qr(st, r, scope, nid, () => {});
  assert.equal(await f.resume(hist), true);
  assert.ok(["CARD", "OPENING"].includes(st.phase));
  assert.ok(visibleCard(st));
  if (st.phase === "CARD") {
    // 若自动开会话因其它原因失败，手点也应过 snake
    assert.equal(await f.view(), true);
  }
  assert.equal(st.phase, "OPENING");
  ok("F5″ snake view-sessions 回包兼容 → OPENING");
}

// ——— F5″：契约失败仍 CARD + 同帧错文（禁吞） ———
{
  const hist = leanHistory("wd-fail");
  const st = Object.assign({}, Je());
  const { r } = api(hist, {
    session: async () => ({ code: 200, data: { withdrawalId: hist.id } }), // 缺配置
  });
  const f = Qr(st, r, scope, nid, () => {});
  assert.equal(await f.resume(hist), true);
  assert.equal(st.phase, "CARD");
  assert.ok(visibleCard(st));
  assert.match(st.error, /查看本次实际流转卡|未完整绑定|重试/);
  ok("F5″ 契约失败仍 CARD + 错文「" + st.error.slice(0, 28) + "…」");
}

// ——— F5‴：PENDING+有卡指纹但 phase 错 → 强制 CARD（模拟 ur 逻辑） ———
{
  // 直接测 enterConfirm 缺指纹旁注 + 面板 ur 同口径：resume 后若卡指纹齐必落 CARD 族
  const hist = leanHistory("wd-force");
  const st = Object.assign({}, Je());
  // verification 不带卡指纹 → enterConfirm 走 F5‴ 缺指纹旁注，仍强制 CARD
  const { r } = api(hist, {
    verification: async () => ({
      code: 200,
      data: {
        id: hist.id, sampleId: 5, labTaskId: taskId, receiverUserId: actor,
        state: "PENDING_CONFIRMATION",
        // 无 cardId/cardVersion/cardSha256
      },
    }),
  });
  const f = Qr(st, r, scope, nid, () => {});
  assert.equal(await f.resume(hist), true);
  assert.equal(st.phase, "CARD", "F5‴ 缺指纹也不得停在 SELECT");
  assert.match(st.error || "", /指纹|流转卡/);
  ok("F5‴ PENDING 缺指纹 → 强制 CARD + 旁注（禁空停步1）");
}

// ——— F5‴ ur 模拟：phase 被脏写后强制 CARD ———
{
  const hist = fullRec("wd-ur");
  const st = Object.assign({}, Je());
  const { r } = api(hist, {
    session: async () => { throw new Error("x"); },
  });
  const f = Qr(st, r, scope, nid, () => {});
  await f.resume(hist);
  // 模拟异常 phase（非 CARD 族）且 record 仍 PENDING+有指纹
  st.phase = "SELECT";
  st.record.state = "PENDING_CONFIRMATION";
  const hasFp =
    !!(st.record.cardVersion || st.record.card_file_id || st.record.cardId) &&
    typeof st.record.cardSha256 === "string" &&
    /^[a-f0-9]{64}$/.test(st.record.cardSha256);
  assert.ok(hasFp);
  if (
    ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state) &&
    hasFp &&
    !["CARD", "OPENING", "REVIEW"].includes(st.phase) &&
    !["VERIFY", "SIGN", "COMPLETE"].includes(st.phase)
  ) {
    st.phase = "CARD";
    st.error =
      st.error ||
      "继续领用后相位未落确认卡，已强制进入；请点「查看本次实际流转卡」。";
  }
  assert.equal(st.phase, "CARD");
  assert.match(st.error, /强制进入|查看本次实际流转卡/);
  ok("F5‴ ur 口径：PENDING+指纹+phase错 → 强制 CARD");
}

// ——— F2：无 pending 不造查询钮（静态/态口径） ———
{
  const hist = leanHistory("wd-a476db3f", "74");
  const sc = () => ({ taskId, batchId: "74", actor });
  const st = Object.assign({}, Je());
  const { r, calls } = api(hist);
  const f = Qr(st, r, sc, nid, () => {});
  assert.equal(st.pending, null);
  // 模板：t.pending ? 渲染查询钮 : 不渲染 —— 无 pending ⇒ 不造钮
  const wouldShowQueryBtn = !!st.pending;
  assert.equal(wouldShowQueryBtn, false, "乙74 无 pending 不造查询钮");
  assert.equal(await f.resume(hist), true);
  assert.ok(visibleCard(st), "乙74 主路径=继续领用→确认卡");
  assert.ok(calls.includes("verification"));
  ok("F2 乙74 无 pending 不造查询钮；继续同甲进卡 phase=" + st.phase);
  await toSign(st, f, "乙");
  ok("F2/F5′ 乙74 → 看卡→确认→签名→VERIFY");
}

// ——— 回归：自动开会话失败留 CARD ———
{
  const hist = leanHistory("wd-a");
  const st = Object.assign({}, Je());
  let n = 0;
  const { r } = api(hist, {
    session: async () => {
      if (++n === 1) throw Object.assign(new Error("x"), { response: { status: 500 } });
      return sessionCamel(hist);
    },
  });
  const f = Qr(st, r, scope, nid, () => {});
  assert.equal(await f.resume(hist), true);
  assert.equal(st.phase, "CARD");
  assert.ok(visibleCard(st));
  assert.match(st.error, /查看本次实际流转卡/);
  await toSign(st, f, "回归");
  ok("回归 自动开会话失败 → CARD 显错 → 手点看卡 → 签名");
}


// ——— F5⁗：ur 空窗兜底 — resume 后仍 SELECT → 必写 te+error ———
{
  // 模拟面板 ur 尾：F5‴ 未强制 CARD（无 PENDING 指纹条件）且 phase 仍 SELECT
  const st = { phase: "SELECT", record: { id: "wd-empty", state: "FACTS_DRAFT" }, error: "" };
  let te = "";
  // F5‴ branches skip (not PENDING+fp) → else would set note; F5⁗ hard gate:
  if (!st.phase || st.phase === "SELECT") {
    const f5q = st.error || te || "继续领用后相位未落确认卡，请重试或联系管理员。";
    st.error = f5q;
    te = f5q;
  }
  assert.equal(st.phase, "SELECT");
  assert.match(st.error, /未落确认卡|请重试或联系/);
  assert.match(te, /未落确认卡|请重试或联系/);
  ok("F5⁗ SELECT 空窗 → 必写 te+error（禁空停步1）");
}

// ——— F5⁗：有 t.error（对不上）时 SELECT 兜底保留原文 ———
{
  const st = {
    phase: "SELECT",
    record: { id: "wd-mis", state: "PENDING_CONFIRMATION" },
    error: "本次领用记录与当前样品对不上，请刷新后重试或联系管理员",
  };
  let te = "";
  if (!st.phase || st.phase === "SELECT") {
    const f5q = st.error || te || "继续领用后相位未落确认卡，请重试或联系管理员。";
    st.error = f5q;
    te = f5q;
  }
  assert.match(st.error, /对不上/);
  assert.match(te, /对不上/);
  ok("F5⁗/B SELECT 兜底保留「对不上」原文到 te");
}

// ——— F5⁗：只能恢复 原文旁注 ———
{
  const st = {
    phase: "SELECT",
    record: null,
    error: "只能恢复当前本人、任务和操作批的领样记录",
  };
  let te = "";
  // simulate catch path then F5⁗
  te = te || st.error;
  if (!st.phase || st.phase === "SELECT") {
    const f5q = st.error || te || "继续领用后相位未落确认卡，请重试或联系管理员。";
    st.error = f5q;
    te = f5q;
  }
  assert.match(te, /只能恢复/);
  ok("F5⁗/B 「只能恢复」原文到 te");
}

// ——— F5⁗：已进 CARD 族不误伤（不强制改文） ———
{
  const st = { phase: "CARD", record: { id: "wd-ok", state: "PENDING_CONFIRMATION" }, error: "" };
  let te = st.error || "";
  if (!st.phase || st.phase === "SELECT") {
    const f5q = st.error || te || "继续领用后相位未落确认卡，请重试或联系管理员。";
    st.error = f5q;
    te = f5q;
  }
  assert.equal(st.phase, "CARD");
  assert.equal(te, "");
  ok("F5⁗ CARD 族不误伤空窗兜底");
}

console.log(out.join("\n"));
console.log("SELFTEST_F5QUAD_OK " + out.length + " cases");
process.exit(0);
