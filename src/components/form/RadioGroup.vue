<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  options: Array<{ value: string, label: string }>
  name: string
  error?: string
  column?: boolean
}>()

defineEmits(['update:modelValue', 'focus', 'blur'])

const layoutClass = computed(() => {
  return props.column ? 'space-y-2' : 'flex flex-wrap gap-4'
})
</script>

<template>
  <div class="animate-fade-in">
    <div :class="layoutClass">
      <div 
        v-for="option in options" 
        :key="option.value"
        class="flex items-center"
      >
        <label 
          class="inline-flex items-center cursor-pointer group"
          :class="{'text-primary-700 font-medium': modelValue === option.value}"
        >
          <span class="relative flex items-center justify-center mr-2">
            <input 
              type="radio" 
              :name="name" 
              :value="option.value" 
              :checked="modelValue === option.value"
              @change="$emit('update:modelValue', option.value)"
              @focus="$emit('focus')"
              @blur="$emit('blur')"
              class="form-radio absolute opacity-0 h-0 w-0" 
            />
            <span 
              class="w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center"
              :class="modelValue === option.value 
                ? 'border-primary-500 border-2' 
                : 'border-gray-300 group-hover:border-gray-400'"
            >
              <span 
                class="w-2.5 h-2.5 rounded-full transition-all duration-300 transform"
                :class="modelValue === option.value 
                  ? 'bg-primary-500 scale-100' 
                  : 'bg-transparent scale-0'"
              ></span>
            </span>
          </span>
          <span class="transition-all duration-300">{{ option.label }}</span>
        </label>
      </div>
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