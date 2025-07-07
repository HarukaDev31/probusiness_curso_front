# ProBusiness - Formulario de Registro

## 📋 Descripción del Proyecto

ProBusiness es una aplicación web desarrollada con Vue 3, TypeScript y Vite que proporciona un formulario de registro de usuarios con validación en tiempo real y integración con APIs externas para obtener datos geográficos.

## 🚀 Tecnologías Utilizadas

- **Vue 3** - Framework de JavaScript progresivo
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Vue3 Toastify** - Notificaciones toast
- **Lucide Vue Next** - Iconos modernos
- **Vue Final Modal** - Sistema de modales
- **Vue Tel Input** - Input para números telefónicos

## 📁 Estructura del Proyecto

```
probusiness_curso_front/
├── public/                 # Archivos públicos estáticos
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, logos)
│   ├── components/        # Componentes Vue
│   │   ├── form/         # Componentes de formulario reutilizables
│   │   │   ├── DatePicker.vue
│   │   │   ├── InputField.vue
│   │   │   ├── PhoneInput.vue
│   │   │   ├── RadioGroup.vue
│   │   │   └── SelectField.vue
│   │   ├── HelloWorld.vue
│   │   ├── ProgressBar.vue
│   │   └── RegistrationForm.vue
│   ├── services/          # Servicios para comunicación con APIs
│   │   └── main.service.js
│   ├── App.vue           # Componente principal
│   ├── main.ts           # Punto de entrada de la aplicación
│   └── style.css         # Estilos globales
├── package.json          # Dependencias y scripts
├── vite.config.ts        # Configuración de Vite
└── tailwind.config.js    # Configuración de Tailwind CSS
```

## 🎯 Funcionalidades Principales

### Formulario de Registro
- **Campos del formulario:**
  - Email (con validación de formato)
  - Teléfono (con formato internacional)
  - Tipo de documento (DNI, Pasaporte, Carné de Extranjería, Otro)
  - Número de documento
  - Nombre completo
  - Fecha de nacimiento
  - Género
  - Fuente de referencia
  - País
  - Departamento (solo para Perú)
  - Provincia (solo para Perú)
  - Distrito (solo para Perú)
  - Edad

### Validación en Tiempo Real
- Validación de campos obligatorios
- Validación de formato de email
- Validación de números (documento y edad)
- Cálculo automático de progreso del formulario

### Integración con APIs
- **Servicios disponibles:**
  - `getPaises()` - Obtiene lista de países
  - `getDepartamentos()` - Obtiene departamentos de Perú
  - `getProvincias(departamentoId)` - Obtiene provincias por departamento
  - `getDistritos(provinciaId)` - Obtiene distritos por provincia
  - `crearUsuario(usuario)` - Crea un nuevo usuario

### Características de UX/UI
- Diseño responsivo con Tailwind CSS
- Barra de progreso visual
- Notificaciones toast para feedback
- Elementos decorativos animados
- Fondo personalizado con imagen
- Iconos intuitivos de Lucide

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd probusiness_curso_front
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

6. **Previsualizar build de producción:**
   ```bash
   npm run preview
   ```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🎨 Componentes Principales

### RegistrationForm.vue
Componente principal que maneja todo el formulario de registro, incluyendo:
- Estado del formulario
- Validaciones
- Integración con servicios
- Manejo de errores
- Cálculo de progreso

### Componentes de Formulario
- **InputField.vue** - Campo de entrada de texto genérico
- **SelectField.vue** - Campo de selección desplegable
- **RadioGroup.vue** - Grupo de botones de radio
- **PhoneInput.vue** - Input especializado para teléfonos
- **DatePicker.vue** - Selector de fechas

### ProgressBar.vue
Componente que muestra el progreso de llenado del formulario.

## 🔧 Configuración de APIs

El proyecto utiliza un servicio principal (`MainService`) que maneja todas las comunicaciones con el backend:

```javascript
// Ejemplo de uso del servicio
import MainService from '../services/main.service'

// Obtener departamentos
const departamentos = await MainService.getDepartamentos()

// Crear usuario
const usuario = await MainService.crearUsuario(userData)
```

## 🎯 Características Especiales

### Lógica Geográfica
- Los campos de departamento, provincia y distrito solo aparecen cuando se selecciona Perú como país
- Carga dinámica de datos geográficos según la selección del usuario

### Validación Inteligente
- Validación en tiempo real sin bloquear la experiencia del usuario
- Mensajes de error contextuales
- Cálculo automático de edad basado en fecha de nacimiento

### Diseño Responsivo
- Adaptable a diferentes tamaños de pantalla
- Optimizado para dispositivos móviles y desktop

## 🚀 Despliegue

### Para desarrollo local:
```bash
npm run dev
```

### Para producción:
```bash
npm run build
npm run preview
```

## 📝 Notas de Desarrollo

- El proyecto utiliza Vue 3 con Composition API
- TypeScript está configurado para proporcionar mejor experiencia de desarrollo
- Tailwind CSS se utiliza para el diseño y estilos
- Las notificaciones se manejan con vue3-toastify
- Los iconos provienen de Lucide Vue Next

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**ProBusiness** - Formulario de Registro Moderno y Responsivo
