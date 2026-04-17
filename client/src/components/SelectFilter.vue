<template>
  <div class="filters-dropdown">
    <BaseDropDown
      variant="default"
      :modelValue="selectedValue"
      :options="dropdownOptions"
      @update:modelValue="$emit('update:selectedValue', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseDropDown from '@/components/BaseDropDown.vue'
import { formatLabel } from '@/utils/formatters'

const props = defineProps({
  selectedValue: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  allLabel: {
    type: String,
    default: 'All'
  }
})

defineEmits(['update:selectedValue'])

const dropdownOptions = computed(() =>
  props.options.map((option) => ({
    value: option,
    label: formatLabel(option, props.allLabel)
  }))
)

</script>