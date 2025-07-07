# Guía de Desarrollo - ProBusiness

## 🚀 Inicio Rápido

### Configuración Inicial
```bash
# Clonar el proyecto
git clone [URL_DEL_REPOSITORIO]
cd probusiness_curso_front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu API

# Ejecutar en desarrollo
npm run dev
```

### Estructura de Archivos Importantes
```
src/
├── components/
│   ├── RegistrationForm.vue    # Formulario principal
│   ├── ProgressBar.vue         # Barra de progreso
│   └── form/                   # Componentes de formulario
│       ├── InputField.vue      # Campo de texto
│       ├── SelectField.vue     # Campo de selección
│       ├── PhoneInput.vue      # Campo de teléfono
│       ├── DatePicker.vue      # Selector de fecha
│       └── RadioGroup.vue      # Botones de radio
├── services/
│   └── main.service.js         # Servicios de API
└── App.vue                     # Componente raíz
```

## 🛠️ Desarrollo

### Agregar un Nuevo Campo al Formulario

1. **Actualizar el estado del formulario en `RegistrationForm.vue`:**
```typescript
const formData = ref({
  // ... campos existentes
  nuevoCampo: ''
})

const errors = ref({
  // ... campos existentes
  nuevoCampo: ''
})
```

2. **Agregar validación:**
```typescript
const validateField = (field: string): boolean => {
  // ... validaciones existentes
  
  if (field === 'nuevoCampo' && !formData.value.nuevoCampo) {
    errors.value.nuevoCampo = 'Este campo es obligatorio'
    return false
  }
  
  return true
}
```

3. **Agregar el campo en el template:**
```vue
<InputField
  v-model="formData.nuevoCampo"
  :error="errors.nuevoCampo"
  label="Nuevo Campo"
  placeholder="Ingrese el nuevo campo"
  :icon="User"
/>
```

### Crear un Nuevo Componente de Formulario

1. **Crear el archivo del componente:**
```vue
<!-- src/components/form/NewField.vue -->
<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        :class="{ 'border-red-500': error }"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="icon" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <component :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  placeholder?: string
  type?: string
  error?: string
  icon?: any
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  error: '',
  id: ''
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
```

2. **Importar y usar el componente:**
```vue
<script setup>
import NewField from './form/NewField.vue'
</script>

<template>
  <NewField
    v-model="formData.nuevoCampo"
    label="Nuevo Campo"
    placeholder="Ingrese el valor"
    :error="errors.nuevoCampo"
  />
</template>
```

### Agregar un Nuevo Servicio de API

1. **Crear el método en `MainService.js`:**
```javascript
async nuevoMetodo(parametros) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/nuevoEndpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(parametros)
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en nuevoMetodo:', error);
    throw error;
  }
}
```

2. **Usar el servicio en el componente:**
```typescript
const llamarNuevoServicio = async () => {
  try {
    const resultado = await MainService.nuevoMetodo(datos);
    console.log('Resultado:', resultado);
  } catch (error) {
    toast.error('Error al llamar el servicio', {
      position: 'top-right',
    });
  }
}
```

## 🎨 Estilos y Diseño

### Agregar Nuevos Colores a Tailwind

1. **Editar `tailwind.config.js`:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa', // Nuevo color
          500: '#3b82f6', // Nuevo color
        },
        secondary: {
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
        }
      }
    },
  },
}
```

### Crear Clases CSS Personalizadas

1. **Agregar en `src/style.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
  
  .error-message {
    @apply mt-1 text-sm text-red-600;
  }
}
```

## 🔧 Configuración y Variables de Entorno

### Variables de Entorno Disponibles

```env
# .env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=ProBusiness
VITE_APP_VERSION=1.0.0
```

### Usar Variables de Entorno

```typescript
// En cualquier componente
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

## 🧪 Testing

### Configurar Tests Unitarios

1. **Instalar dependencias:**
```bash
npm install -D vitest @vue/test-utils jsdom
```

2. **Configurar Vitest en `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
```

3. **Crear test para un componente:**
```typescript
// src/components/__tests__/InputField.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '../form/InputField.vue'

describe('InputField', () => {
  it('renders correctly', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: '',
        label: 'Test Label'
      }
    })
    
    expect(wrapper.find('label').text()).toBe('Test Label')
  })
})
```

4. **Ejecutar tests:**
```bash
npm run test
```

## 🚀 Despliegue

### Build para Producción

```bash
# Construir la aplicación
npm run build

# Previsualizar el build
npm run preview
```

### Configuración para Diferentes Entornos

1. **Crear archivos de configuración:**
```bash
.env.development    # Variables para desarrollo
.env.production     # Variables para producción
.env.staging        # Variables para staging
```

2. **Ejemplo de `.env.production`:**
```env
VITE_API_URL=https://api.probusiness.com
VITE_APP_TITLE=ProBusiness - Producción
```

## 🔍 Debugging

### Herramientas de Desarrollo

1. **Vue DevTools:**
   - Instalar extensión del navegador
   - Inspeccionar estado de componentes
   - Ver eventos y props

2. **Console Logging:**
```typescript
// En componentes Vue
console.log('Estado del formulario:', formData.value)
console.log('Errores:', errors.value)

// Con prefijo para identificar
console.log('[RegistrationForm] Validando campo:', field)
```

3. **Debugger en el Código:**
```typescript
const validateField = (field: string): boolean => {
  debugger; // Punto de parada para debugging
  // ... resto del código
}
```

### Errores Comunes y Soluciones

1. **Error: "Cannot read property of undefined"**
   - Verificar que las props estén definidas
   - Usar optional chaining (`?.`)
   - Agregar valores por defecto

2. **Error: "Component not found"**
   - Verificar la ruta de importación
   - Asegurar que el componente esté exportado
   - Verificar el nombre del componente

3. **Error: "API call failed"**
   - Verificar la URL de la API
   - Revisar las variables de entorno
   - Verificar la conectividad de red

## 📚 Recursos Útiles

### Documentación Oficial
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript con Vue](https://vuejs.org/guide/typescript/overview.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)

### Herramientas Recomendadas
- **VS Code Extensions:**
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)
  - Tailwind CSS IntelliSense
  - Auto Rename Tag

- **Navegador Extensions:**
  - Vue.js devtools
  - React Developer Tools (si usas React también)

### Comunidad y Soporte
- [Vue.js Forums](https://forum.vuejs.org/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js)
- [Discord Vue.js](https://chat.vuejs.org/)

## 🎯 Mejores Prácticas

### Código Limpio
- Usar nombres descriptivos para variables y funciones
- Comentar código complejo
- Seguir las convenciones de Vue 3
- Mantener componentes pequeños y enfocados

### Performance
- Usar `v-memo` para listas grandes
- Implementar lazy loading cuando sea necesario
- Optimizar imágenes y assets
- Usar `computed` en lugar de métodos cuando sea posible

### Accesibilidad
- Usar etiquetas semánticas
- Agregar atributos `aria-*`
- Asegurar contraste de colores adecuado
- Probar con lectores de pantalla

---

**Guía de Desarrollo ProBusiness** - Para desarrolladores que trabajan en el proyecto 