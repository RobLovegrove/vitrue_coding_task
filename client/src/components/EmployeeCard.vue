<template>
    <article class="employee-card">
      <header class="employee-card-header">
        <div class="employee-avatar" aria-hidden="true">
          {{ initials }}
        </div>
        <div class="employee-card-titles">
          <h2 class="employee-name">{{ employee.name }}</h2>
          <p class="employee-dept">{{ employee.department }}</p>
        </div>
        <span class="risk-badge risk-header" :class="`risk-${employee.riskLevel}`">
          {{ riskLabel }}
        </span>
      </header>
      <ul v-if="employee.suggestions.length > 0" class="suggestion-list">
        <SuggestionRow
          v-for="suggestion in employee.suggestions"
          :key="suggestion.id"
          :suggestion="suggestion"
          :isUpdating="updatingSuggestionId === suggestion.id"
          :errorMessage="updateErrorsById[suggestion.id]"
          @update:status="$emit('update:status', $event)"
        />
      </ul>
      <p v-else class="employee-card-empty">No suggestions for this employee.</p>
    </article>
  </template>

<script setup>
import { computed } from 'vue'
import SuggestionRow from '@/components/SuggestionRow.vue'

const props = defineProps({
  employee: {
    type: Object,
    required: true
  },
  updatingSuggestionId: {
    type: String,
    default: null
  },
  updateErrorsById: {
    type: Object,
    required: true
  }
})

defineEmits(['update:status'])

const initials = computed(() => {
  const parts = props.employee.name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return props.employee.name.slice(0, 2).toUpperCase()
})
const riskLabel = computed(() => {
  const level = props.employee.riskLevel || ''
  return `${level.charAt(0).toUpperCase() + level.slice(1)} risk`
})

</script>