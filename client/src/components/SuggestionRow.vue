<template>
  <li class="suggestion-row">
    <span>{{ suggestion.description }}</span>
    <select :value="suggestion.status" @change="handleChange">
      <option v-for="status in statuses" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
  </li>
</template>

<script setup>
const props = defineProps({
  suggestion: {
    type: Object,
    required: true
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