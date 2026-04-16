<template>
  <li class="suggestion-row">
    <span class="suggestion-dot-tooltip">
      <span
        class="suggestion-dot"
        :class="`dot-priority-${suggestion.priority}`"
        :aria-label="`Priority: ${formatLabel(suggestion.priority)}`"
      ></span>
      <span class="suggestion-tooltip-text" role="tooltip">
        {{ formatLabel(suggestion.priority) }} priority
      </span>
    </span>
    <span class="type-pill">{{ formatLabel(suggestion.type) }}</span>
    <div class="suggestion-main">
      <p class="suggestion-title">{{ suggestion.description }}</p>
      <p class="suggestion-sub">
        <span class="source-pill" :class="`source-${suggestion.source}`">
            <span class="source-pill-dot" aria-hidden="true"></span>
            {{ formatLabel(suggestion.source) }}
        </span>
        <template v-if="suggestion.dateCompleted">
          Completed {{ formatDate(suggestion.dateCompleted) }}
        </template>
        <template v-else>
          Updated {{ formatDate(suggestion.dateUpdated) }}
        </template>
      </p>
    </div>
    <div class="suggestion-controls">
      <BaseDropDown
        variant="status"
        :modelValue="displayedStatus"
        :options="statusOptions"
        :class="statusClass"
        @update:modelValue="handleStatusSelect"
      />
      <span v-if="isUpdating" class="saving-inline">Saving…</span>
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