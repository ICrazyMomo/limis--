#!/bin/bash
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
C="$ROOT/classes/nested/com/lei/system/service/impl/EntryBatchServiceImpl.class"
O="$ROOT/orig/EntryBatchServiceImpl.class"
test -f "$C" && test -f "$O"
MAJOR=$(javap -verbose "$C" | awk '/major version:/{print $3; exit}')
test "$MAJOR" = "52"
SHA=$(sha256sum "$C" | awk '{print substr($1,1,16)}')
test "$SHA" = "d05982909028486a"
OSHA=$(sha256sum "$O" | awk '{print substr($1,1,16)}')
test "$OSHA" = "5b05565b4f7e0250"
if cmp -s "$C" "$O"; then echo "FAIL patch==orig"; exit 1; fi
for inner in 'EntryBatchServiceImpl$1.class' 'EntryBatchServiceImpl$2.class' 'EntryBatchServiceImpl$Resolved.class' 'EntryBatchServiceImpl$TaskContext.class'; do
  cmp -s "$ROOT/orig/$inner" "$ROOT/classes/nested/com/lei/system/service/impl/$inner"
done
javap -c -p "$C" | grep -q 'OfficeFileConfigVo config'
javap -c -p "$C" | grep -q '批量录入工作簿不存在或不属于当前账号'
python3 - "$C" <<'PY'
import subprocess,sys
c=sys.argv[1]
out=subprocess.check_output(["javap","-c","-p",c],text=True,errors="replace")
i=out.find("OfficeFileConfigVo config(java.lang.String, java.lang.String)")
assert i>=0, "config missing"
j=out.find("\n  public ", i+80)
block=out[i:j if j>i else i+8000]
assert "getCreateUser" in block
idx=block.find("getCreateUser")
tail=block[idx:idx+1200]
assert "String edit" in tail, "edit bypass ldc missing"
assert "ifeq" in tail, "ifeq bypass missing"
# ifnull should target throw (not continue past null): presence of 403 msg after ifnull path
assert "批量录入工作簿不存在或不属于当前账号" in block
print("config_view_bypass_pattern_ok")
PY
echo "SELFTEST_PASS major=$MAJOR patch16=$SHA orig16=$OSHA"
