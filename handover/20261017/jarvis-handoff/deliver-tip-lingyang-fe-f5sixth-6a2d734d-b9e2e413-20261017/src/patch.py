# -*- coding: utf-8 -*-
"""F5⁶ A2 recordId lock + B2 empty-window covers reset/te-clear on tip 50ea6b9f (F5⁵ LIVE). FE-only LabSampleHandoverPanel."""
import sys
s = open("base-pretty.js", encoding="utf-8").read()

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count:
        sys.exit(f"MISMATCH {n}!={count}: {old[:240]!r}")
    s = s.replace(old, new)

# Tip stamp on J const (append after F5FIFTH stamp)
rep(
    '/*TIP_LINGYANG_FE_F5FIFTH_57945808_20261017*/',
    '/*TIP_LINGYANG_FE_F5FIFTH_57945808_20261017*/ /*TIP_LINGYANG_FE_F5SIXTH_6a2d734d_20261017*/',
)

# --- Deepen A+B helpers → A2+B2 (keep F5⁵ names/bytes intent; deepen predicates) ---
rep(
    """      /* F5⁵ A+B: 相位钉死锁 + 空窗持续门（准修 57945808 / DIAG 91c65ccb） */
      let _f5ResumeLockGen = -1;
      function __f5EmptyWindowGate() {
        /* B: record 真且 PENDING* 且 (phase≡SELECT 或 stepIndex≡0) → 必写 te+error */
        if (
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          ) &&
          (!t.phase || t.phase === "SELECT" || m.value === 0)
        ) {
          var _f5eg =
            t.error ||
            te.value ||
            "继续领用后相位未落确认卡，请重试或联系管理员。";
          ((t.error = _f5eg), (te.value = _f5eg));
          return !0;
        }
        return !1;
      }
      function __f5PhaseLockOnSelect() {
        /* A: resume 曾进 CARD/OPENING 且同 generation → 禁无旁注回 SELECT；强制 CARD */
        if (
          _f5ResumeLockGen === t.generation &&
          t.record &&
          ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(
            t.record.state,
          ) &&
          (!t.phase || t.phase === "SELECT")
        ) {
          t.phase = "CARD";
          var _f5pl =
            t.error ||
            te.value ||
            "继续领用相位被打断，已重新进入确认卡；请点「查看本次实际流转卡」。";
          ((t.error = _f5pl), (te.value = _f5pl));
          return !0;
        }
        return !1;
      }""",
    """      /* F5⁵ A+B: 相位钉死锁 + 空窗持续门（准修 57945808 / DIAG 91c65ccb） */
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
      }""",
)

# --- ur: deepen lock write to recordId (keep gen lock) ---
rep(
    """        /* F5⁵ A: resume 进入 CARD/OPENING/REVIEW 后钉死 generation 锁 */
        if (["CARD", "OPENING", "REVIEW"].includes(t.phase)) {
          _f5ResumeLockGen = t.generation;
        }
        /* F5⁵ B: 空窗持续门（ur 尾再检一次 PENDING*+步①） */
        __f5EmptyWindowGate();
        x();
      }""",
    """        /* F5⁵ A: resume 进入 CARD/OPENING/REVIEW 后钉死 generation 锁 */
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
      }""",
)

# --- continuous watch: add immediate + te-clear re-enter ---
rep(
    """      /* F5⁵ A+B: 持续 watch — phase/record/state/step 变时相位钉死+空窗门 */
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
        ),
        xe(
          () => [u.taskId, u.batchId, i.value].join(":"),
          async () => {""",
    """      /* F5⁵ A+B: 持续 watch — phase/record/state/step 变时相位钉死+空窗门 */
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
          async () => {""",
)

# --- task watcher: after te="" + reset, B2 re-enter ---
rep(
    """            (o.reset(),
              ge(),
              (F.value = []),
              ($.value = []),
              (E.value = {}),
              (fe.value = !1),
              (z.value = null),
              (ue.value = null),
              (re.value = {}),
              (te.value = ""));
            const f = t.generation,""",
    """            (o.reset(),
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
            const f = t.generation,""",
)

open("patched-pretty.js", "w", encoding="utf-8").write(s)
print("OK len", len(s))
for m in [
    "TIP_LINGYANG_FE_F5SIXTH_6a2d734d",
    "TIP_LINGYANG_FE_F5FIFTH_57945808",
    "_f5ResumeLockRecordId",
    "_f5EmptyWindowTeArmed",
    "__f5ReenterEmptyGateAfterTeClear",
    "immediate: !0",
    "继续领用相位被打断",
    "__f5EmptyWindowGate",
    "__f5PhaseLockOnSelect",
    "_f5ResumeLockGen",
]:
    if m not in s:
        sys.exit(f"MISSING marker {m}")
print("MARKERS_OK")
