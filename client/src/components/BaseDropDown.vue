<template>
  <div class="dropdown" :class="`dropdown-${props.variant}`">
    <select
      class="dropdown-native"
      :value="props.modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span class="dropdown-caret" aria-hidden="true">▾</span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'status'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue'])
</script>