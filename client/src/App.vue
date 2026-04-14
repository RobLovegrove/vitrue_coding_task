<template>
  <div class="app">
    <h1>MSK Suggestions Board</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="employee in employees" :key="employee.id" class="employee">
        <h2>{{ employee.name }}</h2>
        <p>{{ employee.department }} — {{ employee.riskLevel }} risk</p>
        <ul>
          <li v-for="suggestion in employee.suggestions" :key="suggestion.id">
            {{ suggestion.description }} — <strong>{{ suggestion.status }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEmployees } from '@/services/api'

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
</script>