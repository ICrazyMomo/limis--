import {
  D as ne,
  ac as br,
  ad as _r,
  _ as wr,
  b as Er,
  B as de,
  M as Pe,
  r as Z,
  w as xe,
  m as U,
  o as k,
  p as G,
  i as p,
  h as y,
  c as ie,
  F as Be,
  Q as Ue,
  f as Ge,
  q as O,
  e as be,
  t as C,
  s as _,
  y as kr,
  z as Sr,
  E as Nr,
} from "./index-B3030jDs.js";
import { O as Cr } from "./index-NJVZXfJd.js";
import { n as Vr } from "./requestId-Dle7j20r.js";
import { J as Or } from "./jszip.min-Bx6_DnlJ.js";
const J =
    "/lab/withdrawals" /*TIP_RHO_R2_TIP1_FE_PENDING_FILL_IDENTITY_20261017*/ /*TIP_RHO_R2_TIP1_FE_NO_DIRTY_RECORD_UR_PHASE_20261017*/ /*TIP_RHO_VIEW_FILES_FILENAME_FE_GRAY_20261016*/ /*TIP_RHO_T1_REQUESTID_QUERY_20261016*/ /*TIP_RHO_FE_CONFIRM_CARD_CONTINUE_20261016*/ /*TIP_T1_SESSION_RESTORE_LIB_REQUESTID_20261016*/ /*TIP_T1_FE_DROP_VIEW_PENDING_QUERY_LIB_KEY_20261016*/ /*TIP_LINGYANG_FE_F5PRIME_9d43c4b0_20261017*/ /*TIP_LINGYANG_FE_F5QUAD_57642542_20261017*/ /*TIP_LINGYANG_FE_F5FIFTH_57945808_20261017*/ /*TIP_LINGYANG_FE_F5SIXTH_6a2d734d_20261017*/,
  H = (e) => encodeURIComponent(String(e)),
  Le = (e) =>
    ne({ url: J + "/tasks/" + H(e), method: "get", silentBusinessError: !0 }),
  Ar = (e) => ne({ url: J, method: "post", data: e, silentBusinessError: !0 }),
  Rr = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/confirm",
      method: "post",
      data: r,
      silentBusinessError: !0,
    }),
  Dr = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/sign",
      method: "post",
      data: r,
      silentBusinessError: !0,
    }),
  Tr = (e) =>
    ne({
      url: J + "/operations/" + H(e),
      method: "get",
      silentBusinessError: !0,
    }),
  qr = (e) =>
    ne({
      url: J + "/tasks/" + H(e) + "/analysis-admission",
      method: "post",
      silentBusinessError: !0,
    }),
  Fr = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/view-sessions",
      method: "post",
      data: r,
      silentBusinessError: !0,
    }),
  Pr = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/view-sessions/" + H(r),
      method: "get",
      silentBusinessError: !0,
    }),
  xr = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/document-ready",
      method: "post",
      data: r,
      silentBusinessError: !0,
    }),
  Br = (e, r) =>
    ne({
      url: J + "/" + H(e) + "/verification",
      method: "post",
      data: r,
      silentBusinessError: !0,
    }),
  We = (e) =>
    ne({
      url: J + "/" + H(e) + "/verification",
      method: "get",
      silentBusinessError: !0,
    });
async function He(e, r) {
  const u = br(),
    c = await _r.get(e, {
      baseURL: "/tlyf",
      responseType: "arraybuffer",
      params: r,
      timeout: 3e4,
      headers: u ? { Authorization: "Bearer " + u } : {},
    }),
    d = c.data;
  if (!(d instanceof ArrayBuffer) || !d.byteLength)
    throw new Error("未获得真实流转卡文件");
  const i = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", d)))
    .map((N) => N.toString(16).padStart(2, "0"))
    .join("");
  return { bytes: d, sha256: i, headers: c.headers };
}
const Ur = (e, r) => He(J + "/" + H(e) + "/card", { requestId: r }),
  je = (e) => He(J + "/" + H(e) + "/signed-file"),
  Ce = (e) => typeof e == "string" && /^[a-f0-9]{64}$/.test(e),
  R = (e) => e != null && String(e).trim() !== "",
  s = (e, r) => String(e) === String(r),
  pe = (e) =>
    typeof e.facts_json == "string" ? JSON.parse(e.facts_json) : e.facts_json,
  he = (e, r) =>
    e &&
    s(e.receiver_user_id, r.actor) &&
    s(e.lab_task_list_id, r.taskId) &&
    s(e.operation_batch_id, r.batchId);
function Gr(e, r) {
  var u, c, d, i, N;
  return !e || (!e.record && !e.pending) || (e.record && !he(e.record, r))
    ? !1
    : ((u = e.pending) == null ? void 0 : u.kind) === "prepare"
      ? s((c = e.pending.payload) == null ? void 0 : c.labTaskId, r.taskId) &&
        s(
          (d = e.pending.payload) == null ? void 0 : d.operationBatchId,
          r.batchId,
        ) &&
        s(
          (i = e.pending.payload) == null ? void 0 : i.sampleId,
          (N = e.stock) == null ? void 0 : N.sampleId,
        )
      : !!e.record && (!e.pending || s(e.pending.recordId, e.record.id));
}
function Lr(e) {
  const r =
    (e == null ? void 0 : e.superseded_by_withdrawal_id) ??
    (e == null ? void 0 : e.supersededByWithdrawalId);
  return r != null && String(r).trim() !== "";
}
function Wr(e) {
  return (
    !e ||
    e.sealBound === !1 ||
    e.seal_bound === !1 ||
    ("seal_id" in e &&
      (e.seal_id == null || String(e.seal_id).trim() === "")) ||
    ("sealId" in e && (e.sealId == null || String(e.sealId).trim() === ""))
  );
}
function Me(e) {
  if (
    (e == null ? void 0 : e.sealBound) === !0 ||
    (e == null ? void 0 : e.seal_bound) === !0
  )
    return 2;
  const r = (e == null ? void 0 : e.sealId) ?? (e == null ? void 0 : e.seal_id);
  return r != null && String(r).trim() !== "" ? 1 : 0;
}
function jr(e, r) {
  return !e || e.actorSealBound !== !0 || !r
    ? []
    : (Array.isArray(e.records) ? e.records : [])
        .filter(
          (c) => he(c, r) && c.state === "SIGN_COMPLETED" && !Lr(c) && !Wr(c),
        )
        .sort(
          (c, d) =>
            Me(d) - Me(c) ||
            String(d.verified_at || d.verifiedAt || "").localeCompare(
              String(c.verified_at || c.verifiedAt || ""),
            ) ||
            String(d.id).localeCompare(String(c.id)),
        );
}
function It(e, r, u, c) {
  const d = e;
  return (
    (d == null ? void 0 : d.verified) === !0 &&
    String(d.actorId) === String(r) &&
    !!d.recordId &&
    /^[a-f0-9]{64}$/.test(d.signatureSha256 || "") &&
    String(d.taskId) === String(u) &&
    String(d.batchId) === String(c)
  );
}
function Mr(e, r) {
  var u, c, d;
  return {
    taskId: r.taskId,
    batchId: r.batchId,
    actorId: r.actor,
    recordId: (u = e.record) == null ? void 0 : u.id,
    verified: e.completed === !0 && e.admitted === !0,
    signatureSha256:
      (d = (c = e.signature) == null ? void 0 : c.result) == null
        ? void 0
        : d.signatureSha256,
  };
}
function Yr(e, r) {
  if (!e || e.code !== 200) return !1;
  const u = e.data && typeof e.data == "object" ? e.data : null;
  if (e.admitted === !1 || (u == null ? void 0 : u.admitted) === !1) return !1;
  const c =
    (u == null ? void 0 : u.operationBatchId) ??
    (u == null ? void 0 : u.operation_batch_id) ??
    e.operationBatchId;
  return c != null && !s(c, r)
    ? !1
    : u && Object.prototype.hasOwnProperty.call(u, "admitted")
      ? u.admitted === !0
      : Object.prototype.hasOwnProperty.call(e, "admitted")
        ? e.admitted === !0
        : !0;
}
function $r(e) {
  const r = e != null && e.data && typeof e.data == "object" ? e.data : null;
  return (
    (r == null ? void 0 : r.withdrawalId) ??
    (r == null ? void 0 : r.recordId) ??
    (r == null ? void 0 : r.withdrawal_id) ??
    (e == null ? void 0 : e.withdrawalId) ??
    (e == null ? void 0 : e.recordId) ??
    null
  );
}
function ve(e) {
  const r = String(e ?? "").trim();
  if (!/^\d{1,12}(?:\.\d{1,6})?$/.test(r))
    throw new Error("请填写有效实际数量，最多6位小数");
  const [u, c = ""] = r.split(".");
  return BigInt(u) * 1000000n + BigInt(c.padEnd(6, "0"));
}
function ke(e) {
  const r = ve(e);
  return (
    (r / 1000000n).toString() +
    (r % 1000000n
      ? "." + (r % 1000000n).toString().padStart(6, "0").replace(/0+$/, "")
      : "")
  );
}
function Je() {
  return {
    generation: 0,
    phase: "SELECT",
    busy: !1,
    error: "",
    record: null,
    stock: null,
    view: null,
    confirmation: null,
    signature: null,
    signatureFile: null,
    completed: !1,
    admitted: !1,
    pending: null,
    cardRows: [],
    signatureRows: [],
    document: null,
    documentReady: !1,
    verificationRequestId: null,
  };
}
function Hr(e, r, u, c, d, i) {
  var D, j, Y;
  if (!r || !R(r.id) || r.stock_state !== "RECEIVED")
    throw new Error("请先选择已接收且可领用的样品");
  if (!i && r.canWithdraw !== !0)
    throw new Error("当前样品尚不可领用，请刷新来源与操作批");
  if (!s(r.operationBatchId, u.batchId))
    throw new Error("样品对应的本人有效操作批已变化，请先恢复操作批并刷新来源");
  if (!r.storage_location || !R(r.expires_at) || !R(r.availableQuantity))
    throw new Error("库位、期限或可领量尚未回读，暂不能领样");
  const N =
    typeof r.expires_at == "number" ? r.expires_at : Date.parse(r.expires_at);
  if (!Number.isFinite(N) || N <= Date.now())
    throw new Error("样品保存期限已过或不可确认，暂不能领用");
  if (
    !Number.isSafeInteger(Number(r.sampleId)) ||
    Number(r.sampleId) <= 0 ||
    ![r.sampleVersion, r.stockVersion].every(
      (t) => R(t) && Number.isSafeInteger(Number(t)) && Number(t) > 0,
    )
  )
    throw new Error("物理样品与库存版本尚未回读，不能建立事实");
  const X = ke(e.quantity);
  if (ve(X) <= 0n) throw new Error("实际领样数量必须大于零");
  let q = ve(r.availableQuantity);
  if (i) {
    if (
      ![
        "SIGN_COMPLETED",
        "PENDING_CONFIRMATION",
        "PENDING_VERIFICATION",
      ].includes(i.state) ||
      !s(i.stock_id, r.id) ||
      !s(i.receiver_user_id, c) ||
      !s(i.lab_task_list_id, u.taskId)
    )
      throw new Error("更正或替换必须选择本人同一库存的原记录");
    i.state === "SIGN_COMPLETED" && (q += ve(pe(i).quantity));
  }
  if (ve(X) > q) throw new Error("实际数量超过可领量，更正差额仍由服务器核验");
  if (e.unit !== r.quantity_unit) throw new Error("领样单位必须与库存一致");
  if (
    !(
      (D = r.giverOptions) != null && D.some((t) => s(t.userId, e.giverUserId))
    ) ||
    !e.receivedAt ||
    !((j = e.purpose) != null && j.trim()) ||
    !((Y = e.sampleState) != null && Y.trim())
  )
    throw new Error("请填写实际交样人、时间、用途和样品状态");
  if (!Number.isFinite(Date.parse(e.receivedAt + "+08:00")))
    throw new Error("实际领样时间格式无效");
  if (!R(c) || !R(u.taskId) || !R(u.batchId))
    throw new Error("本人账号、样品任务或操作批尚未确认");
  return {
    requestId: d,
    stockId: r.stockId || r.id,
    sampleId: Number(r.sampleId),
    labTaskId: Number(u.taskId),
    operationBatchId: Number(u.batchId),
    expectedSampleVersion: Number(r.sampleVersion),
    expectedStockVersion: Number(r.stockVersion),
    quantity: X,
    quantityUnit: e.unit,
    giverUserId: Number(e.giverUserId),
    withdrawnAt: e.receivedAt,
    purpose: e.purpose.trim(),
    sampleState: e.sampleState.trim(),
    ...(i ? { supersedesWithdrawalId: i.id } : {}),
  };
}
function Jr(e, r, u, c) {
  const d = (e == null ? void 0 : e.code) === 200 ? e.data : null;
  if (
    !d ||
    !R(d.id) ||
    !s(d.stock_id, u.id) ||
    !s(d.lab_task_list_id, r.labTaskId) ||
    !s(d.operation_batch_id, r.operationBatchId) ||
    !s(d.receiver_user_id, c) ||
    d.sample_no !== u.sample_no ||
    !s(d.sampleId, u.sampleId) ||
    !s(d.labTaskId, r.labTaskId) ||
    !Ce(d.facts_digest) ||
    !Ce(d.cardSha256) ||
    !R(d.card_file_id) ||
    !R(d.cardVersion)
  )
    throw new Error("未获得本次本人领样的完整结构化记录，请查询原请求");
  const i = pe(d);
  if (
    !i ||
    !s(i.record, d.id) ||
    !s(i.receiver, c) ||
    i.sample !== d.sample_no ||
    !s(i.sampleId, d.sampleId) ||
    !s(i.task, r.labTaskId) ||
    !s(i.sampleVersion, r.expectedSampleVersion) ||
    !s(i.stockVersion, r.expectedStockVersion) ||
    String(i.correctionOf || "") !== String(r.supersedesWithdrawalId || "") ||
    ke(i.quantity) !== r.quantity ||
    i.unit !== r.quantityUnit ||
    !s(i.giver, r.giverUserId) ||
    Date.parse(i.receivedAt) !== Date.parse(r.withdrawnAt + "+08:00") ||
    i.purpose !== r.purpose ||
    i.sampleState !== r.sampleState
  )
    throw new Error("领样读回事实不一致，不能继续确认");
  return d;
}
function Ve(e, r, u, c, d) {
  const i = e == null ? void 0 : e.signatureBinding,
    N = r ? pe(r) : null;
  if (
    (e == null ? void 0 : e.state) !== "SIGN_COMPLETED" ||
    !s(e.recordId, r.id) ||
    e.sampleNo !== r.sample_no ||
    !s(e.actorUserId, c) ||
    !s(r.receiver_user_id, c) ||
    r.state !== "SIGN_COMPLETED" ||
    !R(e.signatureFileId) ||
    !R(e.signatureFileVersion) ||
    !Ce(e.signatureSha256) ||
    u.sha256 !== e.signatureSha256 ||
    !i ||
    !s(i.actor, c) ||
    !s(i.record, r.id) ||
    i.sample !== r.sample_no ||
    !s(i.cardFileId, r.card_file_id) ||
    !s(i.cardVersion, r.cardVersion) ||
    i.cardSha256 !== r.cardSha256 ||
    i.factsDigest !== r.facts_digest ||
    !Number.isFinite(Date.parse(i.signedAt)) ||
    !s(i.sampleId, r.sampleId) ||
    !s(i.labTaskId, r.lab_task_list_id) ||
    !s(i.tenant, r.tenant_id) ||
    !s(i.sampleVersion, N.sampleVersion) ||
    Date.parse(e.signedAt) !== Date.parse(i.signedAt) ||
    !R(e.signatureEventId) ||
    !s(e.cardId, r.card_file_id) ||
    !s(e.cardVersion, r.cardVersion) ||
    e.cardSha256 !== r.cardSha256 ||
    (d != null && d.eventId && !s(d.eventId, e.signatureEventId)) ||
    (d != null && d.requestId && !s(d.requestId, i.requestId)) ||
    !s(e.sampleId, r.sampleId) ||
    !s(e.labTaskId, r.lab_task_list_id) ||
    !s(e.withdrawalId, r.id) ||
    !s(e.structuredVersion, r.structuredVersion) ||
    e.recordVerified !== !0 ||
    !s(e.signerUserId, c) ||
    !R(e.verificationEventId) ||
    e.factsDigest !== r.facts_digest ||
    ke(e.quantity) !== ke(N.quantity) ||
    e.quantityUnit !== N.unit ||
    !s(e.giverUserId, N.giver) ||
    !s(e.receiverUserId, c) ||
    Date.parse(e.withdrawnAt) !== Date.parse(N.receivedAt) ||
    e.purpose !== N.purpose ||
    e.sampleState !== N.sampleState
  )
    throw new Error("本人签名、结构化记录或签名文件读回尚未一致，领样仍未完成");
  return !0;
}
function Qr(e, r, u, c, d = () => {}) {
  function i(n) {
    return e.generation === n;
  }
  function N(n) {
    var g, m, w, A;
    const o = [
      ((m = (g = n == null ? void 0 : n.response) == null ? void 0 : g.data) ==
      null
        ? void 0
        : m.msg) ||
        ((A =
          (w = n == null ? void 0 : n.response) == null ? void 0 : w.data) ==
        null
          ? void 0
          : A.message),
      n == null ? void 0 : n.businessMessage,
      n == null ? void 0 : n.message,
    ].filter((h) => typeof h == "string" && String(h).trim());
    for (const h of o) {
      const V = String(h).trim();
      if (V !== "BUSINESS_REQUEST_FAILED" && /[\u4e00-\u9fff]/.test(V))
        return V;
    }
    return "";
  }
  function X(n) {
    return !/签章|seal/i.test(n) || /个人中心/.test(n)
      ? n
      : n.replace(/[。.！!？?]*$/, "") + "。请到个人中心配置签章后再确认领样。";
  }
  function q(n, a = !1) {
    var m, w;
    const o = (m = n == null ? void 0 : n.response) == null ? void 0 : m.status,
      g = N(n);
    if (
      (o === 403
        ? (e.error = "当前无本人操作权限，请恢复权限后查询原请求")
        : o === 409
          ? (e.error = X(
              g ||
                "本次操作被业务拒绝，请按提示处理后重试；当前记录不升级为完成",
            ))
          : g
            ? (e.error = g)
            : (e.error = "动作结果尚未确认，请保留本页并查询原请求"),
      a === "prepare" &&
        ((w = e.pending) == null ? void 0 : w.kind) === "prepare" &&
        [400, 403, 409].includes(o))
    )
      ((e.pending = null), (e.phase = "FACTS"));
    else {
      if ((a === "confirm" || a === "sign") && [400, 403, 409].includes(o))
        return (
          (e.pending = null),
          e.view && (e.phase = "REVIEW"),
          d(null),
          !1
        );
      if (a === "view" || a === "ready")
        return (
          (e.pending = null),
          d(null),
          e.record && !["CARD", "OPENING", "REVIEW"].includes(e.phase) && (e.phase = "CARD"),
          (e.error = (e.error || "流转卡查看未确认") + "；可再点「" + (a === "view" ? "查看本次实际流转卡" : "确认本次流转卡已加载") + "」重试。"),
          !1
        );
      e.phase = e.pending ? "UNCERTAIN" : e.phase;
    }
    return (d(e.pending), !1);
  }
  function D() {
    const n = e.generation + 1;
    (Object.assign(e, Je(), { generation: n }), d(null));
  }
  function j(n) {
    if (e.busy || e.pending) throw new Error("原请求尚未确认，请先查询原请求");
    ((e.stock = n), (e.phase = "FACTS"), (e.completed = !1), (e.admitted = !1));
  }
  function __f5Pick(obj, keys) {
    if (!obj) return;
    for (var i = 0; i < keys.length; i++) {
      var v = obj[keys[i]];
      if (
        v != null &&
        String(v).trim() !== "" &&
        String(v) !== "undefined" &&
        String(v) !== "null"
      )
        return v;
    }
  }
  function __f5MergeVerification(g, rec) {
    if (!g || !rec) return rec;
    var out = Object.assign({}, rec);
    var st = __f5Pick(g, ["state"]);
    if (st) out.state = st;
    var sid = __f5Pick(g, ["sampleId", "sample_id", "physical_sample_id"]);
    if (sid != null) out.sampleId = sid;
    var tid = __f5Pick(g, ["labTaskId", "lab_task_list_id"]);
    if (tid != null) {
      out.labTaskId = tid;
      if (out.lab_task_list_id == null) out.lab_task_list_id = tid;
    }
    var ruid = __f5Pick(g, ["receiverUserId", "receiver_user_id", "actorUserId"]);
    if (ruid != null) {
      out.receiverUserId = ruid;
      if (out.receiver_user_id == null) out.receiver_user_id = ruid;
    }
    var cid = __f5Pick(g, ["cardId", "card_file_id", "cardFileId"]);
    if (cid != null) {
      out.card_file_id = cid;
      out.cardId = cid;
    }
    var cv = __f5Pick(g, ["cardVersion", "card_version"]);
    if (cv != null) out.cardVersion = cv;
    var cs = __f5Pick(g, ["cardSha256", "card_sha256"]);
    if (cs != null) out.cardSha256 = cs;
    var fd = __f5Pick(g, ["factsDigest", "facts_digest"]);
    if (fd != null) {
      out.facts_digest = fd;
      out.factsDigest = fd;
    }
    return out;
  }
  function Y(n, a) {
    var o;
    function q(z, K) {
      if (!z) return;
      for (var J = 0; J < K.length; J++) {
        var Q = z[K[J]];
        if (
          Q != null &&
          String(Q).trim() !== "" &&
          String(Q) !== "undefined" &&
          String(Q) !== "null"
        )
          return Q;
      }
    }
    function X(z, K) {
      if (!z) return;
      try {
        var J =
          typeof z.facts_json === "string"
            ? JSON.parse(z.facts_json)
            : z.facts_json;
        if (!J || typeof J !== "object") return;
        for (var Q = 0; Q < K.length; Q++) {
          var ee = J[K[Q]];
          if (
            ee != null &&
            String(ee).trim() !== "" &&
            String(ee) !== "undefined" &&
            String(ee) !== "null"
          )
            return ee;
        }
      } catch {}
    }
    var ae = q(n, ["id", "recordId", "withdrawalId"]),
      le = q(a, ["id", "recordId", "withdrawalId"]),
      pe = q(n, ["sampleId", "sample_id", "physical_sample_id"]);
    pe == null && (pe = X(n, ["sampleId"]));
    var me = q(a, ["sampleId", "sample_id", "physical_sample_id"]);
    me == null && (me = X(a, ["sampleId"]));
    var he = q(n, ["labTaskId", "lab_task_list_id"]),
      ge = q(n, ["receiverUserId", "receiver_user_id", "actorUserId"]),
      be = u();
    ae == null && (ae = le);
    pe == null && (pe = me);
    he == null && (he = q(a, ["labTaskId", "lab_task_list_id"]));
    he == null && (he = be.taskId);
    ge == null &&
      (ge = q(a, ["receiver_user_id", "receiverUserId", "actorUserId"]));
    ge == null && (ge = be.actor);
    if (
      !n ||
      ae == null ||
      le == null ||
      !s(ae, le) ||
      pe == null ||
      me == null ||
      !s(pe, me) ||
      he == null ||
      !s(he, be.taskId) ||
      ge == null ||
      !s(ge, be.actor)
    )
      throw new Error("本次领用记录与当前样品对不上，请刷新后重试或联系管理员");
    if (["SIGN_COMPLETED", "PENDING_VERIFICATION"].includes(n.state)) {
      if (!R(n.signatureEventId)) throw new Error("原签署事件尚未读回");
      ((e.signature = {
        requestId: (o = n.signatureBinding) == null ? void 0 : o.requestId,
        eventId: n.signatureEventId,
        result: n,
      }),
        (e.phase = "VERIFY"));
    } else ((e.signature = null), (e.phase = "CARD"));
    ((e.record = a),
      (e.document = null),
      (e.view = null),
      (e.cardRows = []),
      (e.confirmation = null));
  }
  async function t(n, a, o) {
    const g = Jr(n, a, e.stock, u().actor);
    if (
      ((e.record = g),
      (e.phase = "CARD"),
      (e.view = null),
      (e.confirmation = null),
      (e.completed = !1),
      (e.admitted = !1),
      ["SIGN_COMPLETED", "PENDING_VERIFICATION"].includes(g.state))
    ) {
      const m = await r.verification(g.id);
      if (!i(o)) return;
      Y((m == null ? void 0 : m.code) === 200 ? m.data : null, g);
    }
  }
  async function E(n, a, o, g) {
    var w;
    if (e.busy) return !1;
    const m = e.generation;
    ((e.busy = !0),
      (e.error = ""),
      (e.pending = {
        kind: n,
        payload: a,
        recordId: ((w = e.record) == null ? void 0 : w.id) || null,
      }),
      d(e.pending));
    try {
      const A = await o();
      if (
        e.pending &&
        e.pending.payload &&
        A &&
        n !== "view" &&
        n !== "ready"
      ) {
        const _d = A.data && typeof A.data == "object" ? A.data : A;
        const _rid =
          (_d && (_d.requestId || _d.request_id)) ||
          A.requestId ||
          A.request_id;
        if (_rid != null && String(_rid).trim() !== "")
          e.pending.payload.requestId = String(_rid).trim();
      }
      if (!i(m) || (await g(A, m), !i(m))) return !1;
      const _dKeep = A && A.data && typeof A.data == "object" ? A.data : A;
      const _stKeep = _dKeep && _dKeep.state;
      /* F1: prepare 200+recordView 已过 preparedWithdrawal(t) → 必清 pending → CARD（库 PENDING_CONFIRMATION 为待签真态，不再留 pending 卡步1） */
      void _stKeep;
      ((e.pending = null), d(null), (e.error = ""));
      if (n === "prepare" && e.record && e.phase === "CARD") await enterConfirmCardIfPending2(m);
      return !0;
    } catch (A) {
      if (!i(m)) return !1;
      const _r1 = q(A, n);
      if (n === "prepare" && e.pending && e.pending.kind === "prepare")
        e.error = __f1Msg(A, e.error);
      return _r1;
    } finally {
      i(m) && (e.busy = !1);
    }
  }
  function __f1Msg(A, prev) {
    const msg = String((A && A.message) || "");
    if (/timeout|超时/i.test(msg))
      return "生成流转卡请求超时，结果尚未确认。请点「查询原请求结果」读回本次记录（不会重复生成）。";
    if (prev && /[\u4e00-\u9fff]/.test(prev)) return prev + "（可点「查询原请求结果」恢复）";
    return "生成流转卡结果尚未确认，请点「查询原请求结果」恢复。";
  }
  function __f2T(pr, ms, label) {
    return Promise.race([
      pr,
      new Promise((_, rj) =>
        setTimeout(() => rj(Object.assign(new Error(label + "超时"), { __f2Timeout: !0 })), ms),
      ),
    ]);
  }
  async function F(n, a) {
    if (e.phase !== "FACTS" || e.pending) return !1;
    let o;
    try {
      o = Hr(n, e.stock, u(), u().actor, c(), a);
    } catch (g) {
      return q(g);
    }
    return E(
      "prepare",
      o,
      () => r.prepare(o),
      (g, m) => t(g, o, m),
    );
  }
  function $(n) {
    var o, g, m, w;
    const a = (n == null ? void 0 : n.code) === 200 ? n.data : null;
    /* F5″: view-sessions 回包 camel/snake、cardId↔card_file_id 兼容 */
    const _vsWd = __f5Pick(a, ["withdrawalId", "withdrawal_id"]);
    const _vsCardId = __f5Pick(a, ["cardId", "card_file_id", "cardFileId"]);
    const _vsCardVer = __f5Pick(a, ["cardVersion", "card_version"]);
    const _vsCardSha = __f5Pick(a, ["cardSha256", "card_sha256"]);
    const _vsFacts = __f5Pick(a, ["factsDigest", "facts_digest"]);
    const _vsSid = __f5Pick(a, ["viewSessionId", "view_session_id"]);
    const _recCardId = __f5Pick(e.record, ["card_file_id", "cardId", "cardFileId"]);
    const _recFacts = __f5Pick(e.record, ["facts_digest", "factsDigest"]);
    if (
      !a ||
      !e.record ||
      !s(_vsWd, e.record.id) ||
      !s(_vsCardId, _recCardId) ||
      !s(_vsCardVer, e.record.cardVersion) ||
      _vsCardSha !== e.record.cardSha256 ||
      _vsFacts !== _recFacts ||
      !R(_vsSid) ||
      !((o = a.config) != null && o.documentServerUrl) ||
      !(
        (w =
          (m = (g = a.config) == null ? void 0 : g.documentConfig) == null
            ? void 0
            : m.document) != null && w.key
      )
    )
      throw new Error("受控流转卡查看配置未完整绑定本次记录");
    ((e.document = a.config),
      (e.view = {
        viewSessionId: _vsSid,
        documentKey: a.config.documentConfig.document.key,
        cardVersion: _vsCardVer,
        cardSha256: _vsCardSha,
        factsDigest: _vsFacts,
      }),
      (e.documentReady = !1),
      (e.phase = "OPENING"));
  }
  function ee(n) {
    const a = (n == null ? void 0 : n.code) === 200 ? n.data : null;
    if (
      !a ||
      a.state !== "CARD_OPENED" ||
      a.canConfirm !== !0 ||
      !s(a.viewSessionId, e.view.viewSessionId) ||
      !s(a.withdrawalId, e.record.id) ||
      !s(a.sampleId, e.record.sampleId) ||
      a.documentKey !== e.view.documentKey ||
      a.cardSha256 !== e.view.cardSha256 ||
      !s(a.cardVersion, e.view.cardVersion) ||
      a.factsDigest !== e.view.factsDigest
    )
      throw new Error(
        "真实受控文档加载证明未确认，下载或页面就绪不能替代本人查看",
      );
    ((e.cardRows = Object.entries(pe(e.record)).map(([o, g]) => ({
      key: o,
      value: String(g),
    }))),
      (e.phase = "REVIEW"));
  }
  async function Q() {
    if (
      !e.record ||
      e.pending ||
      !["CARD", "REVIEW", "OPENING"].includes(e.phase)
    )
      return !1;
    const n = { requestId: c() };
    return E("view", n, () => r.session(e.record.id, n), $);
  }
  async function re() {
    const n = { requestId: c(), ...e.view };
    return E("ready", n, () => r.ready(e.record.id, n), ee);
  }
  async function fe() {
    return !e.view || e.phase !== "OPENING" || e.documentReady
      ? !1
      : ((e.documentReady = !0), !0);
  }
  async function z() {
    if (!e.view || e.busy) return !1;
    if (e.phase === "OPENING" && e.documentReady && !e.pending) return re();
    const n = e.generation;
    e.busy = !0;
    try {
      const a = await r.viewStatus(e.record.id, e.view.viewSessionId);
      return i(n)
        ? (ee(a), (e.pending = null), d(null), (e.error = ""), !0)
        : !1;
    } catch (a) {
      return i(n) ? q(a) : !1;
    } finally {
      i(n) && (e.busy = !1);
    }
  }
  async function ue() {
    if (
      e.phase !== "REVIEW" ||
      !e.view ||
      e.pending ||
      !s(e.record.receiver_user_id, u().actor)
    )
      return !1;
    const n = {
      requestId: c(),
      viewSessionId: e.view.viewSessionId,
      cardSha256: e.view.cardSha256,
      factsDigest: e.view.factsDigest,
      cardVersion: e.view.cardVersion,
    };
    return E(
      "confirm",
      n,
      () => r.confirm(e.record.id, n),
      (a) => {
        const o = (a == null ? void 0 : a.code) === 200 ? a.data : null;
        if (!o || !s(o.recordId, e.record.id) || !R(o.confirmationEventId))
          throw new Error("未获得本人确认事件，请查询原请求");
        ((e.confirmation = o.viewReceiptId || o.confirmationEventId),
          (e.phase = "SIGN"));
      },
    );
  }
  async function se() {
    if (
      e.phase !== "SIGN" ||
      !e.confirmation ||
      e.pending ||
      !s(e.record.receiver_user_id, u().actor)
    )
      return !1;
    const n = {
      requestId: c(),
      viewReceiptId: e.confirmation,
      cardSha256: e.view.cardSha256,
      factsDigest: e.view.factsDigest,
      cardVersion: e.view.cardVersion,
    };
    return E(
      "sign",
      n,
      () => r.sign(e.record.id, n),
      (a) => {
        var o, g, m;
        if ((a == null ? void 0 : a.code) !== 200)
          throw new Error("本人签名请求尚未确认，请按原请求查询");
        if (
          !s((o = a.data) == null ? void 0 : o.recordId, e.record.id) ||
          !R((g = a.data) == null ? void 0 : g.signatureEventId) ||
          ((m = a.data) == null ? void 0 : m.state) !== "PENDING_VERIFICATION"
        )
          throw new Error("签名文件创建回执尚未确认");
        ((e.signature = {
          requestId: n.requestId,
          eventId: a.data.signatureEventId,
          result: a.data,
        }),
          (e.phase = "VERIFY"));
      },
    );
  }
  async function le() {
    var o, g, m, w, A;
    if (!((o = e.signature) != null && o.eventId) || e.pending || e.busy)
      return !1;
    const n = e.generation;
    ((e.busy = !0), (e.error = ""));
    let a = !1;
    try {
      let h = await r.verification(e.record.id);
      if (
        ((g = h == null ? void 0 : h.data) == null ? void 0 : g.state) !==
        "SIGN_COMPLETED"
      ) {
        if (!e.signature.eventId) throw new Error("原签名事件尚未确认");
        const K = {
          requestId: e.verificationRequestId || c(),
          signatureEventId: e.signature.eventId,
        };
        ((e.verificationRequestId = K.requestId),
          (e.pending = {
            kind: "verification",
            payload: K,
            recordId: e.record.id,
          }),
          d(e.pending));
        const B = await r.verifyRecord(e.record.id, K);
        if (!i(n)) return !1;
        if (
          (B == null ? void 0 : B.code) !== 200 ||
          ((m = B.data) == null ? void 0 : m.state) !== "SIGN_COMPLETED" ||
          !s(B.data.recordId, e.record.id)
        )
          throw new Error("后端独立核验尚未完成");
        ((e.pending = null), d(null), (h = await r.verification(e.record.id)));
      }
      const V = await r.context(u().taskId),
        L =
          (A =
            (w = V == null ? void 0 : V.data) == null ? void 0 : w.records) ==
          null
            ? void 0
            : A.find((K) => s(K.id, e.record.id)),
        oe = await r.signedFile(e.record.id);
      if (!i(n)) return !1;
      if ((h == null ? void 0 : h.code) !== 200 || !L)
        throw new Error("签名与结构化事实尚未独立读回");
      if (!he(L, u()))
        throw new Error("领样记录与当前本人、任务或操作批不一致");
      if (
        (Ve(h.data, L, oe, u().actor, e.signature),
        (e.record = L),
        (e.signature.result = h.data),
        (e.signatureRows = await r.parseSigned(
          oe.bytes,
          h.data.signatureBinding,
          pe(L),
        )),
        !i(n))
      )
        return !1;
      ((e.signatureFile = {
        bytes: oe.bytes,
        version: h.data.signatureFileVersion,
        signedAt: h.data.signedAt,
        ownerUserId: h.data.signerUserId,
      }),
        (a = !0),
        (e.completed = !0),
        (e.phase = "COMPLETE"));
      const v = await r.admit(u().taskId);
      if (!i(n)) return !1;
      if (((e.admitted = (v == null ? void 0 : v.code) === 200), !e.admitted))
        throw new Error("本人领样已核验，但分析权限或任务阶段尚未允许");
      return (d(null), !0);
    } catch (h) {
      return i(n)
        ? ((e.completed = a),
          (e.admitted = !1),
          (e.phase = a ? "COMPLETE" : "VERIFY"),
          q(h))
        : !1;
    } finally {
      i(n) && (e.busy = !1);
    }
  }
  async function enterConfirmCardIfPending2(a) {
    const _r = e.record;
    if (
      !_r ||
      !["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(_r.state)
    )
      return;
    if (!R(_r.cardVersion) || !Ce(_r.cardSha256)) {
      /* F5‴: PENDING 缺卡指纹 → 强制 CARD + 旁注；禁 verification200 空停步1 */
      i(a) &&
        ((e.phase = "CARD"),
          (e.error =
            e.error ||
            "流转卡指纹尚未齐备，无法自动打开；请刷新后重试或联系管理员。"));
      return;
    }
    try {
      const _vs = await __f2T(r.session(_r.id, { requestId: c() }), 20000, "打开流转卡");
      if (!i(a)) return;
      $(_vs);
    } catch (_e) {
      /* F4/F5″: 开会话/契约失败不回 UNCERTAIN、不丢看卡钮；留 CARD + 同帧可读错文 */
      i(a) &&
        e.record &&
        ((e.phase = "CARD"),
          (e.error =
            (_e && _e.message && /[一-鿿]/.test(String(_e.message))
              ? String(_e.message)
              : "流转卡自动打开未成功") + "；请点「查看本次实际流转卡」重试。"));
    }
  }
  async function te() {
    var o, g, m, w, A, h, V, L, oe;
    if (!e.pending || e.busy) return !1;
    const n = e.pending,
      a = e.generation;
    e.busy = !0;
    try {
      if (n.kind === "prepare" && n.payload) {
        try {
          const _B0 = await __f2T(r.context(u().taskId), 8000, "读取领样来源");
          if (!i(a)) return !1;
          const _rows0 =
            ((_B0 == null ? void 0 : _B0.data) == null
              ? void 0
              : _B0.data.records) || [];
          const _hit0 = _rows0.find(
            (we) =>
              s(we.sampleId, n.payload.sampleId) &&
              s(we.stock_id, n.payload.stockId) &&
              s(we.receiver_user_id, u().actor) &&
              ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
                we.state,
              ),
          );
          if (_hit0) {
            const _rid0 = _hit0.requestId || _hit0.request_id;
            if (_rid0 != null && String(_rid0).trim() !== "") {
              const _neu0 = String(_rid0).trim();
              if (_neu0 !== String(n.payload.requestId || "").trim()) {
                ((n.payload.requestId = _neu0), d(e.pending));
              }
            }
          }
        } catch (_ae) {}
      }
      let v;
      if (n.kind === "ready")
        v = await r.viewStatus(e.record.id, e.view.viewSessionId);
      else if (n.kind === "view") {
        const _libV =
          (e.record && (e.record.requestId || e.record.request_id)) || null;
        if (_libV != null && String(_libV).trim() !== "") {
          v = await r.query(String(_libV).trim());
          ((e.pending = null), d(null));
          if ((v == null ? void 0 : v.code) === 200) {
            e.error = "";
            return !0;
          }
          e.error =
            (v && v.msg) || "库原请求查询未确认，请重新查看流转卡或稍后重试";
          return !1;
        }
        v = null;
      } else v = await __f2T(r.query(n.payload.requestId), 20000, "查询原请求");
      if (!i(a)) return !1;
      if (n.kind === "prepare") {
        if ((v == null ? void 0 : v.code) === 200 && v.data) {
          const _rid = v.data.requestId || v.data.request_id;
          if (_rid != null && String(_rid).trim() !== "")
            n.payload.requestId = String(_rid).trim();
        }
        if (!(
          (v == null ? void 0 : v.code) === 200 &&
          v.data &&
          (v.data.facts_json || v.data.id || v.data.recordId)
        )) {
          try {
            const B = await __f2T(r.context(u().taskId), 8000, "读取领样来源");
            if (!i(a)) return !1;
            const rows =
              ((B == null ? void 0 : B.data) == null
                ? void 0
                : B.data.records) || [];
            const hit = rows.find(
              (we) =>
                s(we.sampleId, n.payload.sampleId) &&
                s(we.stock_id, n.payload.stockId) &&
                s(we.receiver_user_id, u().actor) &&
                ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
                  we.state,
                ),
            );
            if (hit) {
              const _rid2 = hit.requestId || hit.request_id;
              if (_rid2 != null && String(_rid2).trim() !== "")
                n.payload.requestId = String(_rid2).trim();
              const K2 = { code: 200, data: hit };
              await t(K2, n.payload, a);
              if (!i(a)) return !1;
              return (
                (e.pending = null),
                d(null),
                (e.error = ""),
                await enterConfirmCardIfPending2(a),
                !0
              );
            }
          } catch (_e) {}
        }
        let K = v;
        if (
          (v == null ? void 0 : v.code) === 200 &&
          !((o = v.data) != null && o.facts_json) &&
          R((g = v.data) == null ? void 0 : g.recordId)
        ) {
          const B = await __f2T(r.context(u().taskId), 8000, "读取领样来源");
          if (!i(a)) return !1;
          K = {
            code: B == null ? void 0 : B.code,
            data:
              (w =
                (m = B == null ? void 0 : B.data) == null
                  ? void 0
                  : m.records) == null
                ? void 0
                : w.find((we) => s(we.id, v.data.recordId)),
          };
        }
        if ((await t(K, n.payload, a), !i(a))) return !1;
        ((e.pending = null),
          d(null),
          (e.error = ""),
          await enterConfirmCardIfPending2(a));
        return !0;
      } else if (n.kind === "sign") {
        if (
          (v == null ? void 0 : v.code) !== 200 ||
          !s((A = v.data) == null ? void 0 : A.recordId, e.record.id) ||
          !["PENDING_VERIFICATION", "SIGN_COMPLETED"].includes(
            (h = v.data) == null ? void 0 : h.state,
          )
        )
          throw new Error("本人签名请求仍未确认");
        ((e.signature = {
          requestId: n.payload.requestId,
          eventId: v.data.eventId || v.data.signatureEventId,
          result: v.data,
        }),
          (e.phase = "VERIFY"));
      } else if (n.kind === "confirm") {
        if (
          (v == null ? void 0 : v.code) !== 200 ||
          !s((V = v.data) == null ? void 0 : V.recordId, e.record.id) ||
          !R((L = v.data) == null ? void 0 : L.eventId)
        )
          throw new Error("本人确认请求仍未确认");
        ((e.confirmation = v.data.eventId), (e.phase = "SIGN"));
      } else if (n.kind === "verification") {
        if (
          (v == null ? void 0 : v.code) !== 200 ||
          ((oe = v.data) == null ? void 0 : oe.state) !== "SIGN_COMPLETED" ||
          !s(v.data.recordId, e.record.id)
        )
          throw new Error("后端独立核验请求仍未确认");
        e.phase = "VERIFY";
      } else if (n.kind === "ready") ee(v);
      else {
        const K = await r.session(e.record.id, n.payload);
        if (!i(a)) return !1;
        $(K);
      }
      return ((e.pending = null), d(null), (e.error = ""), !0);
    } catch (v) {
      if (!i(a)) return !1;
      if (n.kind === "prepare") {
        /* F2: 查询必落地——失败显错、保留原请求可再查，禁空转 */
        const _st = v && v.response && v.response.status;
        const _m = String((v && v.message) || "");
        q(v);
        e.error =
          _st === 404
            ? "查询完成：库内尚未查到本次生成请求的结果。可稍后再点「查询原请求结果」，或点「查询后重试原请求」。"
            : v && v.__f2Timeout
              ? "查询原请求超时，屏面未变化不代表失败；请再次点「查询原请求结果」。"
              : _st === 403
                ? e.error
                : "查询原请求失败：" + (/[\u4e00-\u9fff]/.test(_m) ? _m : "接口异常") + "。请再次点「查询原请求结果」。";
        e.phase = "UNCERTAIN";
        d(e.pending);
        return !1;
      }
      return q(v);
    } finally {
      i(a) && (e.busy = !1);
    }
  }
  async function P() {
    if (!e.pending || e.busy) return !1;
    const n = e.pending;
    return n.kind === "prepare"
      ? E(
          "prepare",
          n.payload,
          () => r.prepare(n.payload),
          (a, o) => t(a, n.payload, o),
        )
      : n.kind === "confirm"
        ? E(
            "confirm",
            n.payload,
            () => r.confirm(e.record.id, n.payload),
            (a) => {
              var o;
              if (
                (a == null ? void 0 : a.code) !== 200 ||
                !R((o = a.data) == null ? void 0 : o.confirmationEventId) ||
                !s(a.data.recordId, e.record.id)
              )
                throw new Error("原确认未完成");
              ((e.confirmation = a.data.confirmationEventId),
                (e.phase = "SIGN"));
            },
          )
        : n.kind === "sign"
          ? E(
              "sign",
              n.payload,
              () => r.sign(e.record.id, n.payload),
              (a) => {
                var o, g, m;
                if (
                  (a == null ? void 0 : a.code) !== 200 ||
                  !s((o = a.data) == null ? void 0 : o.recordId, e.record.id) ||
                  !R((g = a.data) == null ? void 0 : g.signatureEventId) ||
                  !["PENDING_VERIFICATION", "SIGN_COMPLETED"].includes(
                    (m = a.data) == null ? void 0 : m.state,
                  )
                )
                  throw new Error("原签署未完成");
                ((e.signature = {
                  requestId: n.payload.requestId,
                  eventId: a.data.signatureEventId,
                  result: a.data,
                }),
                  (e.phase = "VERIFY"));
              },
            )
          : n.kind === "ready"
            ? E("ready", n.payload, () => r.ready(e.record.id, n.payload), ee)
            : n.kind === "verification"
              ? E(
                  "verification",
                  n.payload,
                  () => r.verifyRecord(e.record.id, n.payload),
                  (a) => {
                    var o;
                    if (
                      (a == null ? void 0 : a.code) !== 200 ||
                      ((o = a.data) == null ? void 0 : o.state) !==
                        "SIGN_COMPLETED" ||
                      !s(a.data.recordId, e.record.id)
                    )
                      throw new Error("原核验未完成");
                    e.phase = "VERIFY";
                  },
                )
              : te();
  }
  async function ce(n, a) {
    var V;
    const o = await r.verification(n.id);
    if (!i(a)) return null;
    const g = await r.context(u().taskId);
    if (!i(a)) return null;
    const m = (g == null ? void 0 : g.code) === 200 ? g.data : null;
    if ((m == null ? void 0 : m.actorSealBound) !== !0) return null;
    const w = (V = m.records) == null ? void 0 : V.find((L) => s(L.id, n.id)),
      A = await r.signedFile(n.id);
    if (
      !i(a) ||
      (o == null ? void 0 : o.code) !== 200 ||
      !w ||
      w.state !== "SIGN_COMPLETED" ||
      !he(w, u())
    )
      return null;
    Ve(o.data, w, A, u().actor, null);
    const h = await r.parseSigned(A.bytes, o.data.signatureBinding, pe(w));
    return i(a)
      ? {
          record: w,
          signed: o.data,
          rows: h,
          fileMeta: {
            bytes: A.bytes,
            version: o.data.signatureFileVersion,
            signedAt: o.data.signedAt,
            ownerUserId: o.data.signerUserId,
          },
        }
      : null;
  }
  async function ye(n) {
    var g;
    if (e.busy || e.pending) return { ok: !1, reason: "busy" };
    if (e.completed && e.admitted) return { ok: !0, reason: "already" };
    if (
      ["FACTS", "CARD", "OPENING", "REVIEW", "SIGN", "UNCERTAIN"].includes(
        e.phase,
      )
    )
      return { ok: !1, reason: "in-progress" };
    if (
      (g = e.record) != null &&
      g.state &&
      e.record.state !== "SIGN_COMPLETED"
    )
      return { ok: !1, reason: "in-progress" };
    const a = jr(n, u());
    if (!a.length) return { ok: !1, reason: "not-admitted" };
    const o = e.generation;
    ((e.busy = !0), (e.error = ""));
    try {
      let m = null;
      for (const h of a)
        try {
          const V = await ce(h, o);
          if (!i(o)) return { ok: !1, reason: "stale" };
          if (V) {
            m = V;
            break;
          }
        } catch {
          if (!i(o)) return { ok: !1, reason: "stale" };
        }
      if (!m) return { ok: !1, reason: "readback" };
      const w = await r.admit(u().taskId);
      if (!i(o)) return { ok: !1, reason: "stale" };
      if (!Yr(w, u().batchId)) return { ok: !1, reason: "admission" };
      const A = $r(w);
      if (A && !s(A, m.record.id)) {
        const h = a.find((L) => s(L.id, A));
        let V = null;
        if (h)
          try {
            V = await ce(h, o);
          } catch {
            if (!i(o)) return { ok: !1, reason: "stale" };
          }
        if (!i(o)) return { ok: !1, reason: "stale" };
        if (!V) return { ok: !1, reason: "admission-record" };
        m = V;
      }
      return (
        (e.record = m.record),
        (e.signature = {
          eventId: m.signed.signatureEventId,
          result: m.signed,
        }),
        (e.signatureRows = m.rows),
        (e.signatureFile = m.fileMeta),
        (e.completed = !0),
        (e.admitted = !0),
        (e.phase = "COMPLETE"),
        (e.pending = null),
        d(null),
        { ok: !0, reason: "hydrated", recordId: m.record.id }
      );
    } catch {
      return i(o)
        ? { ok: !1, reason: "readback" }
        : { ok: !1, reason: "stale" };
    } finally {
      i(o) && (e.busy = !1);
    }
  }
  async function _e(n) {
    if (e.busy) return q(new Error("本次操作正在核对，请等待结果。"));
    if (e.pending) {
      if (e.pending.kind === "prepare" || e.phase === "UNCERTAIN") {
        ((e.pending = null), d(null));
      } else return q(new Error("本次操作结果尚未确认，请先查询原请求结果。"));
    }
    if (!he(n, u()))
      return q(new Error("只能恢复当前本人、任务和操作批的领样记录"));
    const a = e.generation,
      Ke = e.record;
    ((e.busy = !0), (e.completed = !1), (e.admitted = !1), (e.error = ""));
    try {
      const o = await r.verification(n.id);
      if (!i(a))
        return (
          (e.record = Ke),
          q(new Error("本次继续领用已中断，请刷新后重试"))
        );
      const g = (o == null ? void 0 : o.code) === 200 ? o.data : null;
      /* F5′: verification data 合并反填 history 行（state/sampleId/labTaskId/receiverUserId/cardId↔card_file_id/cardVersion/cardSha256/factsDigest↔facts_digest）再进确认卡 */
      const _merged = g ? __f5MergeVerification(g, n) : n;
      Y(g, _merged);
      /* F5: verification 200 且库 PENDING_CONFIRMATION → phase=CARD（看卡钮可见），并自动开受控看卡会话推进到确认区；失败仍留 CARD 可手点 */
      (e.pending = null), (e.error = ""), d(null);
      if (e.phase === "CARD") {
        await enterConfirmCardIfPending2(a);
        if (!i(a)) return !1;
      }
      return !0;
    } catch (o) {
      return (
        (e.record = Ke),
        i(a) ? q(o) : q(new Error("本次继续领用已中断，请刷新后重试"))
      );
    } finally {
      i(a) && (e.busy = !1);
    }
  }
  return {
    reset: D,
    select: j,
    prepare: F,
    view: Q,
    documentReady: fe,
    checkOpened: z,
    confirm: ue,
    sign: se,
    verify: le,
    recover: te,
    retryOriginal: P,
    resume: _e,
    hydrateAdmitted: ye,
  };
}
async function Qe(e, r) {
  var t;
  const u = await Or.loadAsync(e),
    c = async (E) => {
      const F = u.file(E);
      if (!F) throw new Error("流转卡文件内容不完整");
      const $ = new DOMParser().parseFromString(
        await F.async("string"),
        "application/xml",
      );
      if ($.getElementsByTagName("parsererror").length)
        throw new Error("流转卡文件无法解析");
      return $;
    },
    d = (E, F) => Array.from(E.getElementsByTagNameNS("*", F)),
    i = await c("xl/workbook.xml"),
    N = d(i, "sheet").find((E) => E.getAttribute("name") === r);
  if (!N) throw new Error("流转卡缺少本次事实或签署明细");
  const X = N.getAttribute("r:id"),
    q = await c("xl/_rels/workbook.xml.rels"),
    D =
      (t = d(q, "Relationship").find((E) => E.getAttribute("Id") === X)) == null
        ? void 0
        : t.getAttribute("Target");
  if (!D || D.includes("..")) throw new Error("流转卡明细关系不合法");
  const j = u.file("xl/sharedStrings.xml")
      ? d(await c("xl/sharedStrings.xml"), "si").map((E) =>
          d(E, "t")
            .map((F) => F.textContent)
            .join(""),
        )
      : [],
    Y = await c(D.startsWith("/") ? D.slice(1) : "xl/" + D);
  return d(Y, "row").map((E) =>
    d(E, "c").map((F) => {
      var ee, Q;
      const $ = F.getAttribute("t");
      return $ === "s"
        ? (j[Number((ee = d(F, "v")[0]) == null ? void 0 : ee.textContent)] ??
            "")
        : $ === "inlineStr"
          ? d(F, "t")
              .map((re) => re.textContent)
              .join("")
          : (((Q = d(F, "v")[0]) == null ? void 0 : Q.textContent) ?? "");
    }),
  );
}
async function Ye(e, r) {
  const u = await Qe(e, "本次领样事实"),
    c = {};
  for (const [d, i] of u.slice(1)) {
    if (!d || Object.prototype.hasOwnProperty.call(c, d))
      throw new Error("流转卡事实重复或缺失");
    c[d] = i;
  }
  for (const [d, i] of Object.entries(r))
    if (c[d] !== String(i)) throw new Error("实际流转卡与本次领样事实不一致");
  if (Object.keys(c).length !== Object.keys(r).length)
    throw new Error("流转卡包含未绑定的额外事实");
  return Object.entries(c).map(([d, i]) => ({ key: d, value: i }));
}
async function zr(e, r) {
  const u = await Qe(e, "本人签署回执"),
    c = {};
  for (const [d, i] of u) {
    if (!d || Object.prototype.hasOwnProperty.call(c, d))
      throw new Error("签署文件绑定不唯一");
    c[d] = i;
  }
  for (const [d, i] of Object.entries(r))
    if (c[d] !== String(i)) throw new Error("实际签名文件与本人签署绑定不一致");
  if (Object.keys(c).length !== Object.keys(r).length)
    throw new Error("签署文件包含未绑定的额外声明");
  return Object.entries(c).map(([d, i]) => ({ key: d, value: i }));
}
function $e(e, r) {
  const u = String(e ?? "").trim();
  return !/[\u4e00-\u9fff]/.test(u) ||
    /https?:\/\/|<html|\bat [\w.$]+\(/i.test(u)
    ? r
    : u
        .replace(
          /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b|\b[0-9a-f]{32,64}\b/gi,
          "相关记录",
        )
        .replace(/\$\{[^}]+\}/g, "相关字段")
        .replace(/\brequestId\b/g, "本次操作")
        .replace(/\boperationBatchId\b/g, "本次实验批次")
        .replace(/\b(?:stockId|sampleId)\b/g, "样品")
        .replace(/\bSHA(?:256)?\b/gi, "文件指纹");
}
function Kr(e, r) {
  return r
    ? "本人签署与原文件已核验"
    : (e == null ? void 0 : e.state) === "SIGN_COMPLETED"
      ? "签署已完成，原文件尚未在本页读回"
      : (e == null ? void 0 : e.state) === "PENDING_VERIFICATION"
        ? "已签署，待独立核验"
        : "待本人确认/签署";
}
function Zr(e, r, u) {
  return e
    ? !r && !u
      ? "缺少本次领样登记和本人签署权限，请联系实验室负责人核对后刷新。"
      : r
        ? u
          ? ""
          : "缺少本人签署权限，请联系实验室负责人核对后刷新。"
        : "缺少本次领样登记权限，请联系实验室负责人核对后刷新。"
    : "尚未取得本人领样权限，请联系实验室负责人核对岗位权限，再点击刷新。";
}
async function Xr(e, r, u) {
  if (!e.pending || e.busy) return !1;
  const c = e.pending,
    d = e.generation,
    kind = c.kind,
    payload = c.payload;
  const okRec = await r.recover();
  if (e.generation !== d) return !1;
  if (okRec && !e.pending) return !0;
  if (!e.pending && kind && payload) {
    e.pending = { kind: kind, payload: payload, recordId: c.recordId || null };
  }
  if (
    !e.pending ||
    e.busy ||
    e.generation !== d ||
    !(await u()) ||
    e.busy ||
    e.generation !== d
  )
    return !1;
  return r.retryOriginal();
}
const Oe = (e) => (kr("data-v-9b6c4c89"), (e = e()), Sr(), e),
  et = Oe(() => be("strong", null, "本人领样与流转卡签署", -1)),
  rt = { key: 0, class: "muted" },
  tt = { key: 0 },
  nt = { key: 3, class: "withdrawal-current" },
  at = { key: 2 },
  it = { key: 6 },
  dt = { key: 9 },
  lt = { key: 11 },
  ot = { key: 4, class: "withdrawal-recovery" },
  ut = Oe(() =>
    be(
      "span",
      null,
      "请先查询本次操作；仍无确定结果时，只重试同一次操作，保留原记录。",
      -1,
    ),
  ),
  st = Oe(() =>
    be(
      "p",
      { class: "muted" },
      "本人查看并确认后签署，每次分次领用或更正均保留原记录与文件。仪器使用功能尚未就绪，请联系实验室负责人确认启用和授权；每次实际使用都须单独记录。",
      -1,
    ),
  ),
  ct = {
    __name: "LabSampleHandoverPanel",
    props: {
      taskId: { type: [Number, String], required: !0 },
      batchId: { type: [Number, String], required: !0 },
    },
    emits: ["admission"],
    setup(e, { emit: r }) {
      const u = e,
        c = r,
        d = Er(),
        i = de(() => d.id),
        N = de(() => d.nickName || d.name),
        X = (l) =>
          !!i.value &&
          (d.permissions || []).some((f) => f === "*:*:*" || f === l),
        q = de(() => X("lab:pool:gotoTaskList")),
        D = de(() => X("lab:withdrawal:write")),
        j = de(() => X("lab:withdrawal:sign")),
        Y = de(() => Zr(q.value, D.value, j.value)),
        t = Pe(Je()),
        E = Z({}),
        F = Z([]),
        $ = Z([]),
        ee = Z(!1),
        Q = Z(""),
        re = Z({}),
        fe = Z(!1),
        z = Z(null),
        ue = Z(null),
        se = Z(null),
        le = Z(!1),
        te = Z(""),
        P = Pe({
          quantity: "",
          unit: "",
          giverUserId: null,
          receivedAt: null,
          purpose: "",
          sampleState: "",
        }),
        ce = de(() => {
          var l;
          return Array.isArray((l = t.stock) == null ? void 0 : l.giverOptions)
            ? t.stock.giverOptions
                .filter((f) => f.userId && f.name)
                .map((f) => ({ id: f.userId, name: f.name }))
            : [];
        }),
        ye = () =>
          ["limis-personal-withdrawal-v1", i.value, u.taskId, u.batchId].join(
            ":",
          );
      function _e(l) {
        try {
          l || t.record
            ? sessionStorage.setItem(
                ye(),
                JSON.stringify({
                  pending: l,
                  record: t.record,
                  stock: t.stock,
                  view: t.view,
                  confirmation: t.confirmation,
                  signature: t.signature,
                  verificationRequestId: t.verificationRequestId,
                }),
              )
            : sessionStorage.removeItem(ye());
        } catch {}
      }
      const n = async (l, f, S) => (await Ye(l, S), zr(l, f)),
        o = Qr(
          t,
          {
            context: Le,
            prepare: Ar,
            card: Ur,
            confirm: Rr,
            sign: Dr,
            query: Tr,
            signedFile: je,
            admit: qr,
            parseCard: Ye,
            parseSigned: n,
            session: Fr,
            viewStatus: Pr,
            ready: xr,
            verifyRecord: Br,
            verification: We,
          },
          () => ({ taskId: u.taskId, batchId: u.batchId, actor: i.value }),
          Vr,
          _e,
        ),
        g = [
          "选择样品任务",
          "填写实际事实",
          "查看并确认流转卡",
          "本人签名",
          "核对领样与文件",
          "领样完成",
        ],
        m = de(
          () =>
            ({
              SELECT: 0,
              FACTS: 1,
              CARD: 2,
              OPENING: 2,
              REVIEW: 2,
              SIGN: 3,
              VERIFY: 4,
              COMPLETE: 5,
              UNCERTAIN: 2,
            })[t.phase] ?? 0,
        ),
        w = {
          sample: "样品编号",
          quantity: "实际数量",
          unit: "单位",
          giver: "交样人",
          receiver: "本人领样人",
          receiverName: "领样人姓名",
          receivedAt: "实际领样时间",
          purpose: "用途",
          sampleState: "样品状态",
          storage: "库位",
          correctionOf: "更正原记录",
        },
        A = de(() =>
          t.cardRows
            .filter((l) => w[l.key] && (l.key !== "correctionOf" || l.value))
            .map((l) => {
              var f, S;
              return {
                label: w[l.key],
                value:
                  l.key === "giver"
                    ? ((f = B(t.record)) == null ? void 0 : f.giverName) ||
                      ((S = ce.value.find(
                        (W) => String(W.id) === String(l.value),
                      )) == null
                        ? void 0
                        : S.name) ||
                      "交样人姓名待回读"
                    : l.key === "receiver"
                      ? N.value
                      : l.key === "correctionOf"
                        ? "本样品原领用记录（保持不变）"
                        : l.value,
              };
            }),
        ),
        h = (l) =>
          l.canWithdraw === !0 &&
          String(l.operationBatchId) === String(u.batchId),
        V = (l) =>
          Y.value
            ? Y.value
            : t.busy
              ? "本次操作正在核对，请等待结果。"
              : t.pending
                ? "本次操作结果尚未确认，请先查询原请求结果。"
                : t.record
                  ? "请先完成或恢复当前领用，再选择其他样品。"
                  : h(l)
                    ? ""
                    : $e(
                        l.reason,
                        "样品尚不可领用，请核对接收状态、保存期限及本次实验批次后刷新。",
                      ),
        L = (l) =>
          String(l.receiver_user_id) === String(i.value) &&
          String(l.lab_task_list_id) === String(u.taskId),
        oe = (l) => L(l) && String(l.operation_batch_id) === String(u.batchId),
        v = (l) =>
          ({ RECEIVED: "已接收", REJECTED: "已拒收" })[l] || "状态待确认",
        K = (l) =>
          l == null
            ? "期限待回读"
            : typeof l == "number"
              ? new Date(l).toLocaleString("zh-CN")
              : String(l).replace("T", " "),
        B = (l) =>
          typeof l.facts_json == "string"
            ? JSON.parse(l.facts_json)
            : l.facts_json,
        we = (l) => {
          var f;
          try {
            return ((f = B(l)) == null ? void 0 : f.quantity) ?? "待回读";
          } catch {
            return "待回读";
          }
        };
      /* F5⁵ A+B: 相位钉死锁 + 空窗持续门（准修 57945808 / DIAG 91c65ccb） */
      /* F5⁶ A2+B2: 锁绑 recordId + 空窗盖 reset/te后清（准修 6a2d734d / DIAG 18fd5c5b） */
      let _f5ResumeLockGen = -1;
      let _f5ResumeLockRecordId = "";
      let _f5EmptyWindowTeArmed = !1;
      function __f5EmptyWindowGate() {
        /* B: record 真且 PENDING* 且 (phase≡SELECT 或 stepIndex≡0) → 必写 te+error */
        /* B2: 亦覆盖刚 resume 的 recordId 锁（reset 清 record 后禁静默 SELECT） */
        var _pendingRec =
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          );
        var _lockedWd = !!_f5ResumeLockRecordId;
        var _onSelect = !t.phase || t.phase === "SELECT" || m.value === 0;
        if ((_pendingRec || _lockedWd) && _onSelect) {
          var _f5eg =
            t.error ||
            te.value ||
            "继续领用后相位未落确认卡，请重试或联系管理员。";
          ((t.error = _f5eg), (te.value = _f5eg));
          _f5EmptyWindowTeArmed = !0;
          return !0;
        }
        return !1;
      }
      function __f5PhaseLockOnSelect() {
        /* A: resume 曾进 CARD/OPENING 且同 generation → 禁无旁注回 SELECT；强制 CARD */
        /* A2: 旁路纯 gen — 锁绑 recordId，reset→gen+1 后仍效 */
        var _onSelect = !t.phase || t.phase === "SELECT";
        if (!_onSelect) return !1;
        var _lockedByGen =
          _f5ResumeLockGen === t.generation &&
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          );
        var _lockedByRid = !!_f5ResumeLockRecordId;
        if (!_lockedByGen && !_lockedByRid) return !1;
        /* record 仍在且 PENDING*（id 匹配锁或仅 gen 锁）→ 强制 CARD */
        if (
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          ) &&
          (_lockedByGen ||
            String(t.record.id) === String(_f5ResumeLockRecordId))
        ) {
          t.phase = "CARD";
          var _f5pl =
            t.error ||
            te.value ||
            "继续领用相位被打断，已重新进入确认卡；请点「查看本次实际流转卡」。";
          ((t.error = _f5pl), (te.value = _f5pl));
          _f5EmptyWindowTeArmed = !0;
          return !0;
        }
        /* A2b: reset 清 record 后仍持 recordId 锁 → SELECT 必黄文「相位被打断」 */
        if (
          _lockedByRid &&
          (!t.record ||
            String((t.record && t.record.id) || "") !==
              String(_f5ResumeLockRecordId))
        ) {
          var _f5pl2 =
            t.error ||
            te.value ||
            "继续领用相位被打断，请重新点「继续本次领用」或联系管理员。";
          ((t.error = _f5pl2), (te.value = _f5pl2));
          _f5EmptyWindowTeArmed = !0;
          return !0;
        }
        return !1;
      }
      function __f5ReenterEmptyGateAfterTeClear() {
        /* B2: te 一经空窗门写入，被无关清后立即重入门 */
        if (_f5EmptyWindowTeArmed && !te.value) {
          __f5PhaseLockOnSelect();
          __f5EmptyWindowGate();
        }
      }
      function x() {
        c(
          "admission",
          Mr(t, { taskId: u.taskId, batchId: u.batchId, actor: i.value }),
        );
      }
      async function Ae() {
        var f, S;
        if (Q.value || !E.value) return;
        const l = await o.hydrateAdmitted(E.value);
        l != null &&
          l.ok &&
          (f = t.record) != null &&
          f.id &&
          (S = t.signature) != null &&
          S.result &&
          (re.value = { ...re.value, [t.record.id]: t.signature.result });
      }
      async function me() {
        var f, S, W;
        const l = t.generation;
        ((ee.value = !0), (Q.value = ""));
        try {
          const b = await Le(u.taskId);
          if (l !== t.generation) return;
          if (
            (b == null ? void 0 : b.code) !== 200 ||
            !Array.isArray((f = b.data) == null ? void 0 : f.stocks) ||
            !Array.isArray((S = b.data) == null ? void 0 : S.records)
          )
            throw new Error("contract incomplete");
          ((E.value = b.data),
            (F.value = b.data.stocks),
            ($.value = b.data.records));
        } catch (b) {
          l === t.generation &&
            (Q.value =
              ((W = b == null ? void 0 : b.response) == null
                ? void 0
                : W.status) === 403
                ? "当前无权读取本人领样来源，请刷新权限后处理"
                : "领样服务未就绪或连接异常；真实库存未回读时不能领样");
        } finally {
          l === t.generation && (ee.value = !1);
        }
      }
      async function ze() {
        var l;
        ((t.admitted = !1), x());
        try {
          await ((l = d.getInfo) == null ? void 0 : l.call(d));
        } catch {}
        (await me(), await Ae(), x());
      }
      function ge() {
        (Object.assign(P, {
          quantity: "",
          unit: "",
          giverUserId: null,
          receivedAt: null,
          purpose: "",
          sampleState: "",
        }),
          (se.value = null),
          (le.value = !1));
      }
      function Ke(l) {
        try {
          (o.select(l), ge(), (P.unit = l.quantity_unit || ""), x());
        } catch (f) {
          t.error = f.message;
        }
      }
      const Ze = async () => {
          if (!D.value) {
            t.error = "当前无领样事实写入权限";
            return;
          }
          (await o.prepare(P, se.value), x());
        },
        Xe = async () => {
          ((le.value = !1), await o.view(), x());
        },
        er = async () => {
          (await o.documentReady(), x());
        },
        rr = async () => {
          (await o.checkOpened(), x());
        },
        tr = async () => {
          D.value && (le.value && (await o.confirm()), x());
        },
        nr = async () => {
          if (!j.value) {
            t.error = "当前无本人签署权限，请恢复岗位签名权限";
            return;
          }
          (await o.sign(), x());
        },
        ar = async () => {
          j.value && (await o.verify(), t.completed && (await me()), x());
        },
        ir = async () => {
          (await o.recover(), x());
        },
        dr = async () => {
          (await Xr(t, o, async () => {
            if (Y.value) return !1;
            try {
              return (
                await Nr.confirm(
                  "已先查询，但本次操作仍未取得确定结果。确认重试同一次操作？原请求与原事实保持不变；权限不足时请先联系实验室负责人恢复。",
                  "重试本次原请求",
                  {
                    confirmButtonText: "重试本次原请求",
                    cancelButtonText: "继续查询",
                    type: "warning",
                  },
                ),
                !0
              );
            } catch {
              return !1;
            }
          }),
            x());
        };
      function lr() {
        (o.reset(), ge(), me(), x());
      }
      async function or(l) {
        if (!L(l) || !D.value || !j.value) return;
        await me();
        const f = F.value.find((S) => S.id === l.stock_id);
        if (Q.value || !f) {
          t.error = "原库存尚未读回，不能更正";
          return;
        }
        (o.select(f),
          ge(),
          (P.unit = f.quantity_unit),
          (se.value = l),
          (te.value = "追加更正需本人重签，原记录/卡/签名保留。"),
          x());
      }
      async function ur(l) {
        te.value = "";
        try {
          await o.resume(l);
        } catch (_urE) {
          /* F5⁗/B: resume 抛错也须同帧旁注；保留「对不上/只能恢复」原文 */
          var _um =
            (_urE && _urE.message && String(_urE.message)) ||
            t.error ||
            "本次继续领用未完成，请刷新后重试或先查询原请求";
          (t.error = t.error || _um), (te.value = te.value || _um);
        }
        /* F5‴: PENDING 且有卡指纹而 phase∉{CARD,OPENING,REVIEW} → 强制 CARD 或显式 FAIL 旁注 */
        var _hasFp =
          !!t.record &&
          (R(t.record.cardVersion) ||
            R(t.record.card_file_id) ||
            R(t.record.cardId)) &&
          Ce(t.record.cardSha256);
        if (
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          ) &&
          _hasFp &&
          !["CARD", "OPENING", "REVIEW"].includes(t.phase) &&
          !["VERIFY", "SIGN", "COMPLETE"].includes(t.phase)
        ) {
          t.phase = "CARD";
          var _f5msg =
            t.error ||
            "继续领用后相位未落确认卡，已强制进入；请点「查看本次实际流转卡」。";
          ((t.error = _f5msg), (te.value = _f5msg));
        } else if (
          t.record &&
          ["CARD", "OPENING", "REVIEW", "VERIFY", "SIGN", "COMPLETE"].includes(
            t.phase,
          )
        ) {
          /* F5″: 契约/开会话失败错文同帧保留（禁吞） */
          te.value = t.error || "";
          try {
            setTimeout(() => {
              const _el = document.querySelector(
                ".withdrawal-panel .withdrawal-current",
              );
              _el &&
                _el.scrollIntoView &&
                _el.scrollIntoView({ block: "start", behavior: "smooth" });
            }, 0);
          } catch {}
        } else {
          var Ne =
            t.error || "本次继续领用未完成，请刷新后重试或先查询原请求";
          (t.error || (t.error = Ne), (te.value = Ne));
        }
        /* F5⁗: 空窗兜底 — resume 后若仍 SELECT/步① → 必写同帧 te+error（禁空停步1） */
        if (!t.phase || t.phase === "SELECT") {
          var _f5q =
            t.error ||
            te.value ||
            "继续领用后相位未落确认卡，请重试或联系管理员。";
          ((t.error = _f5q), (te.value = _f5q));
        }
        /* F5⁵ A: resume 进入 CARD/OPENING/REVIEW 后钉死 generation 锁 */
        if (["CARD", "OPENING", "REVIEW"].includes(t.phase)) {
          _f5ResumeLockGen = t.generation;
        }
        /* F5⁶ A2: 进入 CARD/OPENING/REVIEW 或 verification PENDING* → 钉 recordId（不因 gen bump 失效） */
        if (
          t.record &&
          t.record.id &&
          (["CARD", "OPENING", "REVIEW"].includes(t.phase) ||
            ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
              t.record.state,
            ))
        ) {
          _f5ResumeLockRecordId = String(t.record.id);
        }
        /* F5⁵ B: 空窗持续门（ur 尾再检一次 PENDING*+步①） */
        __f5EmptyWindowGate();
        x();
      }
      async function sr(l) {
        var S, W;
        const f = t.generation;
        ue.value = null;
        try {
          const b = await We(l.id);
          if (f !== t.generation) return;
          if (
            (b == null ? void 0 : b.code) !== 200 ||
            ((S = b.data) == null ? void 0 : S.state) !== "SIGN_COMPLETED"
          ) {
            te.value =
              "原事实保持待完成；不能把旧回执或只生成签名文件当成已核验历史。";
            return;
          }
          const T = await je(l.id);
          if (f !== t.generation) return;
          Ve(b.data, l, T, i.value);
          const M = await n(T.bytes, b.data.signatureBinding, B(l));
          if (f !== t.generation) return;
          ((re.value = { ...re.value, [l.id]: b.data }),
            (ue.value = {
              bytes: T.bytes,
              version: b.data.signatureFileVersion,
              signedAt: b.data.signedAt,
              ownerUserId: l.receiver_user_id,
            }),
            (z.value = {
              sampleNo: l.sample_no,
              quantity: we(l),
              unit: l.quantity_unit,
              signedAt: b.data.signedAt || b.data.signatureBinding.signedAt,
              signerName:
                ((W = B(l)) == null ? void 0 : W.receiverName) || N.value,
              version: b.data.signatureFileVersion,
              bindingRows: M,
            }),
            (fe.value = !0),
            (te.value =
              "本人的原记录、卡版本与实际签名文件已独立读回，原签署历史保持不可变。"));
        } catch {
          f === t.generation &&
            (te.value =
              "当前本人无权或历史文件/事实未一致，不能标记为已核验；请核对来源与权限。");
        }
      }
      function Re(l, f) {
        if (
          !q.value ||
          !(l != null && l.bytes) ||
          String(l.ownerUserId) !== String(i.value)
        )
          return;
        const S = URL.createObjectURL(
            new Blob([l.bytes], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
          ),
          W = document.createElement("a");
        ((W.href = S),
          (W.download =
            String(f).replace(/[\\/:*?"<>|]/g, "-") +
            "_本人签署_" +
            String(l.signedAt).slice(0, 19).replace(/[T:]/g, "-") +
            "_第" +
            l.version +
            "版.xlsx"),
          W.click(),
          setTimeout(() => URL.revokeObjectURL(S), 0));
      }
      async function cr() {
        if (!t.record || t.pending || t.busy || !D.value) return;
        const l = t.record;
        if ((await me(), Q.value)) return;
        const f = F.value.find((S) => S.id === l.stock_id);
        if (!f) {
          t.error = "原库存最新版本未回读";
          return;
        }
        (o.reset(),
          o.select(f),
          ge(),
          (P.unit = f.quantity_unit),
          (se.value = l),
          (te.value =
            "为待完成旧记录追加新事实，原记录与文件保留，新事实需本人重新查看、确认、签署和核验。"),
          x());
      }
      /* F5⁵ A+B: 持续 watch — phase/record/state/step 变时相位钉死+空窗门 */
      /* F5⁶ B2: immediate 首帧必检；te 后清立即重入 */
      return (
        xe(
          () =>
            [
              t.phase,
              (t.record && t.record.id) || "",
              (t.record && t.record.state) || "",
              m.value,
            ].join("|"),
          () => {
            __f5PhaseLockOnSelect();
            __f5EmptyWindowGate();
          },
          { immediate: !0 },
        ),
        xe(
          () => te.value,
          () => {
            __f5ReenterEmptyGateAfterTeClear();
          },
        ),
        xe(
          () => [u.taskId, u.batchId, i.value].join(":"),
          async () => {
            let l;
            try {
              l = JSON.parse(sessionStorage.getItem(ye()) || "null");
            } catch {}
            (o.reset(),
              ge(),
              (F.value = []),
              ($.value = []),
              (E.value = {}),
              (fe.value = !1),
              (z.value = null),
              (ue.value = null),
              (re.value = {}),
              (te.value = ""));
            /* F5⁶ B2: reset/te 清后立即重入门（禁静默 SELECT） */
            __f5PhaseLockOnSelect();
            __f5EmptyWindowGate();
            const f = t.generation,
              S = Gr(l, {
                actor: i.value,
                taskId: u.taskId,
                batchId: u.batchId,
              });
            if (
              (S &&
                l.pending &&
                (Object.assign(t, l, {
                  phase: "UNCERTAIN",
                  completed: !1,
                  admitted: !1,
                }),
                _e(t.pending),
                (t.error = "已恢复本人原请求，请先查询结果")),
              await me(),
              f === t.generation)
            ) {
              if (
                S &&
                t.pending &&
                (t.pending.kind === "view" || t.pending.kind === "ready")
              ) {
                ((t.pending = null),
                  _e(null),
                  (t.phase = t.record ? "CARD" : t.phase),
                  (t.error =
                    "已弃未确认的流转卡查看态（禁view键当查询键），请重新查看"));
              }
              if (
                S &&
                t.pending &&
                t.pending.kind === "prepare" &&
                t.pending.payload
              ) {
                const _hitR = ($.value || []).find(
                  (b) =>
                    s(b.sampleId, t.pending.payload.sampleId) &&
                    s(b.stock_id, t.pending.payload.stockId) &&
                    s(b.receiver_user_id, i.value) &&
                    ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
                      b.state,
                    ),
                );
                if (_hitR) {
                  const _ridR = _hitR.requestId || _hitR.request_id;
                  if (
                    _ridR != null &&
                    String(_ridR).trim() !== "" &&
                    String(_ridR).trim() !==
                      String(t.pending.payload.requestId || "").trim()
                  ) {
                    ((t.pending.payload.requestId = String(_ridR).trim()),
                      _e(t.pending));
                  }
                }
              }
              if (
                S &&
                t.pending &&
                t.pending.kind === "prepare" &&
                f === t.generation &&
                !t.busy
              ) {
                /* F3: pending 恢复后自动一次 recover（=查询原请求结果） */
                await o.recover();
                if (f !== t.generation) return;
              }
              if (S && !l.pending) {
                const W = $.value.find((b) => b.id === l.record.id);
                W && (await o.resume(W));
              }
              f === t.generation &&
                ((S && l != null && l.pending) || (await Ae()),
                f === t.generation && x());
            }
          },
          { immediate: !0 },
        ),
        xe(
          () => (d.permissions || []).join("|"),
          () => {
            ((t.admitted = !1), x());
          },
        ),
        (l, f) => {
          const S = U("el-step"),
            W = U("el-steps"),
            b = U("el-alert"),
            T = U("el-button"),
            M = U("el-table-column"),
            Se = U("el-table"),
            ae = U("el-form-item"),
            Ee = U("el-input"),
            fr = U("el-option"),
            mr = U("el-select"),
            pr = U("el-date-picker"),
            yr = U("el-form"),
            gr = U("el-checkbox"),
            Ie = U("el-descriptions-item"),
            Ir = U("el-descriptions"),
            vr = U("el-dialog"),
            hr = U("el-card");
          return (
            k(),
            G(
              hr,
              { shadow: "never", class: "mb8 withdrawal-panel" },
              {
                header: p(() => [et]),
                default: p(() => {
                  var De, Te, qe, Fe;
                  return [
                    y(
                      W,
                      { active: m.value, class: "mb12 withdrawal-steps" },
                      {
                        default: p(() => [
                          (k(),
                          ie(
                            Be,
                            null,
                            Ue(g, (I) =>
                              y(S, { key: I, title: I }, null, 8, ["title"]),
                            ),
                            64,
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ["active"],
                    ),
                    t.error || Q.value
                      ? (k(),
                        G(
                          b,
                          {
                            key: 0,
                            title: Ge($e)(
                              t.error || Q.value,
                              "本次领样结果尚未确认，请先查询原请求结果或刷新来源。",
                            ),
                            type: "warning",
                            closable: !1,
                          },
                          null,
                          8,
                          ["title"],
                        ))
                      : O("", !0),
                    be(
                      "p",
                      null,
                      "检测任务：" +
                        C(E.value.taskNo || "已选检测任务（编号待回读）") +
                        "；领样人：" +
                        C(N.value || "本人身份待回读") +
                        "。",
                      1,
                    ),
                    y(
                      T,
                      { loading: ee.value, onClick: ze },
                      { default: p(() => [_("刷新本人权限与来源")]), _: 1 },
                      8,
                      ["loading"],
                    ),
                    Y.value
                      ? (k(),
                        G(
                          b,
                          {
                            key: 1,
                            title: Y.value,
                            type: "warning",
                            closable: !1,
                          },
                          null,
                          8,
                          ["title"],
                        ))
                      : O("", !0),
                    y(
                      Se,
                      {
                        data: F.value,
                        border: "",
                        "empty-text": ee.value
                          ? "正在读取本人领样来源，请稍候…（读取完成前不代表无可领样品）"
                          : Q.value
                            ? "领样来源尚未读回，请点「刷新本人权限与来源」；不代表无可领样品。"
                            : "暂无本次任务可领用的已接收样品。请先在样品接收或样品交接页完成接收与保存，再回本页刷新；若找不到这两个入口，请联系实验室负责人核对权限。",
                      },
                      {
                        default: p(() => [
                          y(M, { prop: "sample_no", label: "样品编号" }),
                          y(M, { prop: "storage_location", label: "库位" }),
                          y(
                            M,
                            { label: "状态" },
                            {
                              default: p(({ row: I }) => [
                                _(C(v(I.stock_state)), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          y(
                            M,
                            { label: "期限" },
                            {
                              default: p(({ row: I }) => [
                                _(C(K(I.expires_at)), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          y(
                            M,
                            { label: "可领量" },
                            {
                              default: p(({ row: I }) => [
                                _(
                                  C(I.availableQuantity ?? "待回读") +
                                    " " +
                                    C(I.quantity_unit),
                                  1,
                                ),
                              ]),
                              _: 1,
                            },
                          ),
                          y(
                            M,
                            { label: "当前操作" },
                            {
                              default: p(({ row: I }) => [
                                y(
                                  T,
                                  {
                                    disabled:
                                      !q.value ||
                                      t.busy ||
                                      !!t.pending ||
                                      !!t.record ||
                                      !h(I) ||
                                      !D.value ||
                                      !j.value,
                                    onClick: (Ne) => Ke(I),
                                  },
                                  {
                                    default: p(() => [_("选择样品任务")]),
                                    _: 2,
                                  },
                                  1032,
                                  ["disabled", "onClick"],
                                ),
                                V(I)
                                  ? (k(), ie("p", rt, C(V(I)), 1))
                                  : O("", !0),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["data", "empty-text"],
                    ),
                    t.stock && !t.record
                      ? (k(),
                        G(
                          yr,
                          {
                            key: 2,
                            model: P,
                            disabled: !D.value || t.busy || !!t.pending,
                            "label-width": "120px",
                            class: "withdrawal-facts",
                          },
                          {
                            default: p(() => [
                              y(
                                ae,
                                { label: "本次样品" },
                                {
                                  default: p(() => [
                                    _(
                                      C(t.stock.sample_no) +
                                        " / " +
                                        C(t.stock.storage_location),
                                      1,
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "实际数量", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      Ee,
                                      {
                                        modelValue: P.quantity,
                                        "onUpdate:modelValue":
                                          f[0] ||
                                          (f[0] = (I) => (P.quantity = I)),
                                        placeholder: "本次真实数量",
                                      },
                                      null,
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "单位", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      Ee,
                                      { "model-value": P.unit, disabled: "" },
                                      null,
                                      8,
                                      ["model-value"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "实际交样人", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      mr,
                                      {
                                        modelValue: P.giverUserId,
                                        "onUpdate:modelValue":
                                          f[1] ||
                                          (f[1] = (I) => (P.giverUserId = I)),
                                        placeholder: "选择本次交样人员",
                                        filterable: "",
                                      },
                                      {
                                        default: p(() => [
                                          (k(!0),
                                          ie(
                                            Be,
                                            null,
                                            Ue(
                                              ce.value,
                                              (I) => (
                                                k(),
                                                G(
                                                  fr,
                                                  {
                                                    key: I.id,
                                                    value: I.id,
                                                    label: I.name,
                                                  },
                                                  null,
                                                  8,
                                                  ["value", "label"],
                                                )
                                              ),
                                            ),
                                            128,
                                          )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["modelValue"],
                                    ),
                                    ce.value.length
                                      ? O("", !0)
                                      : (k(),
                                        ie(
                                          "span",
                                          tt,
                                          "实际人员名单待回读，不自动使用历史交样人。",
                                        )),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "本人领样人" },
                                {
                                  default: p(() => [
                                    _(
                                      C(N.value || "本人身份待确认") +
                                        "（服务器绑定本人）",
                                      1,
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "实际领样时间", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      pr,
                                      {
                                        modelValue: P.receivedAt,
                                        "onUpdate:modelValue":
                                          f[2] ||
                                          (f[2] = (I) => (P.receivedAt = I)),
                                        type: "datetime",
                                        "value-format": "YYYY-MM-DDTHH:mm:ss",
                                        placeholder: "填写实际发生时间",
                                      },
                                      null,
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "本次用途", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      Ee,
                                      {
                                        modelValue: P.purpose,
                                        "onUpdate:modelValue":
                                          f[3] ||
                                          (f[3] = (I) => (P.purpose = I)),
                                        maxlength: "160",
                                      },
                                      null,
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              y(
                                ae,
                                { label: "样品实际状态", required: "" },
                                {
                                  default: p(() => [
                                    y(
                                      Ee,
                                      {
                                        modelValue: P.sampleState,
                                        "onUpdate:modelValue":
                                          f[4] ||
                                          (f[4] = (I) => (P.sampleState = I)),
                                        maxlength: "120",
                                      },
                                      null,
                                      8,
                                      ["modelValue"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              se.value
                                ? (k(),
                                  G(
                                    ae,
                                    { key: 0 },
                                    {
                                      default: p(() => [
                                        _(
                                          "追加更正保留原记录和原签名，新事实须本人重签。",
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                  ))
                                : O("", !0),
                              y(ae, null, {
                                default: p(() => [
                                  y(
                                    T,
                                    {
                                      type: "primary",
                                      disabled: !ce.value.length,
                                      loading: t.busy,
                                      onClick: Ze,
                                    },
                                    {
                                      default: p(() => [
                                        _("记录事实并生成本次流转卡"),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["disabled", "loading"],
                                  ),
                                ]),
                                _: 1,
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["model", "disabled"],
                        ))
                      : O("", !0),
                    t.record
                      ? (k(),
                        ie("section", nt, [
                          t.completed
                            ? O("", !0)
                            : (k(),
                              G(
                                T,
                                {
                                  key: 0,
                                  disabled: t.busy || !!t.pending || !D.value,
                                  onClick: cr,
                                },
                                {
                                  default: p(() => [
                                    _(
                                      C(
                                        t.record.state === "SIGN_COMPLETED"
                                          ? "追加更正并重签"
                                          : "追加新事实替换待完成记录",
                                      ),
                                      1,
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["disabled"],
                              )),
                          be(
                            "p",
                            null,
                            "本次样品 " +
                              C(t.record.sample_no) +
                              "；" +
                              C(
                                t.completed ? "本人领样已核验" : "领样尚未完成",
                              ) +
                              "。",
                            1,
                          ),
                          ["CARD", "REVIEW", "OPENING"].includes(t.phase)
                            ? (k(),
                              G(
                                T,
                                {
                                  key: 1,
                                  disabled: !q.value || t.busy || !!t.pending,
                                  onClick: Xe,
                                },
                                {
                                  default: p(() => [_("查看本次实际流转卡")]),
                                  _: 1,
                                },
                                8,
                                ["disabled"],
                              ))
                            : O("", !0),
                          t.document
                            ? (k(),
                              ie(
                                "p",
                                at,
                                "本人核对的原流转卡 · 第 " +
                                  C(t.view && t.view.cardVersion) +
                                  " 版",
                                1,
                              ))
                            : O("", !0),
                          ie(
                            "div",
                            { key: "rho-oo-wrap", class: "withdrawal-oo-wrap" },
                            [
                              (De = t.document) != null &&
                              De.documentServerUrl &&
                              (Te = t.document) != null &&
                              Te.documentConfig
                                ? (k(),
                                  G(
                                    Cr,
                                    {
                                      key:
                                        (qe = t.view) == null
                                          ? void 0
                                          : qe.viewSessionId,
                                      "document-server-url":
                                        t.document.documentServerUrl,
                                      "document-config":
                                        t.document.documentConfig,
                                      mode: "view",
                                      height: "460px",
                                      onDocumentReady: er,
                                    },
                                    null,
                                    8,
                                    ["document-server-url", "document-config"],
                                  ))
                                : O("", !0),
                            ],
                          ),
                          ie(
                            "div",
                            {
                              key: "rho-ready-confirm",
                              class: "withdrawal-ready-confirm",
                            },
                            [
                              t.phase === "CARD" ||
                              t.phase === "OPENING" ||
                              ((Fe = t.pending) == null ? void 0 : Fe.kind) ===
                                "ready"
                                ? (k(),
                                  ie("div", { key: 0 }, [
                                    y(
                                      T,
                                      {
                                        disabled: t.documentReady !== !0,
                                        loading: t.busy,
                                        onClick: rr,
                                      },
                                      {
                                        default: p(() => [
                                          _("确认本次流转卡已加载"),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["disabled", "loading"],
                                    ),
                                    t.documentReady !== !0
                                      ? (k(),
                                        ie(
                                          "span",
                                          { key: 1, class: "muted" },
                                          "现在还不能确认，请先查看文件（未查看文件则确认为灰）",
                                          -1,
                                        ))
                                      : O("", !0),
                                  ]))
                                : O("", !0),
                            ],
                          ),
                          ie(
                            "div",
                            {
                              key: "rho-card-rows",
                              class: "withdrawal-card-rows",
                            },
                            [
                              t.cardRows.length
                                ? (k(),
                                  G(
                                    Se,
                                    { key: 0, data: A.value, border: "" },
                                    {
                                      default: p(() => [
                                        y(M, {
                                          prop: "label",
                                          label: "流转卡字段",
                                        }),
                                        y(M, {
                                          prop: "value",
                                          label:
                                            "本次事实对照（以在线流转卡为准）",
                                        }),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["data"],
                                  ))
                                : O("", !0),
                            ],
                          ),
                          ie(
                            "div",
                            {
                              key: "rho-review-confirm",
                              class: "withdrawal-review-confirm",
                            },
                            [
                              t.phase === "REVIEW"
                                ? (k(),
                                  ie("div", { key: 0 }, [
                                    y(
                                      gr,
                                      {
                                        modelValue: le.value,
                                        "onUpdate:modelValue":
                                          f[5] ||
                                          (f[5] = (I) => (le.value = I)),
                                      },
                                      {
                                        default: p(() => [
                                          _(
                                            "本人已查看实际流转卡并核对本次事实",
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["modelValue"],
                                    ),
                                    y(
                                      T,
                                      {
                                        disabled:
                                          !le.value || !D.value || t.busy,
                                        onClick: tr,
                                      },
                                      {
                                        default: p(() => [
                                          _("本人确认对应流转卡行"),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["disabled"],
                                    ),
                                  ]))
                                : O("", !0),
                            ],
                          ),
                          t.phase === "SIGN"
                            ? (k(),
                              G(
                                T,
                                {
                                  key: 7,
                                  type: "primary",
                                  disabled: !j.value || t.busy,
                                  onClick: nr,
                                },
                                { default: p(() => [_("本人签名")]), _: 1 },
                                8,
                                ["disabled"],
                              ))
                            : O("", !0),
                          ["VERIFY", "COMPLETE"].includes(t.phase)
                            ? (k(),
                              G(
                                T,
                                {
                                  key: 8,
                                  disabled: !j.value,
                                  loading: t.busy,
                                  onClick: ar,
                                },
                                {
                                  default: p(() => [
                                    _("核对本次领样与签署文件"),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["disabled", "loading"],
                              ))
                            : O("", !0),
                          t.phase === "VERIFY"
                            ? (k(),
                              ie(
                                "p",
                                dt,
                                "正在等待本次事实、本人签署、文件版本与实际文件读回一致。",
                              ))
                            : O("", !0),
                          t.completed && t.admitted
                            ? (k(),
                              G(b, {
                                key: 10,
                                title:
                                  "本人领样和签名文件已独立核验，可以申请前处理/分析；服务器仍再次核验。",
                                type: "success",
                                closable: !1,
                              }))
                            : O("", !0),
                          t.completed && t.signatureFile
                            ? (k(),
                              ie("p", lt, [
                                _(
                                  "本人签署文件 · 第 " +
                                    C(t.signatureFile.version) +
                                    " 版（实际文件已核验）",
                                  1,
                                ),
                                y(
                                  T,
                                  {
                                    disabled: !q.value,
                                    onClick:
                                      f[6] ||
                                      (f[6] = (I) =>
                                        Re(
                                          t.signatureFile,
                                          t.record.sample_no,
                                        )),
                                  },
                                  {
                                    default: p(() => [
                                      _("下载本次本人签署流转卡"),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["disabled"],
                                ),
                              ]))
                            : O("", !0),
                        ]))
                      : O("", !0),
                    t.pending
                      ? (k(),
                        ie("div", ot, [
                          y(
                            T,
                            { loading: t.busy, onClick: ir },
                            { default: p(() => [_("查询原请求结果")]), _: 1 },
                            8,
                            ["loading"],
                          ),
                          y(
                            T,
                            { disabled: t.busy, onClick: dr },
                            { default: p(() => [_("查询后重试原请求")]), _: 1 },
                            8,
                            ["disabled"],
                          ),
                          ut,
                        ]))
                      : O("", !0),
                    t.completed && !t.busy
                      ? (k(),
                        G(
                          T,
                          { key: 5, onClick: lr },
                          { default: p(() => [_("追加下一次领用")]), _: 1 },
                        ))
                      : O("", !0),
                    y(
                      Se,
                      {
                        data: $.value,
                        border: "",
                        class: "withdrawal-history",
                      },
                      {
                        default: p(() => [
                          y(M, { prop: "sample_no", label: "历史样品" }),
                          y(
                            M,
                            { label: "数量/单位" },
                            {
                              default: p(({ row: I }) => [
                                _(C(we(I)) + " " + C(I.quantity_unit), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          y(
                            M,
                            { label: "状态" },
                            {
                              default: p(({ row: I }) => [
                                _(C(Ge(Kr)(I, re.value[I.id])), 1),
                              ]),
                              _: 1,
                            },
                          ),
                          y(
                            M,
                            { label: "操作" },
                            {
                              default: p(({ row: I }) => [
                                y(
                                  T,
                                  {
                                    disabled: t.busy || !!t.pending,
                                    onClick: (Ne) => sr(I),
                                  },
                                  { default: p(() => [_("查看原事实")]), _: 2 },
                                  1032,
                                  ["disabled", "onClick"],
                                ),
                                y(
                                  T,
                                  {
                                    disabled:
                                      t.busy ||
                                      (!!t.record &&
                                        ![
                                          "PENDING_CONFIRMATION",
                                          "PENDING_VERIFICATION",
                                        ].includes(t.record.state)) ||
                                      !oe(I),
                                    onClick: (Ne) => ur(I),
                                  },
                                  {
                                    default: p(() => [_("继续本次领用")]),
                                    _: 2,
                                  },
                                  1032,
                                  ["disabled", "onClick"],
                                ),
                                y(
                                  T,
                                  {
                                    disabled:
                                      !D.value ||
                                      !j.value ||
                                      t.busy ||
                                      !!t.pending ||
                                      !!t.record ||
                                      !L(I),
                                    onClick: (Ne) => or(I),
                                  },
                                  {
                                    default: p(() => [_("追加更正并重签")]),
                                    _: 2,
                                  },
                                  1032,
                                  ["disabled", "onClick"],
                                ),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["data"],
                    ),
                    te.value
                      ? (k(),
                        ie(
                          "p",
                          {
                            key: "resume-mismatch",
                            class: "muted resume-mismatch-note",
                          },
                          C(te.value),
                          1,
                        ))
                      : O("", !0),
                    te.value
                      ? (k(),
                        G(
                          b,
                          {
                            key: 6,
                            title: te.value,
                            type: "warning",
                            closable: !1,
                          },
                          null,
                          8,
                          ["title"],
                        ))
                      : O("", !0),
                    y(
                      vr,
                      {
                        modelValue: fe.value,
                        "onUpdate:modelValue":
                          f[8] || (f[8] = (I) => (fe.value = I)),
                        title: "本人原领样签署历史",
                        width: "620px",
                      },
                      {
                        footer: p(() => [
                          y(
                            T,
                            {
                              disabled: !q.value || !ue.value,
                              onClick:
                                f[7] ||
                                (f[7] = (I) => Re(ue.value, z.value.sampleNo)),
                            },
                            {
                              default: p(() => [_("下载原本人签署流转卡")]),
                              _: 1,
                            },
                            8,
                            ["disabled"],
                          ),
                        ]),
                        default: p(() => [
                          z.value
                            ? (k(),
                              G(
                                Ir,
                                { key: 0, column: 1, border: "" },
                                {
                                  default: p(() => [
                                    y(
                                      Ie,
                                      { label: "样品编号" },
                                      {
                                        default: p(() => [
                                          _(C(z.value.sampleNo), 1),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                    y(
                                      Ie,
                                      { label: "原实际数量" },
                                      {
                                        default: p(() => [
                                          _(
                                            C(z.value.quantity) +
                                              " " +
                                              C(z.value.unit),
                                            1,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                    y(
                                      Ie,
                                      { label: "本人签署人" },
                                      {
                                        default: p(() => [
                                          _(C(z.value.signerName), 1),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                    y(
                                      Ie,
                                      { label: "实际签署时间" },
                                      {
                                        default: p(() => [
                                          _(C(z.value.signedAt), 1),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                    y(
                                      Ie,
                                      { label: "原文件版本" },
                                      {
                                        default: p(() => [
                                          _(
                                            "第 " +
                                              C(z.value.version) +
                                              " 版（实际字节已核验）",
                                            1,
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ))
                            : O("", !0),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"],
                    ),
                    st,
                  ];
                }),
                _: 1,
              },
            )
          );
        }
      );
    },
  },
  ft = wr(ct, [["__scopeId", "data-v-9b6c4c89"]]),
  vt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: ft },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
export { ft as L, vt as a, It as w };
