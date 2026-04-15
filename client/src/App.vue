<template>
  <div class="app">
    <h1>MSK Suggestions Board</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @update:status="handleStatusUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEmployees, updateSuggestionStatus } from '@/services/api'
import EmployeeCard from '@/components/EmployeeCard.vue'

const employees = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    employees.value = await getEmployees()
  } catch (err) {
    error.value = 'Failed to load data. Is the server running?'
  } finally {
    loading.value = false
  }
})

const handleStatusUpdate = async ({ suggestionId, status }) => {
  try {
    const updated = await updateSuggestionStatus(suggestionId, status)
    employees.value = employees.value.map(employee => ({
      ...employee,
      suggestions: employee.suggestions.map(s =>
        s.id === updated.id ? updated : s
      )
    }))
  } catch (err) {
    error.value = 'Failed to update suggestion status'
  }
}

</script>