# -*- coding: utf-8 -*-
"""F5⁵ phase lock + empty-window continuous gate on tip 3b7a8a6a (F5quadra LIVE). FE-only LabSampleHandoverPanel."""
import sys
s = open("base-pretty.js", encoding="utf-8").read()

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count:
        sys.exit(f"MISMATCH {n}!={count}: {old[:200]!r}")
    s = s.replace(old, new)

# Tip stamp on J const (append after F5QUAD stamp)
rep(
    '/*TIP_LINGYANG_FE_F5QUAD_57642542_20261017*/',
    '/*TIP_LINGYANG_FE_F5QUAD_57642542_20261017*/ /*TIP_LINGYANG_FE_F5FIFTH_57945808_20261017*/',
)

# --- A+B helpers: after setup (te/m/o ready), before function x() ---
rep(
    """        };
      function x() {
        c(
          "admission",
          Mr(t, { taskId: u.taskId, batchId: u.batchId, actor: i.value }),
        );
      }""",
    """        };
      /* F5⁵ A+B: 相位钉死锁 + 空窗持续门（准修 57945808 / DIAG 91c65ccb） */
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
      }
      function x() {
        c(
          "admission",
          Mr(t, { taskId: u.taskId, batchId: u.batchId, actor: i.value }),
        );
      }""",
)

# --- ur: after F5⁗ block, before x() — set lock gen + call empty-window gate ---
rep(
    """        /* F5⁗: 空窗兜底 — resume 后若仍 SELECT/步① → 必写同帧 te+error（禁空停步1） */
        if (!t.phase || t.phase === "SELECT") {
          var _f5q =
            t.error ||
            te.value ||
            "继续领用后相位未落确认卡，请重试或联系管理员。";
          ((t.error = _f5q), (te.value = _f5q));
        }
        x();
      }""",
    """        /* F5⁗: 空窗兜底 — resume 后若仍 SELECT/步① → 必写同帧 te+error（禁空停步1） */
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
        /* F5⁵ B: 空窗持续门（ur 尾再检一次 PENDING*+步①） */
        __f5EmptyWindowGate();
        x();
      }""",
)

# --- continuous watch before existing return xe(...) ---
rep(
    """      return (
        xe(
          () => [u.taskId, u.batchId, i.value].join(":"),
          async () => {""",
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
)

open("patched-pretty.js", "w", encoding="utf-8").write(s)
print("OK len", len(s))
# sanity markers
for m in [
    "TIP_LINGYANG_FE_F5FIFTH_57945808",
    "__f5EmptyWindowGate",
    "__f5PhaseLockOnSelect",
    "_f5ResumeLockGen",
    "继续领用相位被打断",
]:
    if m not in s:
        sys.exit(f"MISSING marker {m}")
print("MARKERS_OK")
