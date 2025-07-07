# Documentación Técnica - ProBusiness

## 📊 Arquitectura del Proyecto

### Stack Tecnológico
- **Frontend Framework**: Vue 3 (Composition API)
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Vue Reactivity (ref, reactive)
- **HTTP Client**: Fetch API nativo
- **UI Components**: Componentes personalizados

### Patrón de Arquitectura
El proyecto sigue un patrón de arquitectura basado en componentes con separación de responsabilidades:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │    Services     │    │      APIs       │
│                 │    │                 │    │                 │
│ - Registration  │◄──►│ - MainService   │◄──►│ - Backend APIs  │
│ - Form Fields   │    │                 │    │                 │
│ - ProgressBar   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuración del Proyecto

### Dependencias Principales

#### Dependencias de Producción
```json
{
  "vue": "^3.4.38",           // Framework principal
  "lucide-vue-next": "^0.359.0", // Iconos
  "vue-final-modal": "^4.5.4",   // Sistema de modales
  "vue-tel-input": "^8.3.1",     // Input telefónico
  "vue3-toastify": "^0.2.1"      // Notificaciones
}
```

#### Dependencias de Desarrollo
```json
{
  "@vitejs/plugin-vue": "^5.1.3", // Plugin Vue para Vite
  "typescript": "^5.5.3",         // TypeScript
  "vite": "^5.4.2",              // Build tool
  "tailwindcss": "^3.4.1",       // CSS framework
  "vue-tsc": "^2.1.4"            // TypeScript compiler para Vue
}
```

### Configuración de Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true
  }
})
```

### Configuración de Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
        }
      }
    },
  },
  plugins: [],
}
```

## 🎨 Componentes del Sistema

### 1. RegistrationForm.vue

#### Responsabilidades
- Gestión del estado del formulario
- Validación de campos
- Integración con servicios
- Manejo de errores
- Cálculo de progreso

#### Estructura de Datos
```typescript
interface FormData {
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  fullName: string;
  birthDate: string;
  gender: string;
  referralSource: string;
  country: string;
  department: string;
  province: string;
  district: string;
  age: string;
}
```

#### Funciones Principales
```typescript
// Validación de email
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

// Validación de campo individual
const validateField = (field: string): boolean => {
  // Lógica de validación
}

// Cálculo de progreso
const formProgress = computed(() => {
  let totalFields = Object.keys(formData.value).length
  const filledFields = Object.entries(formData.value)
    .filter(([_, value]) => value !== '').length
  return Math.round((filledFields / totalFields) * 100)
})
```

### 2. Componentes de Formulario

#### InputField.vue
- Campo de entrada de texto genérico
- Soporte para validación
- Iconos opcionales
- Estados de error

#### SelectField.vue
- Campo de selección desplegable
- Opciones dinámicas
- Validación integrada
- Diseño consistente

#### PhoneInput.vue
- Input especializado para teléfonos
- Formato internacional
- Validación de país
- Integración con vue-tel-input

#### DatePicker.vue
- Selector de fechas
- Validación de edad mínima
- Formato personalizado
- Cálculo automático de edad

#### RadioGroup.vue
- Grupo de botones de radio
- Opciones configurables
- Validación de selección
- Diseño accesible

### 3. ProgressBar.vue
- Visualización del progreso del formulario
- Animaciones suaves
- Diseño responsivo
- Integración con el estado del formulario

## 🔌 Servicios y APIs

### MainService.js

#### Métodos Disponibles

```javascript
class MainService {
  // Obtener lista de países
  async getPaises() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getPaises`);
    return response.json();
  }

  // Obtener departamentos de Perú
  async getDepartamentos() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getDepartamentos`);
    return response.json();
  }

  // Obtener provincias por departamento
  async getProvincias(departamentoId) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getProvincias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ departamentoId })
    });
    return response.json();
  }

  // Obtener distritos por provincia
  async getDistritos(provinciaId) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getDistritos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ provinciaId })
    });
    return response.json();
  }

  // Crear nuevo usuario
  async crearUsuario(usuario) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/crearUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(usuario)
    });
    return response.json();
  }
}
```

#### Manejo de Errores
```javascript
try {
  const data = await MainService.getDepartamentos();
  // Procesar datos
} catch (error) {
  console.error('Error:', error);
  toast.error('Ocurrió un error al cargar los datos', {
    position: 'top-right',
  });
}
```

## 🎯 Lógica de Negocio

### Validación de Formulario

#### Reglas de Validación
1. **Campos Obligatorios**: Todos los campos son requeridos
2. **Email**: Debe tener formato válido
3. **Documento**: Solo números permitidos
4. **Edad**: Solo números permitidos
5. **Geografía**: Solo para Perú (departamento, provincia, distrito)

#### Flujo de Validación
```typescript
const validateForm = (): boolean => {
  let isValid = true
  Object.keys(formData.value).forEach(field => {
    if (!validateField(field)) {
      isValid = false
    }
  })
  return isValid
}
```

### Lógica Geográfica

#### Condiciones de Mostrar Campos
- Los campos de departamento, provincia y distrito solo aparecen cuando:
  - Se selecciona Perú como país (country === '1')
  - Se han cargado los datos geográficos exitosamente

#### Carga Dinámica
```typescript
const getDepartments = async (country: string) => {
  if (country != '1' && country != '') {
    showExtraSelects.value = false;
    // Limpiar campos geográficos
    return;
  }
  // Cargar departamentos para Perú
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
}
```

### Tipografía
- **Familia**: Sistema de fuentes del navegador
- **Tamaños**: Escala de Tailwind CSS
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold)

### Espaciado
- Utiliza el sistema de espaciado de Tailwind CSS
- Consistente en toda la aplicación
- Responsivo para diferentes tamaños de pantalla

## 📱 Responsividad

### Breakpoints
```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Adaptaciones
- **Mobile First**: Diseño optimizado para móviles
- **Flexible Layout**: Uso de Flexbox y Grid
- **Imágenes Responsivas**: Adaptación automática
- **Tipografía Fluida**: Escalado automático

## 🔒 Seguridad

### Validación del Cliente
- Validación en tiempo real
- Sanitización de inputs
- Prevención de XSS básica

### Comunicación con APIs
- Uso de HTTPS (en producción)
- Headers de Content-Type apropiados
- Manejo de errores de red

## 🚀 Optimización

### Performance
- **Lazy Loading**: Componentes cargados bajo demanda
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Código optimizado para producción
- **Caching**: Headers de cache apropiados

### SEO
- Meta tags apropiados
- Estructura semántica HTML
- Accesibilidad mejorada

## 🧪 Testing

### Estrategia de Testing
- **Unit Tests**: Para funciones de validación
- **Component Tests**: Para componentes Vue
- **Integration Tests**: Para flujos completos
- **E2E Tests**: Para casos de uso críticos

### Herramientas Recomendadas
- **Vitest**: Para unit testing
- **Vue Test Utils**: Para component testing
- **Cypress**: Para E2E testing

## 📊 Monitoreo y Analytics

### Métricas a Seguir
- Tiempo de carga de página
- Tasa de conversión del formulario
- Errores de validación
- Performance de APIs

### Herramientas
- **Google Analytics**: Tracking de usuarios
- **Sentry**: Monitoreo de errores
- **Lighthouse**: Performance audits

## 🔄 CI/CD

### Pipeline Recomendado
1. **Lint**: Verificación de código
2. **Test**: Ejecución de tests
3. **Build**: Construcción de producción
4. **Deploy**: Despliegue automático

### Herramientas
- **GitHub Actions**: Automatización
- **Vercel/Netlify**: Despliegue
- **ESLint**: Linting de código

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Mejores Prácticas
- [Vue Style Guide](https://vuejs.org/style-guide/)
- [TypeScript Best Practices](https://github.com/typescript-eslint/typescript-eslint)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/guides/best-practices)

---

**Documentación Técnica ProBusiness** - Versión 1.0 