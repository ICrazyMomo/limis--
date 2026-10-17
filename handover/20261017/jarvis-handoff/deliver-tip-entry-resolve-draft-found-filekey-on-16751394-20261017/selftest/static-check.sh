#!/bin/bash
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
C="$ROOT/classes/nested/com/lei/system/service/impl/EntryBatchReceiptService.class"
test -f "$C"
MAJOR=$(javap -verbose "$C" | awk '/major version:/{print $3; exit}')
test "$MAJOR" = "52"
javap -p "$C" | grep -q findAuthoritativeReadback
javap -p "$C" | grep -q findActiveDraft
STR=$(strings "$C")
echo "$STR" | grep -q 'sys_lab_entry_readback_'
echo "$STR" | grep -q "foreign_key=? and file_type='06'"
python3 - <<PY
import subprocess
out=subprocess.check_output(["javap","-c","-p","$C"],text=True,errors="replace")
i=out.find("private java.util.Map<java.lang.String, java.lang.Object> findAuthoritativeReadback")
assert i>=0, "method missing"
j=out.find("\n  private ", i+80)
if j<0: j=out.find("\n  public ", i+80)
block=out[i:j if j>i else i+4000]
assert "insert into entry_batch_source" not in block
assert "EntryBatchWorkbook.generate" not in block
print("helper_read_only_ok")
PY
SHA=$(sha256sum "$C" | awk '{print substr($1,1,16)}')
test "$SHA" = "0a6ac4d9da060498"
echo "SELFTEST_PASS major=$MAJOR patch16=$SHA"
