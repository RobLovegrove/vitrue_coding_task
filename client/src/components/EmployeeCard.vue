<template>
  <div class="employee">
    <h2>{{ employee.name }}</h2>
    <p>{{ employee.department }} — {{ employee.riskLevel }} risk</p>
    <ul>
      <SuggestionRow
        v-for="suggestion in employee.suggestions"
        :key="suggestion.id"
        :suggestion="suggestion"
        @update:status="$emit('update:status', $event)"
      />
    </ul>
  </div>
</template>

<script setup>

import SuggestionRow from '@/components/SuggestionRow.vue'

defineProps({
  employee: {
    type: Object,
    required: true
  }
})

defineEmits(['update:status'])
</script>