const J =
    "/lab/withdrawals" /*TIP_RHO_R2_TIP1_FE_PENDING_FILL_IDENTITY_20261017*/ /*TIP_RHO_R2_TIP1_FE_NO_DIRTY_RECORD_UR_PHASE_20261017*/ /*TIP_RHO_VIEW_FILES_FILENAME_FE_GRAY_20261016*/ /*TIP_RHO_T1_REQUESTID_QUERY_20261016*/ /*TIP_RHO_FE_CONFIRM_CARD_CONTINUE_20261016*/ /*TIP_T1_SESSION_RESTORE_LIB_REQUESTID_20261016*/ /*TIP_T1_FE_DROP_VIEW_PENDING_QUERY_LIB_KEY_20261016*/ /*TIP_LINGYANG_FE_F5PRIME_9d43c4b0_20261017*/,
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

export { Qr, Je };
