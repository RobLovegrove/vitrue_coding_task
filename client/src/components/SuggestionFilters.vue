<template>
  <div class="filters">
    <label>Filter by status:</label>
    <select :value="selectedStatus" @change="$emit('update:selectedStatus', $event.target.value)">
      <option v-for="status in statuses" :key="status" :value="status">
        {{ formatStatusLabel(status) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { formatStatusLabel } from '@/utils/formatters'

defineProps({
  selectedStatus: {
    type: String,
    required: true
  },
  statuses: {
    type: Array,
    required: true
  }
})

defineEmits(['update:selectedStatus'])
</script>