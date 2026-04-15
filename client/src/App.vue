<template>
  <div class="app">
    <h1>MSK Suggestions Board</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <SuggestionFilters
        :statuses="statuses"
        :selectedStatus="selectedStatus"
        @update:selectedStatus="selectedStatus = $event"
      />
      <div v-if="!hasSuggestionsInView">No suggestions match current filters.</div>
        <EmployeeCard
          v-else
          v-for="employee in filteredEmployees"
          :key="employee.id"
          :employee="employee"
          :updatingSuggestionId="updatingSuggestionId"
          :updateErrorsById="updateErrorsById"
          @update:status="handleStatusUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getEmployees, updateSuggestionStatus } from '@/services/api'
import EmployeeCard from '@/components/EmployeeCard.vue'
import SuggestionFilters from '@/components/SuggestionFilters.vue'

const employees = ref([])
const loading = ref(true)
const error = ref(null)
const selectedStatus = ref('all')
const statuses = ['all', 'pending', 'in_progress', 'completed', 'overdue']
const updatingSuggestionId = ref(null)
const updateErrorsById = ref({})
const riskRank = { high: 3, medium: 2, low: 1 }

onMounted(async () => {
  try {
    employees.value = await getEmployees()
  } catch (err) {
    error.value = 'Failed to load data. Is the server running?'
  } finally {
    loading.value = false
  }
})

const filteredEmployees = computed(() => {
  const visibleEmployees = selectedStatus.value === 'all'
      ? employees.value
      : employees.value
          .map((employee) => ({
            ...employee,
            suggestions: employee.suggestions.filter(
              (s) => s.status === selectedStatus.value
            )
          }))
          .filter((employee) => employee.suggestions.length > 0)
  return [...visibleEmployees].sort((a, b) => {
    const riskDiff = (riskRank[b.riskLevel] || 0) - (riskRank[a.riskLevel] || 0)
    if (riskDiff !== 0) return riskDiff
    return a.name.localeCompare(b.name)
  })
})

const hasSuggestionsInView = computed(() => 
  filteredEmployees.value.some(employee => employee.suggestions.length > 0)
)

const handleStatusUpdate = async ({ suggestionId, status }) => {

  updateErrorsById.value = {
    ...updateErrorsById.value,
    [suggestionId]: null
  }

  updatingSuggestionId.value = suggestionId

  try {
    const updated = await updateSuggestionStatus(suggestionId, status)
    employees.value = employees.value.map(employee => ({
      ...employee,
      suggestions: employee.suggestions.map(s =>
        s.id === updated.id ? updated : s
      )
    }))
  } catch (err) {
    updateErrorsById.value = {
      ...updateErrorsById.value,
      [suggestionId]: 'Failed to update this suggestion'
    }
  } finally {
    updatingSuggestionId.value = null
  }
}

</script>