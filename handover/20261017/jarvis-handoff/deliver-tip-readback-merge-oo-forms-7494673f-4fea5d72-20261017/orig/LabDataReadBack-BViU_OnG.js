/**
 * TIP A2 open-gate FE · LabDataReadBack (forms field snapshot only)
 * Baseline ORIG: tip 55343dd9 (prior forms-snapshot tip already on disk)
 * Aligns with warehouse lei-web/src/views/lab/list/LabDataReadBack.vue
 * Hot path: entry forms by-task + forms/{id} only; no draft-batch resolve; no OO book.
 * Hang: replace assets/.../LabDataReadBack-BViU_OnG.js (keep filename) after RD-VERIFY + product release.
 */
import{D as G,_ as ne,r as d,b as re,B as k,w as se,m as b,o as f,p,i as l,h as _,s as w,c as q,F as ie,t as E,q as T,e as W,E as R}from"./index-B3030jDs.js";
import{g as $,a as ce}from"./entry-DNkp2ApF.js";
import{n as ve}from"./requestId-Dle7j20r.js";

function ye(g){return G({url:"/lab/entry/forms/proofread",method:"post",data:g})}
function _e(g){return G({url:"/lab/entry/forms/review",method:"post",data:g})}

const rowClass={class:"readback-row"},
labelClass={class:"readback-label"},
valueClass={class:"readback-value"},
fieldsWrap={class:"readback-fields"},
emptyClass={key:0,class:"readback-empty"},
footerClass={class:"dialog-footer"},
beComp={__name:"LabDataReadBack",props:{modelValue:Boolean,row:{type:Object,default:()=>({})}},emits:["update:modelValue","blocked","changed"],setup(g,{emit:H}){
  const m=g,x=H,L=d(!1),v=d(null),h=d(""),K=d(!1),M=d(!1),J=re(),P=k(()=>J.roles||[]),
  Q={SUBMITTED:"已提交",PROOFREAD:"已校对",REVIEWED:"已审核"},
  X=k(()=>{const e=v.value&&v.value.status;return e&&Q[e]||e||"-"}),
  Y=k(()=>{const e=v.value&&v.value.status;return e==="REVIEWED"?"success":e==="SUBMITTED"||e==="PROOFREAD"?"warning":"info"}),
  z=k(()=>P.value.includes("admin")),
  Z=k(()=>z.value||P.value.some(e=>e==="labProofreader"||e==="syy")),
  ee=k(()=>z.value||P.value.some(e=>e==="labAuditor"||e==="syszr")),
  fields=k(()=>v.value&&Array.isArray(v.value.fields)?v.value.fields:[]);

  function N(e){return e&&(e.completedEntryFormId||e.entryFormId||e.entry_form_id)||null}
  function displayValue(field){
    const raw=v.value&&v.value.values?v.value.values[field.field_key]:null;
    if(raw==null)return"";
    if(typeof raw==="object"&&raw.value!=null){const unit=raw.unit!=null?" "+raw.unit:"";return String(raw.value)+unit}
    return String(raw)
  }

  /** Main path: forms/{id} after by-task id resolve; never draft-batch resolve / OO book */
  async function I(){
    L.value=!0;h.value="";v.value=null;
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
      if(o&&o.fields){v.value=o}
      else{h.value="录入表单回读失败：服务端未返回字段快照。";x("blocked",{reason:"entry_form_unavailable"})}
    }catch(i){
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
    return f(),p(F,{"model-value":g.modelValue,title:"查看录入数据",width:"76%",top:"4vh","append-to-body":"","destroy-on-close":"","onUpdate:modelValue":s[1]||(s[1]=r=>x("update:modelValue",r))},{
      footer:l(()=>[W("div",footerClass,[
        Z.value?(f(),p(t,{key:0,type:"warning",loading:K.value,onClick:oe},{default:l(()=>[w("校对")]),_:1},8,["loading"])):T("",!0),
        ee.value?(f(),p(t,{key:1,type:"primary",loading:M.value,onClick:le},{default:l(()=>[w("审核")]),_:1},8,["loading"])):T("",!0),
        _(t,{onClick:s[0]||(s[0]=r=>x("update:modelValue",!1))},{default:l(()=>[w("关 闭")]),_:1})
      ])]),
      default:l(()=>[
        _(n,{class:"mb8",type:"info",closable:!1,title:"只读回读：显示已录入的实验数据字段值与提交状态，不可修改。"}),
        L.value?(f(),p(u,{key:0,rows:6,animated:""})):
        h.value?(f(),p(c,{key:1,icon:"warning",title:"暂不能回读录入数据","sub-title":h.value},{extra:l(()=>[_(t,{type:"primary",icon:"Refresh",onClick:I},{default:l(()=>[w("重试")]),_:1})]),_:1},8,["sub-title"])):
        v.value?(f(),q(ie,{key:2},[
          _(o,{column:2,border:"",size:"small",class:"mb8"},{default:l(()=>[
            _(O,{label:"检测点位"},{default:l(()=>{var r;return[w(E(((r=g.row)==null?void 0:r.checkPoint)||"-"),1)]}),_:1}),
            _(O,{label:"检测项目"},{default:l(()=>{var r;return[w(E(((r=g.row)==null?void 0:r.productSecondItem)||"-"),1)]}),_:1}),
            _(O,{label:"模板"},{default:l(()=>[w(E(v.value.template_name||"-")+"（v"+E(v.value.template_version||"-")+"）",1)]),_:1}),
            _(O,{label:"状态"},{default:l(()=>[_(i,{type:Y.value,size:"small"},{default:l(()=>[w(E(X.value),1)]),_:1},8,["type"])]),_:1})
          ]),_:1}),
          W("div",fieldsWrap,renderFields())
        ],64)):T("",!0)
      ]),_:1},8,["model-value"])
  }
}},
Oe=ne(beComp,[["__scopeId","data-v-1528a5e1"]]),
xe=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"}));
export{Oe as L,xe as a,ye as p,_e as r};
