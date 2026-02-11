<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const mermaidCode = ref('')
const editedCode = ref('')
const isLoading = ref(true)
const methodologyName = ref('')
const error = ref<string | null>(null)
const mode = ref<'view' | 'edit'>('view')

onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null

    const methodology = String(route.query.methodology || 'default')
    const name = String(route.query.name || '可视化图形')
    methodologyName.value = name

    const result = await $fetch<{ mermaidCode: string }>('/api/ai/generate-mermaid', {
      method: 'POST',
      body: { prompt: `${methodology}分析` },
    })

    mermaidCode.value = result.mermaidCode
    editedCode.value = result.mermaidCode
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败'
    mermaidCode.value = `graph TD\n  Start[开始分析] --> Think[深入思考]\n  Think --> Action[采取行动]\n  Action --> Result[获得结果]`
    editedCode.value = mermaidCode.value
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="visualization-page">
    <div class="visualization-container">
      <div class="visualization-header">
        <div class="header-content">
          <h1 class="page-title">📊 {{ methodologyName }}</h1>
          <p class="page-subtitle">可视化分析图形</p>
        </div>
        <button class="btn-back-visual" @click="router.back()">← 返回</button>
      </div>

      <div v-if="!isLoading" class="action-buttons">
        <template v-if="mode === 'view'">
          <button class="btn-action btn-primary" @click="editedCode = mermaidCode; mode = 'edit'">✏️ 编辑代码</button>
          <button class="btn-action" @click="navigator.clipboard.writeText(mermaidCode); window.alert('代码已复制到剪贴板')">📋 复制代码</button>
        </template>
        <template v-else>
          <button class="btn-action btn-success" @click="mermaidCode = editedCode; mode = 'view'">✓ 应用修改</button>
          <button class="btn-action" @click="editedCode = mermaidCode; mode = 'view'">✕ 取消</button>
        </template>
      </div>

      <div class="visualization-content">
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner">⏳</div>
          <p class="loading-text">正在生成图形...</p>
        </div>

        <template v-else-if="mode === 'view'">
          <div v-if="error" class="error-state">
            <div class="error-icon">⚠️</div>
            <p class="error-text">{{ error }}</p>
            <p class="error-hint">显示默认图形</p>
            <div style="margin-top: 30px; width: 100%"><MermaidViewer :code="mermaidCode" /></div>
          </div>
          <div v-else class="mermaid-wrapper"><MermaidViewer :code="mermaidCode" /></div>
        </template>

        <div v-else class="edit-mode">
          <div class="code-editor">
            <div class="editor-header">📝 编辑 Mermaid 代码</div>
            <textarea v-model="editedCode" spellcheck="false" class="code-textarea" />
          </div>
          <div class="code-preview">
            <div class="preview-header">👁️ 实时预览</div>
            <div class="preview-content"><MermaidViewer v-if="editedCode" :code="editedCode" /></div>
          </div>
        </div>
      </div>

      <div class="visualization-footer">
        <p>💡 <strong>提示：</strong> 当前使用 Mock 数据展示示例图形。未来可以接入 AI 接口，根据你的回答内容生成个性化的分析图形。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visualization-page { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; }
.visualization-container { max-width: 1200px; margin: 0 auto; }
.visualization-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.page-title { color: white; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; }
.page-subtitle { color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; }
.btn-back-visual { padding: 12px 24px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); color: white; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
.action-buttons { display: flex; gap: 12px; justify-content: center; margin-bottom: 20px; }
.btn-action { padding: 12px 24px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.2); color: white; cursor: pointer; font-size: 16px; font-weight: 600; }
.btn-primary { background: rgba(102, 126, 234, 0.9); }
.btn-success { background: rgba(76, 175, 80, 0.9); }
.visualization-content { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); min-height: 500px; display: flex; justify-content: center; align-items: center; }
.edit-mode { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; min-height: 600px; }
.code-editor, .code-preview { display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; }
.code-editor { background: #1e1e1e; }
.code-preview { background: #f8f9fa; }
.editor-header, .preview-header { padding: 16px 20px; font-weight: 600; border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
.editor-header { background: #2d2d2d; color: white; }
.preview-header { background: white; color: #333; }
.code-textarea { flex: 1; padding: 20px; background: #1e1e1e; color: #d4d4d4; border: none; font-family: Monaco, Menlo, 'Courier New', monospace; font-size: 14px; line-height: 1.6; resize: none; outline: none; }
.preview-content { flex: 1; padding: 40px; overflow: auto; display: flex; align-items: center; justify-content: center; }
.loading-state, .error-state { text-align: center; width: 100%; }
.loading-spinner { font-size: 48px; margin-bottom: 20px; animation: spin 2s linear infinite; }
.visualization-footer { margin-top: 30px; padding: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.2); color: white; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 768px) { .visualization-header { flex-direction: column; align-items: flex-start; gap: 20px; } .page-title { font-size: 24px; } .visualization-content { padding: 20px; } .edit-mode { grid-template-columns: 1fr; } .action-buttons { flex-wrap: wrap; } }
</style>
