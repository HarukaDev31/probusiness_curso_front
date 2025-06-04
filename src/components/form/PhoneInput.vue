<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string
  label: string
  error?: string
  isFocused?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const countryCode = ref('+51') // Default to Peru
const phoneNumber = ref('')

// Common country codes
const countryCodes = [
  { code: '+51', country: 'PE', flag: '🇵🇪' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
]

const isDropdownOpen = ref(false)
const phoneInputRef = ref<HTMLDivElement | null>(null)

// Update the full phone number when either part changes
watch([countryCode, phoneNumber], () => {
  emit('update:modelValue', `${countryCode.value} ${phoneNumber.value}`)
})

// Parse the modelValue into countryCode and phoneNumber
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const parts = newValue.split(' ')
    if (parts.length >= 2) {
      countryCode.value = parts[0]
      phoneNumber.value = parts.slice(1).join(' ')
    } else {
      phoneNumber.value = newValue
    }
  }
}, { immediate: true })

const inputClasses = computed(() => {
  return [
    'form-input',
    'pl-20', // Space for country code
    props.isFocused ? 'input-focused' : '',
    props.error ? 'border-red-500' : '',
    'hover:border-gray-400',
    'focus:input-focused'
  ]
})

// Handle clicking outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (phoneInputRef.value && !phoneInputRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

// Setup and teardown click listener
const setupClickListener = () => {
  document.addEventListener('mousedown', handleClickOutside)
}

const teardownClickListener = () => {
  document.removeEventListener('mousedown', handleClickOutside)
}

watch(isDropdownOpen, (newValue) => {
  if (newValue) {
    setupClickListener()
  } else {
    teardownClickListener()
  }
})
</script>

<template>
  <div 
    class="relative animate-fade-in" 
    style="animation-delay: calc(0.05s * v-bind:id.length)"
    ref="phoneInputRef"
  >
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="relative">
      <div 
        class="absolute inset-y-0 left-0 flex items-center px-3 border-r border-gray-300"
        :class="{'border-primary-500': props.isFocused}"
      >
        <button 
          type="button"
          @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center text-gray-700 focus:outline-none"
        >
          <span 
            class="mr-1 text-sm font-medium transition-all duration-300"
            :class="props.isFocused ? 'text-primary-700' : ''"
          >
            {{ countryCode }}
          </span>
          <svg 
            class="h-4 w-4 text-gray-400 transition-transform duration-300" 
            :class="{'rotate-180': isDropdownOpen}"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <input 
        :id="id"
        type="tel" 
        :value="phoneNumber"
        @input="phoneNumber = ($event.target as HTMLInputElement).value"
        placeholder="Número de teléfono"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        :class="inputClasses"
      />
      
      <!-- Country code dropdown -->
      <div 
        v-if="isDropdownOpen"
        class="absolute left-0 z-10 mt-1 w-48 bg-white shadow-lg rounded-lg py-1 text-sm ring-1 ring-black ring-opacity-5 animate-fade-in overflow-auto max-h-48"
      >
        <button
          v-for="country in countryCodes"
          :key="country.code"
          type="button"
          @click="countryCode = country.code; isDropdownOpen = false"
          class="w-full px-4 py-2 text-left hover:bg-primary-50 flex items-center transition-colors duration-200"
          :class="{'bg-primary-50 text-primary-700': country.code === countryCode}"
        >
          <span class="mr-2">{{ country.flag }}</span>
          <span>{{ country.country }}</span>
          <span class="ml-auto">{{ country.code }}</span>
        </button>
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