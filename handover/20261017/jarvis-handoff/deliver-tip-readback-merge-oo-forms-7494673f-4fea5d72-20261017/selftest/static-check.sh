#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
JS="$ROOT/dist/assets/LabDataReadBack-BViU_OnG.js"
ORIG="$ROOT/orig/LabDataReadBack-BViU_OnG.js"
fail=0
node --check "$JS" || fail=1
osh=$(sha256sum "$ORIG" | cut -c1-16)
psh=$(sha256sum "$JS" | cut -c1-16)
echo "ORIG=$osh PATCH=$psh"
[[ "$osh" == "b4ca935942c30c01" ]] || { echo "FAIL ORIG"; fail=1; }
[[ "$psh" == "4fea5d72c8fb45e6" ]] || { echo "FAIL PATCH sha expected 4fea5d72c8fb45e6 got $psh"; fail=1; }
[[ "$psh" != "$osh" ]] || { echo "FAIL PATCH==ORIG"; fail=1; }
grep -q 'entryBatch-vbmxXr3M' "$JS" || { echo "FAIL no entryBatch"; fail=1; }
grep -q 'index-NJVZXfJd' "$JS" || { echo "FAIL no OO viewer"; fail=1; }
grep -q 'softProbeDraft' "$JS" || { echo "FAIL no softProbe"; fail=1; }
imp=$(grep 'from"./entryBatch' "$JS")
echo "entryBatch import: $imp"
echo "$imp" | grep -q 'r as de' || { echo "FAIL no resolve-draft import"; fail=1; }
echo "$imp" | grep -q 'b as me' || { echo "FAIL no config import"; fail=1; }
# must not import generate h from entryBatch
if echo "$imp" | grep -qE '[,{]h as | as h[,}]'; then echo "FAIL imports generate h"; fail=1; fi
grep -q '未能确认是否已有草稿簿' "$JS" && { echo "FAIL hard gate text present"; fail=1; } || true
grep -q 'regenerate:!0\|I({regenerate' "$JS" && { echo "FAIL regenerate call"; fail=1; } || true
grep -q 'viewMode.value="forms"' "$JS" || { echo "FAIL no forms branch"; fail=1; }
grep -q 'kind==="has_book"' "$JS" || { echo "FAIL no has_book branch"; fail=1; }
# secrets: only real PEM / AWS key patterns in JS/vue deliverables
if grep -E 'BEGIN (RSA |OPENSSH )?PRIVATE KEY|AKIA[0-9A-Z]{16}' "$JS" "$ROOT/fe-src/LabDataReadBack.vue" 2>/dev/null | grep -q .; then
  echo "FAIL secrets in deliverable"; fail=1
fi
# ban overwrite B3030 in docs
grep -q '不覆写' "$ROOT/全量覆写清单.md" && grep -q 'B3030' "$ROOT/全量覆写清单.md" || { echo "FAIL 覆写清单缺 B3030 声明"; fail=1; }
grep -q '乙二期\|乙 ·.*二期\|YI_CORE=DEFERRED' "$ROOT/HANDOFF.md" "$ROOT/GIT-TRACE.txt" || { echo "FAIL 缺乙二期声明"; fail=1; }
if [[ $fail -eq 0 ]]; then echo "SELFTEST_STATIC_OK"; else echo "SELFTEST_STATIC_FAIL"; exit 1; fi
