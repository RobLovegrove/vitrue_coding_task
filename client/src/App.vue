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
      <EmployeeCard
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
  if (selectedStatus.value === 'all') return employees.value

  return employees.value
    .map(employee => ({
      ...employee,
      suggestions: employee.suggestions.filter(s => s.status === selectedStatus.value)
    }))
    .filter(employee => employee.suggestions.length > 0)
})

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