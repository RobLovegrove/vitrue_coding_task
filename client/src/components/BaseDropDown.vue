<template>
    <div class="dropdown" ref="rootEl">
      <button type="button" class="dropdown-trigger" @click="isOpen = !isOpen">
        <span class="dropdown-label">{{ selectedLabel }}</span>
        <span class="dropdown-caret">{{ isOpen ? '▴' : '▾' }}</span>
      </button>
  
      <div v-if="isOpen" class="dropdown-menu">
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="dropdown-option"
          :class="{ active: option.value === modelValue }"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  
  const props = defineProps({
    modelValue: { type: String, required: true },
    options: { type: Array, required: true }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const isOpen = ref(false)
  const rootEl = ref(null)
  
  const selectedLabel = computed(() => {
    const match = props.options.find((o) => o.value === props.modelValue)
    return match ? match.label : props.modelValue
  })
  
  const selectOption = (value) => {
    emit('update:modelValue', value)
    isOpen.value = false
  }
  
  const handleOutsideClick = (event) => {
    if (rootEl.value && !rootEl.value.contains(event.target)) {
      isOpen.value = false
    }
  }
  
  onMounted(() => document.addEventListener('click', handleOutsideClick))
  onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))
  </script>