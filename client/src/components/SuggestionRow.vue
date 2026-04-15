<template>
  <li class="suggestion-row">
    <span>{{ suggestion.description }}</span>

    <select :value="suggestion.status" @change="handleChange">
      <option v-for="status in statuses" :key="status" :value="status">
        {{ formatStatusLabel(status) }}
      </option>
    </select>

    <span v-if="isUpdating">Saving...</span>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>

  </li>
</template>

<script setup>
import { formatStatusLabel } from '@/utils/formatters'

const props = defineProps({
  suggestion: {
    type: Object,
    required: true
  },
  isUpdating: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:status'])

const statuses = ['pending', 'in_progress', 'completed', 'overdue']

const handleChange = (event) => {
  emit('update:status', {
    suggestionId: props.suggestion.id,
    status: event.target.value
  })
}
</script>