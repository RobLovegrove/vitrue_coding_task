<template>
  <li class="suggestion-row">
    <div class="suggestion-content">
        <p class="description">{{ suggestion.description }}</p>

        <div class="suggestion-meta">
            <span class="meta-item">Type: {{ formatLabel(suggestion.type) }}</span>
            <span class="priority-badge" :class="`priority-${suggestion.priority}`">
                Priority: {{ formatLabel(suggestion.priority) }}
            </span>
            
            <span v-if="suggestion.dateCompleted" class="meta-item">
                Completed: {{ formatDate(suggestion.dateCompleted) }}
            </span>
            <span v-else class="meta-item">
                Updated: {{ formatDate(suggestion.dateUpdated) }}
            </span>
        </div>
    </div>
    
    <div class="suggestion-controls">        
        <BaseDropDown
            variant="status"
            :modelValue="displayedStatus"
            :options="statusOptions"
            :class="statusClass"
            @update:modelValue="handleStatusSelect"
        />

        <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
    </div>
  </li>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseDropDown from '@/components/BaseDropDown.vue'
import { formatLabel, formatDate } from '@/utils/formatters'

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
const pendingStatus = ref(null)
const displayedStatus = computed(() =>
  pendingStatus.value ?? props.suggestion.status
)

const statusClass = computed(() => `status-${displayedStatus.value}`)

const statusOptions = statuses.map((status) => ({
    value: status,
    label: formatLabel(status)
}))

const handleStatusSelect = (status) => {
  pendingStatus.value = status
  emit('update:status', {
    suggestionId: props.suggestion.id,
    status
  })
}

watch(
  () => props.isUpdating,
  (isUpdatingNow) => {
    if (!isUpdatingNow) {
      pendingStatus.value = null
    }
  }
)
</script>