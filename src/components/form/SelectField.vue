<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string|number
  label: string
  placeholder?: string
  options: Array<{ value: string, label: string }>
  error?: string
  isFocused?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const handleSelect = (value: string) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const selectClasses = computed(() => {
  return [
    'form-select',
    props.isFocused || isOpen.value ? 'input-focused' : '',
    props.error ? 'border-red-500' : '',
    'hover:border-gray-400',
    'cursor-pointer'
  ]
})

const dropdownClasses = computed(() => {
  return [
    'absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto max-h-60',
    isOpen.value ? 'animate-fade-in' : 'hidden'
  ]
})

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Close dropdown when modelValue changes
watch(() => props.modelValue, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="relative animate-fade-in" style="animation-delay: calc(0.05s * v-bind:id.length)" ref="selectRef">
    <label :for="id" class="form-label">{{ label }}</label>
    
    <div 
      :id="id" 
      :class="selectClasses"
      @click="isOpen = !isOpen; $emit('focus')"
      @blur="$emit('blur')"
    >
      <div class="flex justify-between items-center">
        <span class="block truncate" :class="{'text-gray-500': !modelValue}">
          {{ selectedOption ? selectedOption.label : (placeholder || 'Seleccionar') }}
        </span>
        <span class="pointer-events-none">
          <svg class="h-5 w-5 text-gray-400 transition-transform duration-300" :class="{'rotate-180': isOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>
    
    <div 
      :class="dropdownClasses"
      class="transition-all duration-300 ease-in-out"
    >
      <ul>
        <li 
          v-for="option in options" 
          :key="option.value"
          @click="handleSelect(option.value)"
          class="px-4 py-2 hover:bg-primary-50 cursor-pointer transition-colors duration-200"
          :class="{'bg-primary-50 text-primary-700': option.value === modelValue}"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    
    <transition name="slide">
      <p v-if="error" class="error-message">{{ error }}</p>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>