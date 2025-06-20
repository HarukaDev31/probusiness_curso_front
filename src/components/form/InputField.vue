<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string
  label: string
  placeholder?: string
  type?: string
  error?: string
  isFocused?: boolean
}>()

defineEmits(['update:modelValue', 'focus', 'blur'])

const inputClasses = computed(() => {
  return [
    'form-input',
    props.isFocused ? 'input-focused' : '',
    props.error ? 'border-red-500' : '',
    'hover:border-gray-400',
    'focus:input-focused'
  ]
})
</script>

<template>
  <div class="relative animate-fade-in" style="animation-delay: calc(0.05s * v-bind:id.length)">
    <label :for="id" class="form-label">{{ label }}</label>
    <input 
      :id="id" 
      :type="type || 'text'" 
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      :class="inputClasses"
    />
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>