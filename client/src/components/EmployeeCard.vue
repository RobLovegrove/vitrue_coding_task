<template>
  <div class="employee">
    <h2>{{ employee.name }}</h2>
    <p>{{ employee.department }} — {{ employee.riskLevel }} risk</p>
    <ul>
      <li v-for="suggestion in employee.suggestions" :key="suggestion.id">
        {{ suggestion.description }} — <strong>{{ suggestion.status }}</strong>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  employee: {
    type: Object,
    required: true
  }
})
</script>