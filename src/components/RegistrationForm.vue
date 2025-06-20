<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue'
import { toast } from 'vue3-toastify'
import InputField from './form/InputField.vue'
import SelectField from './form/SelectField.vue'
import RadioGroup from './form/RadioGroup.vue'
import PhoneInput from './form/PhoneInput.vue'
import DatePicker from './form/DatePicker.vue'
import ProgressBar from './ProgressBar.vue'
import { Mail, Phone, FileText, User, Calendar, Users, Share2, Globe } from 'lucide-vue-next'
import MainService from '../services/main.service'
// Form data
const formData = ref({
  email: '',
  phone: '',
  documentType: '',
  documentNumber: '',
  fullName: '',
  birthDate: '',
  gender: '',
  referralSource: '',
  country: '',
  department: '',
  province: '',
  district: '',
  age: ''
})

// Validation state
const errors = ref({
  email: '',
  phone: '',
  documentType: '',
  documentNumber: '',
  fullName: '',
  birthDate: '',
  gender: '',
  referralSource: '',
  country: '',
  department: '',
  province: '',
  district: '',
  age: ''
})

// Form validation
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

const validateField = (field: string): boolean => {
  errors.value[field as keyof typeof errors.value] = ''
  if (!showExtraSelects.value && (field === 'department' || field === 'province' || field === 'district')) {
    // Skip validation for department, province, and district if extra selects are not shown
    return true
  }
  console.log('Validating field:', field)
  if (!formData.value[field as keyof typeof formData.value]
    || (field === 'province' && !showExtraSelects.value)
    || (field === 'district' && !showExtraSelects.value)

  ) {
    errors.value[field as keyof typeof errors.value] = 'Este campo es obligatorio'
    return false
  }

  if (field === 'email' && !isEmailValid.value) {
    errors.value.email = 'Por favor ingresa un email válido'
    return false
  }

  if (field === 'documentNumber' && !/^\d+$/.test(formData.value.documentNumber)) {
    errors.value.documentNumber = 'Solo se permiten números'
    return false
  }
  if (field === 'age' && !/^\d+$/.test(formData.value.age)) {
    errors.value.age = 'Solo se permiten números'
    return false
  }

  return true
}

const validateForm = (): boolean => {
  let isValid = true
  Object.keys(formData.value).forEach(field => {
    if (!validateField(field)) {
      isValid = false
    }
  })
  return isValid
}

// Form progress calculation
const formProgress = computed(() => {
  let totalFields = Object.keys(formData.value).length
  const filledFields = Object.entries(formData.value).filter(([_, value]) => value !== '').length
  if (!showExtraSelects.value) {
    // Include extra selects in the total fields count
    totalFields -= 3 // department, province, district
  }
  return Math.round((filledFields / totalFields) * 100)
})

// Options for form selects
const documentTypes = [
  { value: 'dni', label: 'DNI' },
  { value: 'passport', label: 'Pasaporte' },
  { value: 'foreign_id', label: 'Carné de Extranjería' },
  { value: 'other', label: 'Otro' },
]

let countries = [
  { value: '1', label: 'Perú' },
  { value: '2', label: 'Colombia' },
  { value: '3', label: 'México' },
  { value: '4', label: 'Chile' },
  { value: '5', label: 'Argentina' },
]

const genderOptions = [
  { value: 'male', label: 'Hombre' },
  { value: 'female', label: 'Mujer' },
  { value: 'other', label: 'Otros' }
]

const referralOptions = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'Youtube' },
  { value: 'family', label: 'Familiares/Amigos' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Google' },
  { value: 'other', label: 'Otros' }
]
let departments = [];
let provinces = [];
let districts = [];

// Form submission
const isSubmitting = ref(false)
const showExtraSelects = ref(false)
const isSuccess = ref(false)
const formRef = ref<HTMLFormElement | null>(null)
const getDepartments = async (country: string) => {
  if (country != '1' && country != '') {
    showExtraSelects.value = false;
    formData.value.department = '';
    formData.value.province = '';
    formData.value.district = '';
    departments = [];
    provinces = [];
    districts = [];
    return;
  } // Only fetch departments for Peru (country code 1)
  try {
    const data = await MainService.getDepartamentos();
    console.log('Departamentos:', data)
    showExtraSelects.value = true;
    departments = data.map(department => ({
      value: department.value.toString(),
      label: department.label
    }))
    // Handle departments data if needed
  } catch (error) {
    console.error('Error fetching departments:', error)
    toast.error('Ocurrió un error al cargar los departamentos', {
      position: 'top-right',
    })
  }
}
const getProvinces = async (department: string) => {
  if (!department) return
  try {
    const data = await MainService.getProvincias(department);
    console.log('Provincias:', data)
    provinces = data.map(province => ({
      value: province.value.toString(),
      label: province.label
    }))
    // Handle provinces data if needed
  } catch (error) {
    console.error('Error fetching provinces:', error)
    toast.error('Ocurrió un error al cargar las provincias', {
      position: 'top-right',
    })
  }
}
const getDistricts = async (province: string) => {
  if (!province) return
  try {
    const data = await MainService.getDistritos(province);
    districts = data.map(district => ({
      value: district.value.toString(),
      label: district.label
    }))

    // Handle districts data if needed
  } catch (error) {
    console.error('Error fetching districts:', error)
    toast.error('Ocurrió un error al cargar los distritos', {
      position: 'top-right',
    })
  }
}
const handleSubmit = async () => {
  if (validateForm()) {
    if (formRef.value) {


      formRef.value.classList.add('animate-shake')
      try {
        const data = await MainService.crearUsuario(formData.value)
        isSubmitting.value = true

        formRef.value?.classList.remove('animate-shake')
        if (data.status === 'success') {
          isSuccess.value = true
          toast.success('Usuario creado exitosamente', {
            position: 'top-right',
          })
          // Reset form after successful submission
          formData.value = {
            email: '',
            phone: '',
            documentType: '',
            documentNumber: '',
            fullName: '',
            birthDate: '',
            gender: '',
            country: '',
            department: '',
            province: '',
            district: '',
            referralSource: ''
          }
        }
      } catch (error) {
        console.error('Error al crear usuario:', error)
        toast.error('Ocurrió un error al crear tu cuenta', {
          position: 'top-right',
        })
      } finally {
        isSubmitting.value = false
      }

    }


  }


}

// Field focus tracking for animation
const focusedField = ref<string | null>(null)

const setFocusedField = (field: string | null) => {
  focusedField.value = field
}

// Auto animation on mount
const isVisible = ref(false)
onBeforeMount(async () => {
  try {
    const data = await MainService.getPaises();
    countries = [...data.map(country => ({ value: country.value.toString(), label: country.label }))]
    setTimeout(() => {
      isVisible.value = true
    }, 100)
  }
  catch (error) {
    console.error('Error fetching countries:', error)
    toast.error('Ocurrió un error al cargar los países', {
      position: 'top-right',
    })
    setTimeout(() => {
      isVisible.value = true
    }, 100)
  }
})
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4  ">
    <div class="bg-white  shadow-xl overflow-hidden transition-all duration-700 "
      :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      <div class="flex flex-col md:flex-row gap-2 items-center pt-10 px-10 pb-4 border-b border-gray-200">
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-semibold text-black mb-2 flex items-center gap-3">
            Regístrate
          </h2>
          <span>Ingresa tus datos para crear cuenta</span>
        </div>

        <!-- Progress indicator -->
        <div class="w-full md:w-1/2">
          <ProgressBar :progress="formProgress" />
          <p class="text-sm text-gray-600 mt-1">{{ formProgress }}% completado</p>
        </div>
      </div>
      <form ref="formRef" @submit.prevent="handleSubmit" class="px-8 py-6 space-y-6">
        <div class="relative">
          <InputField id="fullName" v-model="formData.fullName" label="Nombres y Apellidos"
            placeholder="Ingresa tu nombre completo" :error="errors.fullName" @focus="setFocusedField('fullName')"
            @blur="setFocusedField(null); validateField('fullName')" :is-focused="focusedField === 'fullName'"
            class="" />
        </div>
        <!-- First row: Email and Phone -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="relative">
            <InputField id="email" v-model="formData.email" label="Correo" type="email" placeholder="correo@ejemplo.com"
              :error="errors.email" @focus="setFocusedField('email')"
              @blur="setFocusedField(null); validateField('email')" :is-focused="focusedField === 'email'" class="" />
          </div>

          <div class="relative">
            <PhoneInput id="phone" v-model="formData.phone" label="Whatsapp" :error="errors.phone"
              @focus="setFocusedField('phone')" @blur="setFocusedField(null); validateField('phone')"
              :is-focused="focusedField === 'phone'" />
          </div>
        </div>

        <!-- Second row: Document type and number -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="relative">
            <SelectField id="documentType" v-model="formData.documentType" label="Tipo de documento"
              :options="documentTypes" placeholder="- Seleccionar -" :error="errors.documentType"
              @focus="setFocusedField('documentType')" @blur="setFocusedField(null); validateField('documentType')"
              :is-focused="focusedField === 'documentType'" class="" />
          </div>

          <div class="relative">
            <InputField id="documentNumber" v-model="formData.documentNumber" label="Número de documento"
              placeholder="Ingresa tu número de documento" :error="errors.documentNumber"
              @focus="setFocusedField('documentNumber')" @blur="setFocusedField(null); validateField('documentNumber')"
              :is-focused="focusedField === 'documentNumber'" class="" />
          </div>
        </div>


        <div class="grid md:grid-cols-2 gap-6">
          <div class="relative">
            <DatePicker id="birthDate" v-model="formData.birthDate" label="F. Nacimiento" :error="errors.birthDate"
              @focus="setFocusedField('birthDate')" @blur="setFocusedField(null); validateField('birthDate')"
              :is-focused="focusedField === 'birthDate'" class="" />
          </div>
          <!--add age input-->
          <div class="relative">
            <InputField id="age" v-model="formData.age" label="Edad" type="number" placeholder="Ingresa tu edad"
              :error="errors.age" @focus="setFocusedField('age')" @blur="setFocusedField(null); validateField('age')"
              :is-focused="focusedField === 'age'" class="" />
          </div>
          <div class="relative">
            <div class="">
              <label class="form-label">Sexo</label>
              <RadioGroup v-model="formData.gender" :options="genderOptions" name="gender" :error="errors.gender"
                @focus="setFocusedField('gender')" @blur="setFocusedField(null); validateField('gender')" />
            </div>
          </div>
        </div>

        <!-- Referral source -->
        <div class="relative">
          <div class="">
            <SelectField id="referralSource" v-model="formData.referralSource"
              label="¿Cómo te enteraste de Probusiness?" :options="referralOptions" placeholder="- Seleccionar -"
              :error="errors.referralSource" @focus="setFocusedField('referralSource')"
              @blur="setFocusedField(null); validateField('referralSource')" column
              :is-focused="focusedField === 'referralSource'" class="" />
            <!-- <RadioGroup v-model="formData.referralSource" :options="referralOptions" name="referralSource"
              :error="errors.referralSource" @focus="setFocusedField('referralSource')"
              @blur="setFocusedField(null); validateField('referralSource')" column /> -->
          </div>
        </div>

        <!-- Country -->
        <div class="relative">
          <SelectField id="country" v-model="formData.country" label="País" :options="countries"
            placeholder="- Seleccionar -" :error="errors.country" @focus="setFocusedField('country')"
            @update:modelValue="getDepartments($event)" @blur="setFocusedField(null); validateField('country')"
            :is-focused="focusedField === 'country'" class="" />
        </div>
        <div v-if="showExtraSelects" class="grid md:grid-cols-3 gap-6">
          <div class="relative">
            <SelectField id="department" v-model="formData.department" label="Departamento" :options="departments"
              placeholder="- Seleccionar -" :error="errors.department" @update:modelValue="getProvinces($event)"
              @focus="setFocusedField('department')" @blur="setFocusedField(null); validateField('department')"
              :is-focused="focusedField === 'department'" class="" />
          </div>
          <div class="relative">
            <SelectField id="province" v-model="formData.province" label="Provincia" :options="provinces"
              placeholder="- Seleccionar -" :error="errors.province" @update:modelValue="getDistricts($event)"
              @focus="setFocusedField('province')" @blur="setFocusedField(null); validateField('province')"
              :is-focused="focusedField === 'province'" class="" />
          </div>
          <div class="relative">
            <SelectField id="district" v-model="formData.district" label="Distrito" :options="districts"
              placeholder="- Seleccionar -" :error="errors.district" @focus="setFocusedField('district')"
              @blur="setFocusedField(null); validateField('district')" :is-focused="focusedField === 'district'"
              class="" />
          </div>

        </div>
        <div class="text-xs text-gray-500 mt-2 relative">
          Al crear tu cuenta aceptas nuestra <a class="text-blue-500 hover:underline"
            href="https://probusiness.pe/terminos-y-condiciones" target="_blank">política de privacidad</a> y
          <a class="text-blue-500 hover:underline" href="https://probusiness.pe/terminos-y-condiciones"
            target="_blank">términos y condiciones</a>.
        </div>
        <!-- Submit button -->
        <button type="submit" class="btn-primary w-full py-3 flex justify-center items-center group gap-2"
          :disabled="isSubmitting">
          <span v-if="isSubmitting" class="inline-block">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </span>
          <span v-if="!isSubmitting" class="group-hover:translate-x-1 transition-transform duration-300">
            Crear cuenta
          </span>
          <span v-else>Procesando...</span>
        </button>
      </form>
    </div>
  </div>
</template>