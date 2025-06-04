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

const showPicker = ref(false)
const showYearSelector = ref(true)
const showMonthSelector = ref(false)
const selectedDate = ref(props.modelValue || '')
const currentMonth = ref(new Date())

// Generate years array (100 years back from current year)
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 100 }, (_, i) => currentYear - i)
})

// Generate months array
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  selectedDate.value = newValue
})

const inputClasses = computed(() => {
  return [
    'form-input',
    props.isFocused ? 'input-focused' : '',
    props.error ? 'border-red-500' : '',
    'hover:border-gray-400',
    'focus:input-focused',
    'cursor-pointer'
  ]
})

const monthName = computed(() => {
  return currentMonth.value.toLocaleString('es', { month: 'long' })
})

const currentYear = computed(() => {
  return currentMonth.value.getFullYear()
})

const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  
  // Add empty spaces for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }
  
  // Add the days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i)
  }
  
  return days
})

const isSelectedDay = (day: number) => {
  if (!selectedDate.value) return false
  const date = new Date(selectedDate.value)
  return date.getDate() === day && 
         date.getMonth() === currentMonth.value.getMonth() && 
         date.getFullYear() === currentMonth.value.getFullYear()
}

const isToday = (day: number) => {
  const today = new Date()
  return day === today.getDate() && 
         currentMonth.value.getMonth() === today.getMonth() && 
         currentMonth.value.getFullYear() === today.getFullYear()
}

const handleDayClick = (day: number) => {
  const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day)
  selectedDate.value = date.toISOString().split('T')[0]
  emit('update:modelValue', selectedDate.value)
  showPicker.value = false
  showYearSelector.value = true
  showMonthSelector.value = false
}

const selectYear = (year: number) => {
  currentMonth.value = new Date(year, currentMonth.value.getMonth(), 1)
  showYearSelector.value = false
  showMonthSelector.value = true
}

const selectMonth = (monthIndex: number) => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), monthIndex, 1)
  showMonthSelector.value = false
}

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es', { 
    day: '2-digit',
    month: 'long', 
    year: 'numeric'
  })
}

// Close picker when clicking outside
const pickerRef = ref<HTMLDivElement | null>(null)
const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    showPicker.value = false
    showYearSelector.value = true
    showMonthSelector.value = false
  }
}

watch(showPicker, (newValue) => {
  if (newValue) {
    document.addEventListener('mousedown', handleClickOutside)
    if (selectedDate.value) {
      currentMonth.value = new Date(selectedDate.value)
    }
    showYearSelector.value = true
    showMonthSelector.value = false
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})
</script>

<template>
  <div class="relative animate-fade-in" style="animation-delay: calc(0.05s * v-bind:id.length)" ref="pickerRef">
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="relative">
      <input 
        :id="id" 
        type="text"
        readonly
        :value="formatDisplayDate(modelValue)"
        @click="showPicker = !showPicker"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        :placeholder="'Seleccionar fecha'"
        :class="inputClasses"
      />
      
      <!-- Calendar icon -->
      <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Custom date picker -->
      <div v-if="showPicker" class="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-[320px] animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <button 
            type="button"
            @click="showYearSelector = true; showMonthSelector = false"
            class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors w-full justify-center"
          >
            <span v-if="!showYearSelector && !showMonthSelector" class="text-lg font-medium text-gray-900 capitalize">{{ monthName }}</span>
            <span class="text-lg font-medium text-gray-900">{{ currentYear }}</span>
            <ChevronDown class="w-4 h-4 text-gray-600" :class="{ 'rotate-180': showYearSelector }" />
          </button>
        </div>
        
        <!-- Year selector -->
        <div v-if="showYearSelector" class="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto py-1 animate-fade-in">
          <button
            v-for="year in years"
            :key="year"
            type="button"
            @click="selectYear(year)"
            class="px-2 py-3 text-center hover:bg-primary-50 rounded-lg transition-colors"
            :class="{ 'bg-primary-50 text-primary-700 font-medium': year === currentYear }"
          >
            {{ year }}
          </button>
        </div>

        <!-- Month selector -->
        <div v-else-if="showMonthSelector" class="grid grid-cols-3 gap-2 animate-fade-in">
          <button
            v-for="(month, index) in months"
            :key="index"
            type="button"
            @click="selectMonth(index)"
            class="px-2 py-3 text-center hover:bg-primary-50 rounded-lg transition-colors"
            :class="{ 'bg-primary-50 text-primary-700 font-medium': index === currentMonth.getMonth() }"
          >
            {{ month.slice(0, 3) }}
          </button>
        </div>
        
        <!-- Calendar view -->
        <template v-else>
          <!-- Week days -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <template v-for="day in ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']">
              <div class="text-center text-sm font-medium text-gray-500">{{ day }}</div>
            </template>
          </div>
          
          <!-- Calendar days -->
          <div class="grid grid-cols-7 gap-1">
            <template v-for="day in daysInMonth">
              <div 
                v-if="day === null" 
                class="aspect-square"
              ></div>
              <button
                v-else
                type="button"
                @click="handleDayClick(day)"
                class="aspect-square flex items-center justify-center text-sm rounded-full transition-all duration-200"
                :class="{
                  'bg-primary-500 text-white hover:bg-primary-600': isSelectedDay(day),
                  'bg-primary-50 text-primary-700 font-medium': isToday(day) && !isSelectedDay(day),
                  'hover:bg-gray-100 text-gray-700': !isSelectedDay(day) && !isToday(day)
                }"
              >
                {{ day }}
              </button>
            </template>
          </div>
        </template>
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

/* Custom scrollbar for year selector */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>