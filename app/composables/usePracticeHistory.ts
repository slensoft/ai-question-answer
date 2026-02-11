import type { PracticeRecord } from '@/types/methodology'
import { getAllPracticeRecords, savePracticeRecord } from '@/api/practice'

export function usePracticeHistory() {
  const history = ref<PracticeRecord[]>([])
  const loading = ref(true)

  const loadHistory = async () => {
    try {
      loading.value = true
      history.value = await getAllPracticeRecords()
    } finally {
      loading.value = false
    }
  }

  const saveRecord = async (record: PracticeRecord) => {
    await savePracticeRecord(record)
    await loadHistory()
  }

  const downloadHistory = () => {
    const dataStr = JSON.stringify(history.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `methodology-practice-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  onMounted(loadHistory)

  return {
    history,
    loading,
    saveRecord,
    downloadHistory,
    refresh: loadHistory,
  }
}
