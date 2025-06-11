# 🎓 Universidad Nacional de Ingeniería - Portal Web

<div align="center">

![Logo UNI](public/logo-uni.svg)

**Portal web oficial de la Universidad Nacional de Ingeniería**

[![Next.js](https://img.shields.io/badge/Next.js-14.1.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 📖 Descripción

Este es el portal web oficial de la Universidad Nacional de Ingeniería (UNI), desarrollado con tecnologías modernas para brindar una experiencia de usuario excepcional. La plataforma incluye información institucional, oferta académica, noticias, eventos y un chatbot inteligente para asistencia estudiantil.

## ✨ Características Principales

- 🏠 **Página Principal Interactiva**: Hero section con carrusel de imágenes del campus
- 📰 **Sección de Noticias**: Últimas noticias y comunicados
- 📅 **Gestión de Eventos**: Calendario de eventos académicos y extracurriculares
- 🎥 **Contenido Multimedia**: Galería de videos y multimedia institucional
- 🤖 **Chatbot Inteligente**: Asistente virtual powered by OpenAI para consultas estudiantiles
- 📱 **Diseño Responsivo**: Optimizado para todos los dispositivos
- 🎨 **UI Moderna**: Interfaz elegante con componentes Radix UI y Tailwind CSS
- 🌐 **Navegación Intuitiva**: Estructura clara de información institucional

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14.1.3**: Framework de React con App Router
- **React 18.2.0**: Biblioteca de JavaScript para interfaces de usuario
- **TypeScript 5.4.2**: Superset tipado de JavaScript
- **Tailwind CSS 3.4.1**: Framework de CSS utilitario

### UI/UX
- **Radix UI**: Componentes primitivos accesibles
- **Lucide React**: Iconografía moderna
- **Tailwind CSS Animate**: Animaciones fluidas
- **Next Themes**: Soporte para temas

### Gestión de Estado y Datos
- **Zustand**: Gestión de estado ligera
- **Axios**: Cliente HTTP para APIs
- **Zod**: Validación de esquemas TypeScript
- **React Hook Form**: Gestión de formularios

### Utilidades
- **Date-fns**: Manipulación de fechas
- **ICS**: Generación de archivos de calendario
- **Class Variance Authority**: Gestión de variantes de clase

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** (versión 18.17 o superior)
- **npm** o **yarn** (recomendado npm)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/universidad-ingenieria.git
cd universidad-ingenieria
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Otras variables de configuración (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | 🚀 Inicia el servidor de desarrollo |
| `npm run build` | 🔨 Construye la aplicación para producción |
| `npm run start` | ▶️ Inicia el servidor de producción |
| `npm run lint` | 🔍 Ejecuta el linter de código |
| `npm run format` | ✨ Formatea el código con Prettier |

## 📁 Estructura del Proyecto

```
universidad-ingenieria/
├── 📁 app/                    # App Router de Next.js
│   ├── 📁 events/            # Página de eventos
│   ├── 📁 news/              # Página de noticias
│   ├── 📁 oferta-academica/  # Oferta académica
│   ├── 📁 organizacion/      # Organización institucional
│   ├── 📁 posgrado/          # Programas de posgrado
│   ├── 📁 quienes-somos/     # Información institucional
│   ├── 📁 recinto/           # Información del campus
│   ├── 📄 layout.tsx         # Layout principal
│   ├── 📄 page.tsx           # Página de inicio
│   └── 📄 globals.css        # Estilos globales
├── 📁 components/             # Componentes reutilizables
│   ├── 📁 ui/                # Componentes de UI base
│   ├── 📄 chatbot.tsx        # Chatbot inteligente
│   ├── 📄 hero.tsx           # Sección hero principal
│   ├── 📄 navbar.tsx         # Barra de navegación
│   ├── 📄 footer.tsx         # Pie de página
│   └── ...                   # Otros componentes
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utilidades y configuraciones
├── 📁 public/                # Archivos estáticos
├── 📁 services/              # Servicios y APIs
│   ├── 📄 api.ts            # Configuración de Axios
│   └── 📄 chat.ts           # Servicio del chatbot
├── 📄 next.config.js         # Configuración de Next.js
├── 📄 tailwind.config.ts     # Configuración de Tailwind
├── 📄 tsconfig.json          # Configuración de TypeScript
└── 📄 package.json           # Dependencias y scripts
```

## 🎯 Funcionalidades Principales

### 🏠 Página Principal
- **Hero Section**: Carrusel automático con imágenes del campus
- **Estadísticas**: Métricas importantes de la universidad
- **Acceso Rápido**: Enlaces directos a servicios frecuentes
- **Noticias Destacadas**: Últimas novedades institucionales
- **Eventos Próximos**: Calendario de actividades

### 🤖 Chatbot Inteligente
- Asistente virtual 24/7 para consultas estudiantiles
- Integración con OpenAI GPT para respuestas contextuales
- Manejo de rate limiting y reintentos automáticos
- Interfaz conversacional intuitiva

### 📱 Responsive Design
- Optimizado para dispositivos móviles, tablets y desktop
- Componentes adaptativos con Tailwind CSS
- Navegación móvil optimizada

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Configura las variables de entorno en el dashboard
3. Despliega automáticamente con cada push

### Opción 2: Build Manual

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## 🛠️ Desarrollo

### Agregar Nuevas Páginas

1. Crea una nueva carpeta en `app/`
2. Agrega un archivo `page.tsx` con tu componente
3. Actualiza la navegación en `components/navbar.tsx`

### Personalizar Estilos

- Modifica `tailwind.config.ts` para configuraciones globales
- Usa `app/globals.css` para estilos personalizados
- Componentes UI en `components/ui/` siguen el patrón shadcn/ui

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o consultas:

- 📧 Email: soporte@uni.edu.pe
- 🌐 Web: [www.uni.edu.pe](https://www.uni.edu.pe)
- 📱 Teléfono: +51 1 481-1070

---

<div align="center">

**Desarrollado con ❤️ para la Universidad Nacional de Ingeniería**

[![Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)

</div> 