<template>
  <div class="filters-dropdown">
    <BaseDropDown
      variant="default"
      :modelValue="selectedStatus"
      :options="statusOptions"
      @update:modelValue="$emit('update:selectedStatus', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseDropDown from '@/components/BaseDropDown.vue'
import { formatLabel } from '@/utils/formatters'

const props = defineProps({
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
const statusOptions = computed(() =>
  props.statuses.map((status) => ({
    value: status,
    label: formatLabel(status)
  }))
)

</script>