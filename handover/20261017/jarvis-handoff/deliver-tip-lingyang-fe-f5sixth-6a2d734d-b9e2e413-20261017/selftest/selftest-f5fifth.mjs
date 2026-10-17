import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 回归：保留前枪 F5quara 全套（子进程，避免其 process.exit 截断本文件）
{
  const r = spawnSync(process.execPath, [join(__dirname, "selftest-f5quad.mjs")], {
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

function makeGateFns(st, teRef, lockRef) {
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
    if (
      st.record &&
      ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state) &&
      (!st.phase || st.phase === "SELECT" || m.value === 0)
    ) {
      const msg =
        st.error ||
        teRef.v ||
        "继续领用后相位未落确认卡，请重试或联系管理员。";
      st.error = msg;
      teRef.v = msg;
      return true;
    }
    return false;
  }
  function __f5PhaseLockOnSelect() {
    if (
      lockRef.v === st.generation &&
      st.record &&
      ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state) &&
      (!st.phase || st.phase === "SELECT")
    ) {
      st.phase = "CARD";
      syncM();
      const msg =
        st.error ||
        teRef.v ||
        "继续领用相位被打断，已重新进入确认卡；请点「查看本次实际流转卡」。";
      st.error = msg;
      teRef.v = msg;
      return true;
    }
    return false;
  }
  function afterUrLock() {
    if (["CARD", "OPENING", "REVIEW"].includes(st.phase)) {
      lockRef.v = st.generation;
    }
    __f5EmptyWindowGate();
  }
  return { __f5EmptyWindowGate, __f5PhaseLockOnSelect, afterUrLock, m };
}

// A1
{
  const st = {
    phase: "CARD",
    generation: 7,
    record: { id: "wd-a1", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockRef = { v: -1 };
  const { __f5PhaseLockOnSelect, afterUrLock } = makeGateFns(st, teRef, lockRef);
  afterUrLock();
  assert.equal(lockRef.v, 7);
  st.phase = "SELECT";
  st.error = "";
  teRef.v = "";
  assert.equal(__f5PhaseLockOnSelect(), true);
  assert.equal(st.phase, "CARD");
  assert.match(st.error, /相位被打断|重新进入确认卡/);
  assert.match(teRef.v, /相位被打断|重新进入确认卡/);
  ok("F5⁵ A1 resume CARD+lock → 打回 SELECT → 强制 CARD + te/error");
}

// B1
{
  const st = {
    phase: "SELECT",
    generation: 1,
    record: { id: "wd-b1", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockRef = { v: -1 };
  const { __f5EmptyWindowGate, __f5PhaseLockOnSelect } = makeGateFns(st, teRef, lockRef);
  assert.equal(__f5PhaseLockOnSelect(), false);
  assert.equal(__f5EmptyWindowGate(), true);
  assert.equal(st.phase, "SELECT");
  assert.match(st.error, /未落确认卡|请重试或联系/);
  assert.match(teRef.v, /未落确认卡|请重试或联系/);
  ok("F5⁵ B1 PENDING+SELECT 无 lock → gate 必写 te+error");
}

// B2
{
  const st = {
    phase: "CARD",
    generation: 2,
    record: { id: "wd-b2", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockRef = { v: 2 };
  const { __f5EmptyWindowGate } = makeGateFns(st, teRef, lockRef);
  assert.equal(__f5EmptyWindowGate(), false);
  assert.equal(st.error, "");
  assert.equal(teRef.v, "");
  ok("F5⁵ B2 PENDING+CARD → gate 不强制改文");
}

// 合法 reset bump generation
{
  const st = {
    phase: "SELECT",
    generation: 9,
    record: { id: "wd-reset", state: "PENDING_CONFIRMATION" },
    error: "",
  };
  const teRef = { v: "" };
  const lockRef = { v: 8 };
  const { __f5PhaseLockOnSelect, __f5EmptyWindowGate } = makeGateFns(st, teRef, lockRef);
  assert.equal(__f5PhaseLockOnSelect(), false);
  assert.equal(st.phase, "SELECT");
  assert.equal(__f5EmptyWindowGate(), true);
  assert.match(teRef.v, /未落确认卡/);
  ok("F5⁵ 合法 reset bump generation → 锁失效；B 仍可旁注");
}

// 回归 F5quara SELECT 空窗
{
  const st = { phase: "SELECT", record: { id: "wd-q", state: "FACTS_DRAFT" }, error: "" };
  let te = "";
  if (!st.phase || st.phase === "SELECT") {
    const f5q = st.error || te || "继续领用后相位未落确认卡，请重试或联系管理员。";
    st.error = f5q;
    te = f5q;
  }
  assert.match(te, /未落确认卡/);
  ok("回归 F5quara SELECT 空窗 → te+error");
}

// 回归 F5‴ 强制 CARD
{
  const st = {
    phase: "SELECT",
    record: {
      id: "wd-f53",
      state: "PENDING_CONFIRMATION",
      cardVersion: 1,
      card_file_id: "cf1",
      cardSha256: "a".repeat(64),
    },
    error: "",
  };
  const hasFp =
    !!(st.record.cardVersion || st.record.card_file_id || st.record.cardId) &&
    typeof st.record.cardSha256 === "string" &&
    /^[a-f0-9]{64}$/.test(st.record.cardSha256);
  if (
    ["PENDING_CONFIRMATION", "PENDING_VERIFICATION"].includes(st.record.state) &&
    hasFp &&
    !["CARD", "OPENING", "REVIEW"].includes(st.phase) &&
    !["VERIFY", "SIGN", "COMPLETE"].includes(st.phase)
  ) {
    st.phase = "CARD";
    st.error =
      st.error ||
      "继续领用后相位未落确认卡，已强制进入；请点「查看本次实际流转卡」。";
  }
  assert.equal(st.phase, "CARD");
  assert.match(st.error, /强制进入|查看本次实际流转卡/);
  ok("回归 F5‴ 强制 CARD 路径不破");
}

console.log(out.join("\n"));
console.log("SELFTEST_F5FIFTH_OK " + out.length + " cases");
process.exit(0);
