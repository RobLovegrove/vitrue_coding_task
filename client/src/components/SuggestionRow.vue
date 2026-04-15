<template>
  <li class="suggestion-row">
    <div class="suggestion-content">
        <p class="description">{{ suggestion.description }}</p>

        <div class="suggestion-meta">
            <span class="meta-item">Type: {{ formatLabel(suggestion.type) }}</span>
            <span class="meta-item">Priority: {{ formatLabel(suggestion.priority) }}</span>

            <span class="meta-item">Source: {{ formatLabel(suggestion.source) }}</span>
            
            <span v-if="suggestion.dateCompleted" class="meta-item">
                Completed: {{ formatDate(suggestion.dateCompleted) }}
            </span>
            <span v-else class="meta-item">
                Updated: {{ formatDate(suggestion.dateUpdated) }}
            </span>
        </div>
    </div>
    
    <div class="suggestion-controls">
        <select :value="suggestion.status" @change="handleChange">
        <option v-for="status in statuses" :key="status" :value="status">
            {{ formatStatusLabel(status) }}
        </option>
        </select>

        <span v-if="isUpdating">Saving...</span>
        <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
    </div>
  </li>
</template>

<script setup>
import { formatStatusLabel, formatLabel, formatDate } from '@/utils/formatters'

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