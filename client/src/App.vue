<template>
  <div class="app">
    <h1>MSK Suggestions Board</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <pre v-else>{{ employees }}</pre>
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