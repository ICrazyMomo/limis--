<template>
  <el-dialog
    :model-value="modelValue"
    :title="dialogTitle"
    :width="viewMode === 'oo' ? '92%' : '76%'"
    :top="viewMode === 'oo' ? '3vh' : '4vh'"
    append-to-body
    destroy-on-close
    @update:model-value="emit('update:modelValue', $event)"
  >
    <el-alert
      class="mb8"
      type="info"
      :closable="false"
      :title="viewMode === 'oo'
        ? 'OnlyOffice 只读回读：已打开已有草稿簿（未重新生成）。编辑和批量录入请从任务列表的批量录入入口进入。'
        : '只读回读：显示已录入的实验数据字段值与提交状态，不可修改。'"
    />
    <template v-if="loading">
      <el-skeleton :rows="6" animated />
    </template>
    <el-result
      v-else-if="blockedMessage"
      icon="warning"
      :title="viewMode === 'oo' ? '暂不能打开 OnlyOffice 回读' : '暂不能回读录入数据'"
      :sub-title="blockedMessage"
    >
      <template #extra>
        <el-button type="primary" icon="Refresh" @click="loadReadBack">重试</el-button>
      </template>
    </el-result>
    <template v-else-if="form">
      <el-descriptions :column="2" border size="small" class="mb8">
        <el-descriptions-item label="检测点位">{{ row?.checkPoint || "-" }}</el-descriptions-item>
        <el-descriptions-item label="检测项目">{{ row?.productSecondItem || "-" }}</el-descriptions-item>
        <el-descriptions-item label="模板">{{ form.template_name || "-" }}（v{{ form.template_version || "-" }}）</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="statusTagType" size="small">{{ statusText }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <OnlyOfficeViewer
        v-if="viewMode === 'oo' && hasOfficeConfig"
        :document-server-url="documentServerUrl"
        :document-config="documentConfig"
        mode="view"
        height="64vh"
        @error="onOfficeError"
      />
      <el-result
        v-else-if="viewMode === 'oo'"
        icon="warning"
        title="OnlyOffice 回读配置不完整"
        :sub-title="officeError || '服务端未返回可用的只读文档配置'"
      />
      <div v-else class="readback-fields">
        <div v-for="field in fields" :key="field.field_key" class="readback-row">
          <span class="readback-label">{{ field.field_label || field.field_key }}</span>
          <span class="readback-value">{{ displayValue(field) || "-" }}</span>
        </div>
        <div v-if="!fields.length" class="readback-empty">暂无字段快照</div>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="canProofread" type="warning" :loading="proofreading" @click="doProofread">校对</el-button>
        <el-button v-if="canReview" type="primary" :loading="reviewing" @click="doReview">审核</el-button>
        <!-- 禁「重新生成」：准修丙 / 补钉甲 -->
        <el-button @click="emit('update:modelValue', false)">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
/**
 * tip readback-merge-oo-forms · 甲+丙 · 乙二期
 * 准修 7494673f · 补钉 5bde3ea6
 * ① forms 快照 ② 软探明确 found+fileKey → OO 只读 ③ 非明确 found → forms ④ 不可归类 → 业务句
 * 禁默认重新生成；禁 bak 热换当交付
 */
import { ref, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { getEntryForm, getEntryFormByTask } from "@/api/lab/entry";
import { proofreadEntryForm, reviewEntryForm } from "@/api/lab/entryReview";
import request from "@/utils/request";
import OnlyOfficeViewer from "@/components/OnlyOfficeEditor/index.vue";
import useUserStore from "@/store/modules/user";
import newRequestIdCompat from "@/views/lab/common/requestId";

/** Soft probe only · 对齐 entryBatch-vbmxXr3M resolve-draft；禁 document/generate */
function resolveDraft(kind, templateId, items) {
  return request({
    url: "/system/entry/batch/resolve-draft",
    silentBusinessError: true,
    method: "post",
    data: { kind, templateId, items },
  });
}
/** OO 只读配置 · 对齐 entryBatch config/{fileKey}?mode=view */
function getBatchDocumentConfig(fileKey, mode = "view") {
  return request({
    url: `/system/entry/batch/config/${fileKey}`,
    silentBusinessError: true,
    method: "get",
    params: { mode },
  });
}

const props = defineProps({
  modelValue: Boolean,
  row: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["update:modelValue", "blocked", "changed"]);

const loading = ref(false);
const form = ref(null);
const blockedMessage = ref("");
const proofreading = ref(false);
const reviewing = ref(false);
/** @type {import('vue').Ref<''|'forms'|'oo'>} */
const viewMode = ref("");
const openedExisting = ref(false);
const officeLoadingText = ref("");
const documentServerUrl = ref("");
const documentConfig = ref(null);
const officeError = ref("");

const fields = computed(() => (form.value && Array.isArray(form.value.fields)) ? form.value.fields : []);
const hasOfficeConfig = computed(() => !!(documentServerUrl.value && documentConfig.value));
const dialogTitle = computed(() => viewMode.value === "oo" ? "查看录入数据（OnlyOffice）" : "查看录入数据");

const userStore = useUserStore();
const userRoles = computed(() => userStore.roles || []);
const STATUS_LABEL = { SUBMITTED: "已提交", PROOFREAD: "已校对", REVIEWED: "已审核" };
const statusText = computed(() => {
  const s = form.value && form.value.status;
  return (s && STATUS_LABEL[s]) || (s || "-");
});
const statusTagType = computed(() => {
  const s = form.value && form.value.status;
  if (s === "REVIEWED") return "success";
  if (s === "SUBMITTED" || s === "PROOFREAD") return "warning";
  return "info";
});
const isAdmin = computed(() => userRoles.value.includes("admin"));
const canProofread = computed(() => isAdmin.value || userRoles.value.some((r) => r === "labProofreader" || r === "syy"));
const canReview = computed(() => isAdmin.value || userRoles.value.some((r) => r === "labAuditor" || r === "syszr"));

function entryFormIdOf(row) {
  if (!row) return null;
  return row.completedEntryFormId || row.entryFormId || row.entry_form_id || null;
}
function displayValue(field) {
  const raw = form.value && form.value.values ? form.value.values[field.field_key] : null;
  if (raw == null) return "";
  if (typeof raw === "object" && raw.value != null) {
    const unit = raw.unit != null ? " " + raw.unit : "";
    return String(raw.value) + unit;
  }
  return String(raw);
}
function onOfficeError(e) {
  officeError.value = (e && e.message) || "OnlyOffice 文档服务加载失败";
}

/**
 * Soft probe · 乙未齐保守：仅明确 found===true + fileKey 算有簿。
 * 禁调用 document/generate（默认重新生成）。
 */
async function softProbeDraft(templateId, items) {
  let resp;
  try {
    resp = await resolveDraft("lab", templateId, items);
  } catch (err) {
    return { kind: "no_book", reason: "probe_throw", err };
  }
  if (!resp || resp.code !== 200) {
    return { kind: "no_book", reason: "probe_not_200", resp };
  }
  if (resp.data && resp.data.found === true && resp.data.fileKey) {
    return { kind: "has_book", fileKey: resp.data.fileKey };
  }
  return { kind: "no_book", reason: "found_false_or_no_key", resp };
}

async function openOoReadOnly(fileKey) {
  officeLoadingText.value = "正在打开已有草稿簿…";
  openedExisting.value = true;
  const y = await getBatchDocumentConfig(fileKey, "view");
  const ok = y && y.code === 200 && y.data && y.data.documentServerUrl && y.data.documentConfig;
  if (!ok) {
    throw new Error((y && y.msg) || "读取 OnlyOffice 回读配置失败");
  }
  documentServerUrl.value = y.data.documentServerUrl;
  documentConfig.value = y.data.documentConfig;
  viewMode.value = "oo";
}

async function loadReadBack() {
  loading.value = true;
  blockedMessage.value = "";
  form.value = null;
  viewMode.value = "";
  officeError.value = "";
  documentServerUrl.value = "";
  documentConfig.value = null;
  openedExisting.value = false;
  officeLoadingText.value = "";

  let id = entryFormIdOf(props.row);
  if (!id && props.row && props.row.id) {
    try {
      const byTask = await getEntryFormByTask(props.row.id);
      const data = byTask && byTask.data;
      id = data && (data.entry_form_id || data.id) ? (data.entry_form_id || data.id) : null;
    } catch (err) {
      id = null;
    }
  }
  if (!id) {
    blockedMessage.value = "当前列表数据未包含录入表单标识，请强刷页面（Ctrl+Shift+R）并重新登录后再试；若仍出现本提示，请将页面截图与地址栏URL反馈给管理员。";
    emit("blocked", { reason: "entry_form_id_missing" });
    loading.value = false;
    return;
  }
  try {
    const response = await getEntryForm(id);
    const data = response && response.data;
    if (!(data && data.fields)) {
      blockedMessage.value = "录入表单回读失败：服务端未返回字段快照。";
      emit("blocked", { reason: "entry_form_unavailable" });
      return;
    }
    form.value = data;
    const probe = await softProbeDraft(data.template_id, [{ labTaskListId: props.row.id }]);
    if (probe.kind === "has_book") {
      try {
        await openOoReadOnly(probe.fileKey);
      } catch (ooErr) {
        form.value = null;
        viewMode.value = "";
        blockedMessage.value = (ooErr && (ooErr.msg || ooErr.message)) || "已确认有草稿簿，但读取 OnlyOffice 回读配置失败，请稍后重试或联系管理员。";
        emit("blocked", { reason: "oo_config_failed", error: ooErr });
        return;
      }
    } else {
      viewMode.value = "forms";
    }
  } catch (error) {
    form.value = null;
    viewMode.value = "";
    blockedMessage.value = error?.msg || error?.message || "录入表单回读失败";
    emit("blocked", { reason: "entry_form_unavailable", error });
  } finally {
    loading.value = false;
  }
}

async function runAction(action, loadingFlag, successText) {
  let id = entryFormIdOf(props.row);
  if (!id && props.row && props.row.id) {
    try {
      const byTask = await getEntryFormByTask(props.row.id);
      const data = byTask && byTask.data;
      id = data && (data.entry_form_id || data.id) ? (data.entry_form_id || data.id) : null;
    } catch (err) {
      id = null;
    }
  }
  if (!id) {
    blockedMessage.value = "当前列表数据未包含录入表单标识，无法执行操作。";
    return;
  }
  try {
    await ElMessageBox.confirm(successText + "确认", "确认后状态将推进，是否继续？", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
  } catch {
    return;
  }
  loadingFlag.value = true;
  try {
    const response = await action({ entry_form_id: id, request_id: newRequestIdCompat() });
    if (response && response.code === 200) {
      ElMessageBox.alert("操作成功", successText, { type: "success", confirmButtonText: "确定" });
      await loadReadBack();
      emit("changed");
    } else {
      ElMessageBox.alert((response && response.msg) || "服务端拒绝", successText + "失败", { type: "error", confirmButtonText: "确定" });
    }
  } catch (error) {
    ElMessageBox.alert(error?.msg || error?.message || "操作失败", successText + "失败", { type: "error", confirmButtonText: "确定" });
  } finally {
    loadingFlag.value = false;
  }
}

const doProofread = () => runAction(proofreadEntryForm, proofreading, "校对");
const doReview = () => runAction(reviewEntryForm, reviewing, "审核");

watch(
  () => props.modelValue,
  (open) => {
    if (open && props.row?.id) loadReadBack();
  },
  { immediate: true },
);
</script>

<style scoped>
.mb8 { margin-bottom: 8px; }
.readback-fields { display: flex; flex-direction: column; gap: 8px; }
.readback-row { display: flex; padding: 8px 12px; border: 1px solid #e4e7ed; border-radius: 4px; }
.readback-label { flex: 0 0 220px; color: #606266; font-weight: 600; }
.readback-value { flex: 1; color: #303133; word-break: break-all; }
.readback-empty { padding: 16px; color: #909399; text-align: center; }
</style>
