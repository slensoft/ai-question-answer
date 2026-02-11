<script setup lang="ts">
const props = withDefaults(defineProps<{ code: string; className?: string }>(), {
  className: '',
})

const isRendered = ref(false)
const error = ref<string | null>(null)
const renderSeq = ref(0)
const codeRef = ref<HTMLElement | null>(null)

const render = async () => {
  if (!props.code) return

  isRendered.value = false
  error.value = null
  renderSeq.value += 1
  const currentSeq = renderSeq.value

  try {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const mermaid = (await import('mermaid')).default

    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
    })

    if (codeRef.value) {
      codeRef.value.textContent = props.code
    }

    await mermaid.run({ nodes: codeRef.value ? [codeRef.value] : undefined })

    if (currentSeq === renderSeq.value) {
      isRendered.value = true
    }
  } catch (err) {
    if (currentSeq === renderSeq.value) {
      error.value = err instanceof Error ? err.message : '图形渲染失败'
    }
  }
}

watch(() => props.code, render, { immediate: true })
</script>

<template>
  <div v-if="error" :class="`mermaid-error ${props.className}`" style="padding:20px;background:#fff3cd;border:1px solid #ffc107;border-radius:8px;color:#856404;">
    <p>❌ {{ error }}</p>
    <details style="margin-top: 10px">
      <summary style="cursor:pointer;font-weight:600">查看代码</summary>
      <pre style="margin-top:10px;background:#f5f5f5;padding:10px;border-radius:4px;overflow:auto;font-size:12px;">{{ props.code }}</pre>
    </details>
  </div>

  <div v-else-if="!props.code" :class="`mermaid-empty ${props.className}`">
    <p>没有图形代码</p>
  </div>

  <div
    v-else
    :class="props.className"
    style="display:flex;justify-content:center;align-items:center;min-height:200px;position:relative"
  >
    <div
      v-if="!isRendered"
      style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#666;font-size:14px"
    >
      正在生成图形...
    </div>
    <pre ref="codeRef" class="mermaid" style="margin:0;transition:opacity 0.3s ease" :style="{ opacity: isRendered ? 1 : 0 }">{{ props.code }}</pre>
  </div>
</template>
