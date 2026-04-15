<template>
  <div class="employee">
    <h2>{{ employee.name }}</h2>
    <p class="employee-meta">
        {{ employee.department }} —
    <span class="risk-badge" :class="`risk-${employee.riskLevel}`">
        {{ employee.riskLevel }} risk
    </span>
    </p>
    <ul v-if="employee.suggestions.length > 0">
      <SuggestionRow
        v-for="suggestion in employee.suggestions"
        :key="suggestion.id"
        :suggestion="suggestion"
        :isUpdating="updatingSuggestionId === suggestion.id"
        :errorMessage="updateErrorsById[suggestion.id]"
        @update:status="$emit('update:status', $event)"
      />
    </ul>
    <p v-else>No suggestions for this employee.</p>
  </div>
</template>

<script setup>
import SuggestionRow from '@/components/SuggestionRow.vue'

defineProps({
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
</script>