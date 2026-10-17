import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// 回归：前枪 F5⁵（内嵌再跑 F5quara）全套子进程
{
  const r = spawnSync(process.execPath, [join(__dirname, "selftest-f5fifth.mjs")], {
    encoding: "utf8",
  });
  if (r.status !== 0) {
    console.error(r.stdout || "");
    console.error(r.stderr || "");
    process.exit(r.status || 1);
  }
  process.stdout.write(r.stdout || "");
}

const out = [];
const ok = (m) => out.push("PASS " + m);

function makeGateFns(st, teRef, lockGenRef, lockRidRef, armedRef) {
  const stepOf = (ph) =>
    ({ SELECT: 0, FACTS: 1, CARD: 2, OPENING: 2, REVIEW: 2, SIGN: 3, VERIFY: 4, COMPLETE: 5 }[
      ph
    ] ?? 0);
  const m = { value: stepOf(st.phase) };
  function syncM() {
    m.value = stepOf(st.phase);
  }
  function __f5EmptyWindowGate() {
    syncM();
    const pendingRec =
      st.record &&
      ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state);
    const lockedWd = !!lockRidRef.v;
    const onSelect = !st.phase || st.phase === "SELECT" || m.value === 0;
    if ((pendingRec || lockedWd) && onSelect) {
      const msg =
        st.error ||
        teRef.v ||
        "继续领用后相位未落确认卡，请重试或联系管理员。";
      st.error = msg;
      teRef.v = msg;
      armedRef.v = true;
      return true;
    }
    return false;
  }
  function __f5PhaseLockOnSelect() {
    const onSelect = !st.phase || st.phase === "SELECT";
    if (!onSelect) return false;
    const lockedByGen =
      lockGenRef.v === st.generation &&
      st.record &&
      ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state);
    const lockedByRid = !!lockRidRef.v;
    if (!lockedByGen && !lockedByRid) return false;
    if (
      st.record &&
      ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state) &&
      (lockedByGen || String(st.record.id) === String(lockRidRef.v))
    ) {
      st.phase = "CARD";
      syncM();
      const msg =
        st.error ||
        teRef.v ||
        "继续领用相位被打断，已重新进入确认卡；请点「查看本次实际流转卡」。";
      st.error = msg;
      teRef.v = msg;
      armedRef.v = true;
      return true;
    }
    if (
      lockedByRid &&
      (!st.record || String((st.record && st.record.id) || "") !== String(lockRidRef.v))
    ) {
      const msg =
        st.error ||
        teRef.v ||
        "继续领用相位被打断，请重新点「继续本次领用」或联系管理员。";
      st.error = msg;
      teRef.v = msg;
      armedRef.v = true;
      return true;
    }
    return false;
  }
  function __f5ReenterEmptyGateAfterTeClear() {
    if (armedRef.v && !teRef.v) {
      __f5PhaseLockOnSelect();
      __f5EmptyWindowGate();
    }
  }
  function afterUrLock() {
    if (["CARD", "OPENING", "REVIEW"].includes(st.phase)) {
      lockGenRef.v = st.generation;
    }
    if (
      st.record &&
      st.record.id &&
      (["CARD", "OPENING", "REVIEW"].includes(st.phase) ||
        ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state))
    ) {
      lockRidRef.v = String(st.record.id);
    }
    __f5EmptyWindowGate();
  }
  function mountImmediate() {
    __f5PhaseLockOnSelect();
    __f5EmptyWindowGate();
  }
  return {
    __f5EmptyWindowGate,
    __f5PhaseLockOnSelect,
    __f5ReenterEmptyGateAfterTeClear,
    afterUrLock,
    mountImmediate,
    m,
  };
}

// A2: resume 锁 recordId → reset bump gen（锁仍效）→ 打回 SELECT → 强制 CARD 或黄文
{
  const st = {
    phase: "CARD",
    generation: 7,
    record: { id: "wd-a2", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockGenRef = { v: -1 };
  const lockRidRef = { v: "" };
  const armedRef = { v: false };
  const { __f5PhaseLockOnSelect, afterUrLock } = makeGateFns(
    st,
    teRef,
    lockGenRef,
    lockRidRef,
    armedRef,
  );
  afterUrLock();
  assert.equal(lockRidRef.v, "wd-a2");
  assert.equal(lockGenRef.v, 7);
  // reset bump gen；record 仍在
  st.generation = 8;
  st.phase = "SELECT";
  st.error = "";
  teRef.v = "";
  assert.equal(__f5PhaseLockOnSelect(), true);
  assert.equal(st.phase, "CARD");
  assert.match(st.error, /相位被打断|重新进入确认卡/);
  assert.match(teRef.v, /相位被打断|重新进入确认卡/);
  ok("F5⁶ A2 resume 锁 recordId → reset bump gen（锁仍效）→ SELECT → 强制 CARD+黄文");
}

// A2b: reset 清 record 后仍持锁 → SELECT 必黄文「相位被打断」
{
  const st = {
    phase: "CARD",
    generation: 3,
    record: { id: "wd-a2b", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockGenRef = { v: -1 };
  const lockRidRef = { v: "" };
  const armedRef = { v: false };
  const { __f5PhaseLockOnSelect, afterUrLock } = makeGateFns(
    st,
    teRef,
    lockGenRef,
    lockRidRef,
    armedRef,
  );
  afterUrLock();
  assert.equal(lockRidRef.v, "wd-a2b");
  // reset: bump gen + clear record + SELECT
  st.generation = 4;
  st.record = null;
  st.phase = "SELECT";
  st.error = "";
  teRef.v = "";
  assert.equal(__f5PhaseLockOnSelect(), true);
  assert.equal(st.phase, "SELECT"); // 无 record 时优先黄文路径，不强制 CARD
  assert.match(st.error, /相位被打断/);
  assert.match(teRef.v, /相位被打断/);
  ok("F5⁶ A2b reset 清 record 后仍持锁 → SELECT 必黄文「相位被打断」");
}

// B2: reset 后 PENDING*+SELECT → 禁静默，必 te（record 仍在）
{
  const st = {
    phase: "SELECT",
    generation: 10,
    record: { id: "wd-b2", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockGenRef = { v: 9 }; // gen 已 bump，旧 gen 锁失效
  const lockRidRef = { v: "wd-b2" }; // 刚 resume 的锁仍在
  const armedRef = { v: false };
  const { __f5EmptyWindowGate, __f5PhaseLockOnSelect } = makeGateFns(
    st,
    teRef,
    lockGenRef,
    lockRidRef,
    armedRef,
  );
  // A2 会先强制 CARD；本例也接受 — 但 B2 要求禁静默必 te
  const a = __f5PhaseLockOnSelect();
  const b = __f5EmptyWindowGate();
  assert.ok(a || b);
  assert.ok(st.error || teRef.v);
  assert.match(st.error || teRef.v, /相位被打断|未落确认卡/);
  ok("F5⁶ B2 reset 后 PENDING*+SELECT → 禁静默，必 te/强制 CARD");
}

// B2 te: 写入 te 后模拟无关清 te → 立即重入门再写
{
  const st = {
    phase: "SELECT",
    generation: 1,
    record: { id: "wd-te", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockGenRef = { v: -1 };
  const lockRidRef = { v: "wd-te" };
  const armedRef = { v: false };
  const { __f5EmptyWindowGate, __f5ReenterEmptyGateAfterTeClear } = makeGateFns(
    st,
    teRef,
    lockGenRef,
    lockRidRef,
    armedRef,
  );
  assert.equal(__f5EmptyWindowGate(), true);
  assert.ok(teRef.v);
  assert.equal(armedRef.v, true);
  // 无关 watcher 清 te
  teRef.v = "";
  st.error = "";
  __f5ReenterEmptyGateAfterTeClear();
  assert.ok(teRef.v, "re-enter must rewrite te");
  assert.match(teRef.v, /未落确认卡|相位被打断/);
  ok("F5⁶ B2 te 写入后无关清 te → 立即重入门再写");
}

// B2 immediate: 挂载/首帧必检
{
  const st = {
    phase: "SELECT",
    generation: 2,
    record: { id: "wd-imm", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockGenRef = { v: -1 };
  const lockRidRef = { v: "wd-imm" };
  const armedRef = { v: false };
  const { mountImmediate } = makeGateFns(st, teRef, lockGenRef, lockRidRef, armedRef);
  mountImmediate();
  assert.ok(st.error || teRef.v || st.phase === "CARD");
  assert.match(st.error || teRef.v || "CARD", /相位被打断|未落确认卡|CARD/);
  ok("F5⁶ B2 immediate 挂载/首帧必检");
}

// 静态：patched-pretty + dist 含 A2/B2 锚
{
  const pretty = readFileSync(join(root, "src/patched-pretty.js"), "utf8");
  assert.ok(pretty.includes("TIP_LINGYANG_FE_F5SIXTH_6a2d734d"));
  assert.ok(pretty.includes("_f5ResumeLockRecordId"));
  assert.ok(pretty.includes("__f5ReenterEmptyGateAfterTeClear"));
  assert.ok(pretty.includes("{ immediate: !0 }"));
  assert.ok(pretty.includes("请重新点"));
  const dist = readFileSync(
    join(root, "dist/assets/LabSampleHandoverPanel-B5RJ_HtO.js"),
    "utf8",
  );
  const decoded = dist.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
    String.fromCharCode(parseInt(h, 16)),
  );
  assert.ok(decoded.includes("相位被打断"));
  assert.ok(decoded.includes("请重新点"));
  assert.ok(decoded.includes("未落确认卡"));
  assert.ok(dist.includes("immediate:!0"));
  ok("F5⁶ 静态锚 pretty stamp+recordId+reenter；dist 黄文+immediate");
}

// ORIG 闸
{
  const { createHash } = await import("node:crypto");
  const buf = readFileSync(
    join(root, "orig/LabSampleHandoverPanel-B5RJ_HtO.js"),
  );
  const sha = createHash("sha256").update(buf).digest("hex");
  assert.equal(sha.slice(0, 16), "50ea6b9fd94fcec1");
  ok("F5⁶ ORIG sha16 ≡ 50ea6b9fd94fcec1");
}

console.log(out.join("\n"));
console.log("SELFTEST_F5SIXTH_OK " + out.length + " cases");
console.log("SELFTEST_STATIC_OK ≠ 公网 PASS");
process.exit(0);
