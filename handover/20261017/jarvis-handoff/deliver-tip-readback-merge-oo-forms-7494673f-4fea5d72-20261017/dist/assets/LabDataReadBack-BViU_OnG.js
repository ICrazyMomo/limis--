/**
 * TIP readback-merge-oo-forms · LabDataReadBack (甲+丙 · 乙二期)
 * Baseline ORIG(现网): b4ca9359 纯 forms 开屏闸
 * 准修: 7494673f · 补钉: 5bde3ea6 · 叠基 FINAL 观察钉: 7080b882
 * 刀面: ①取 forms 快照 ②软探 resolve-draft 明确 found+fileKey→只读 OO
 *       ③非明确 found→一律 forms（乙未齐保守）④不可归类→业务可读句
 * 禁: 默认重新生成 / bak 热换当交付 / 自 LIVE / 案1 / 密钥 / 动 /lab/entry
 * Hang: 同名覆写 assets/LabDataReadBack-BViU_OnG.js（不覆写 index-B3030jDs）
 */
import{D as G,_ as ne,r as d,b as re,B as k,w as se,m as b,o as f,p,i as l,h as _,s as w,c as q,F as ie,t as E,q as T,e as W,E as R}from"./index-B3030jDs.js";
import{O as ue}from"./index-NJVZXfJd.js";
import{g as $,a as ce}from"./entry-DNkp2ApF.js";
import{r as de,b as me}from"./entryBatch-vbmxXr3M.js";
import{n as ve}from"./requestId-Dle7j20r.js";

function ye(g){return G({url:"/lab/entry/forms/proofread",method:"post",data:g})}
function _e(g){return G({url:"/lab/entry/forms/review",method:"post",data:g})}

const rowClass={class:"readback-row"},
labelClass={class:"readback-label"},
valueClass={class:"readback-value"},
fieldsWrap={class:"readback-fields"},
emptyClass={key:0,class:"readback-empty"},
footerClass={class:"dialog-footer"},
officeLoading={key:1,class:"office-loading"},
officeLoadingText={class:"office-loading-text"},
beComp={__name:"LabDataReadBack",props:{modelValue:Boolean,row:{type:Object,default:()=>({})}},emits:["update:modelValue","blocked","changed"],setup(g,{emit:H}){
  const m=g,x=H,L=d(!1),v=d(null),h=d(""),K=d(!1),M=d(!1),
  /* viewMode: "forms" | "oo" | "" */
  viewMode=d(""),
  D=d(!1),U=d(""),C=d(""),S=d(null),A=d(""),
  J=re(),P=k(()=>J.roles||[]),
  Q={SUBMITTED:"已提交",PROOFREAD:"已校对",REVIEWED:"已审核"},
  X=k(()=>{const e=v.value&&v.value.status;return e&&Q[e]||e||"-"}),
  Y=k(()=>{const e=v.value&&v.value.status;return e==="REVIEWED"?"success":e==="SUBMITTED"||e==="PROOFREAD"?"warning":"info"}),
  z=k(()=>P.value.includes("admin")),
  Z=k(()=>z.value||P.value.some(e=>e==="labProofreader"||e==="syy")),
  ee=k(()=>z.value||P.value.some(e=>e==="labAuditor"||e==="syszr")),
  fields=k(()=>v.value&&Array.isArray(v.value.fields)?v.value.fields:[]),
  V=k(()=>!!(C.value&&S.value)),
  dialogTitle=k(()=>viewMode.value==="oo"?"查看录入数据（OnlyOffice）":"查看录入数据");

  function N(e){return e&&(e.completedEntryFormId||e.entryFormId||e.entry_form_id)||null}
  function displayValue(field){
    const raw=v.value&&v.value.values?v.value.values[field.field_key]:null;
    if(raw==null)return"";
    if(typeof raw==="object"&&raw.value!=null){const unit=raw.unit!=null?" "+raw.unit:"";return String(raw.value)+unit}
    return String(raw)
  }
  function te(e){A.value=(e==null?void 0:e.message)||"OnlyOffice 文档服务加载失败"}

  /**
   * Soft probe: only explicit found===true + fileKey counts as has-book.
   * Anything else (catch / !200 / found!==true / no fileKey) → not explicit → forms (乙未齐保守).
   * Does NOT call document/generate (禁默认重新生成).
   */
  async function softProbeDraft(templateId,items){
    let a;
    try{a=await de("lab",templateId,items)}catch(err){
      /* resolve-draft 抛错（含缺表）→ 非明确 found → forms */
      return{kind:"no_book",reason:"probe_throw",err}
    }
    if(!a||a.code!==200){
      /* 业务非200 → 非明确 found → forms（乙未齐；不可把 ERROR 当有簿） */
      return{kind:"no_book",reason:"probe_not_200",resp:a}
    }
    if(a.data&&a.data.found===!0&&a.data.fileKey){
      return{kind:"has_book",fileKey:a.data.fileKey}
    }
    /* 明确 found=false 或无 fileKey → forms */
    return{kind:"no_book",reason:"found_false_or_no_key",resp:a}
  }

  async function openOoReadOnly(fileKey){
    U.value="正在打开已有草稿簿…";D.value=!0;
    const y=await me(fileKey,"view");
    const ok=y&&y.code===200&&y.data&&y.data.documentServerUrl&&y.data.documentConfig;
    if(!ok){
      const msg=(y&&y.msg)||"读取 OnlyOffice 回读配置失败";
      throw new Error(msg)
    }
    C.value=y.data.documentServerUrl;S.value=y.data.documentConfig;viewMode.value="oo"
  }

  /** 甲主路径：forms 快照 → 软探 → OO 或 forms */
  async function I(){
    L.value=!0;h.value="";v.value=null;viewMode.value="";
    A.value="";C.value="";S.value=null;D.value=!1;U.value="";
    let n=N(m.row);
    if(!n&&m.row&&m.row.id){
      try{const i=await $(m.row.id),o=i&&i.data;n=o&&(o.entry_form_id||o.id)?(o.entry_form_id||o.id):null}catch{n=null}
    }
    if(!n){
      h.value="当前列表数据未包含录入表单标识，请强刷页面（Ctrl+Shift+R）并重新登录后再试；若仍出现本提示，请将页面截图与地址栏URL反馈给管理员。";
      x("blocked",{reason:"entry_form_id_missing"});L.value=!1;return
    }
    try{
      const i=await ce(n),o=i&&i.data;
      if(!(o&&o.fields)){
        h.value="录入表单回读失败：服务端未返回字段快照。";
        x("blocked",{reason:"entry_form_unavailable"});return
      }
      v.value=o;
      /* 软探草稿簿（禁默认生成） */
      const probe=await softProbeDraft(o.template_id,[{labTaskListId:m.row.id}]);
      if(probe.kind==="has_book"){
        try{
          await openOoReadOnly(probe.fileKey)
        }catch(ooErr){
          /* 有簿但 OO 配置失败 → 不可归类业务句；不偷降为「无簿 forms」、亦不硬开空 OO */
          v.value=null;viewMode.value="";
          h.value=(ooErr&&(ooErr.msg||ooErr.message))||"已确认有草稿簿，但读取 OnlyOffice 回读配置失败，请稍后重试或联系管理员。";
          x("blocked",{reason:"oo_config_failed",error:ooErr});return
        }
      }else{
        /* 非明确 found → 一律 forms */
        viewMode.value="forms"
      }
    }catch(i){
      v.value=null;viewMode.value="";
      h.value=(i==null?void 0:i.msg)||(i==null?void 0:i.message)||"录入表单回读失败";
      x("blocked",{reason:"entry_form_unavailable",error:i})
    }finally{L.value=!1}
  }

  async function j(e,s,n){
    let u=N(m.row);
    if(!u&&m.row&&m.row.id){
      try{const t=await $(m.row.id),c=t&&t.data;u=c&&(c.entry_form_id||c.id)?c.entry_form_id||c.id:null}catch{u=null}
    }
    if(!u){h.value="当前列表数据未包含录入表单标识，无法执行操作。";return}
    try{await R.confirm(n+"确认","确认后状态将推进，是否继续？",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"})}catch{return}
    s.value=!0;
    try{
      const t=await e({entry_form_id:u,request_id:ve()});
      t&&t.code===200?(R.alert("操作成功",n,{type:"success",confirmButtonText:"确定"}),await I(),x("changed")):R.alert(t&&t.msg||"服务端拒绝",n+"失败",{type:"error",confirmButtonText:"确定"})
    }catch(t){R.alert((t==null?void 0:t.msg)||(t==null?void 0:t.message)||"操作失败",n+"失败",{type:"error",confirmButtonText:"确定"})}
    finally{s.value=!1}
  }
  const oe=()=>j(ye,K,"校对"),le=()=>j(_e,M,"审核");

  function renderFields(){
    const list=fields.value;
    if(!list.length)return[W("div",emptyClass,"暂无字段快照")];
    return list.map(r=>W("div",{class:"readback-row",key:r.field_key},[
      W("span",labelClass,E(r.field_label||r.field_key),1),
      W("span",valueClass,E(displayValue(r)||"-"),1)
    ]))
  }

  return se(()=>m.modelValue,e=>{var s;e&&((s=m.row)!=null&&s.id)&&I()},{immediate:!0}),
  (e,s)=>{
    const n=b("el-alert"),u=b("el-skeleton"),t=b("el-button"),c=b("el-result"),
    O=b("el-descriptions-item"),i=b("el-tag"),o=b("el-descriptions"),F=b("el-dialog");
    return f(),p(F,{"model-value":g.modelValue,title:dialogTitle.value,width:viewMode.value==="oo"?"92%":"76%",top:viewMode.value==="oo"?"3vh":"4vh","append-to-body":"","destroy-on-close":"","onUpdate:modelValue":s[1]||(s[1]=r=>x("update:modelValue",r))},{
      footer:l(()=>[W("div",footerClass,[
        Z.value?(f(),p(t,{key:0,type:"warning",loading:K.value,onClick:oe},{default:l(()=>[w("校对")]),_:1},8,["loading"])):T("",!0),
        ee.value?(f(),p(t,{key:1,type:"primary",loading:M.value,onClick:le},{default:l(()=>[w("审核")]),_:1},8,["loading"])):T("",!0),
        /* 禁「重新生成」按钮（准修丙） */
        _(t,{onClick:s[0]||(s[0]=r=>x("update:modelValue",!1))},{default:l(()=>[w("关 闭")]),_:1})
      ])]),
      default:l(()=>[
        _(n,{class:"mb8",type:"info",closable:!1,title:viewMode.value==="oo"?"OnlyOffice 只读回读：已打开已有草稿簿（未重新生成）。编辑和批量录入请从任务列表的批量录入入口进入。":"只读回读：显示已录入的实验数据字段值与提交状态，不可修改。"}),
        L.value?(f(),p(u,{key:0,rows:6,animated:""})):
        h.value?(f(),p(c,{key:1,icon:"warning",title:viewMode.value==="oo"?"暂不能打开 OnlyOffice 回读":"暂不能回读录入数据","sub-title":h.value},{extra:l(()=>[_(t,{type:"primary",icon:"Refresh",onClick:I},{default:l(()=>[w("重试")]),_:1})]),_:1},8,["title","sub-title"])):
        v.value?(f(),q(ie,{key:2},[
          _(o,{column:2,border:"",size:"small",class:"mb8"},{default:l(()=>[
            _(O,{label:"检测点位"},{default:l(()=>{var r;return[w(E(((r=g.row)==null?void 0:r.checkPoint)||"-"),1)]}),_:1}),
            _(O,{label:"检测项目"},{default:l(()=>{var r;return[w(E(((r=g.row)==null?void 0:r.productSecondItem)||"-"),1)]}),_:1}),
            _(O,{label:"模板"},{default:l(()=>[w(E(v.value.template_name||"-")+"（v"+E(v.value.template_version||"-")+"）",1)]),_:1}),
            _(O,{label:"状态"},{default:l(()=>[_(i,{type:Y.value,size:"small"},{default:l(()=>[w(E(X.value),1)]),_:1},8,["type"])]),_:1})
          ]),_:1}),
          viewMode.value==="oo"?(
            V.value?(f(),p(ue,{key:10,"document-server-url":C.value,"document-config":S.value,mode:"view",height:"64vh",onError:te},null,8,["document-server-url","document-config"]))
            :(f(),p(c,{key:11,icon:"warning",title:"OnlyOffice 回读配置不完整","sub-title":A.value||"服务端未返回可用的只读文档配置"},null,8,["sub-title"]))
          ):W("div",fieldsWrap,renderFields())
        ],64)):T("",!0)
      ]),_:1},8,["model-value","title","width","top"])
  }
}},
Oe=ne(beComp,[["__scopeId","data-v-1528a5e1"]]),
xe=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"}));
export{Oe as L,xe as a,ye as p,_e as r};
