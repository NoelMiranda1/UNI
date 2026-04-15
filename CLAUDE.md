# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portal web oficial de la Universidad Nacional de Ingeniería (UNI), construido con Next.js 14 App Router, TypeScript y Tailwind CSS. La aplicación consume datos de un CMS Payload desplegado en Railway (`uniapi.onmisales.software`).

## Comandos de Desarrollo

```bash
# Desarrollo
yarn dev          # Servidor de desarrollo en http://localhost:3000

# Build y Producción
yarn build        # Construir para producción
yarn start        # Iniciar servidor de producción

# Calidad de Código
yarn lint         # Ejecutar ESLint
yarn format       # Formatear con Prettier
```

## Arquitectura

### Stack Principal
- **Framework**: Next.js 14.1.3 con App Router
- **Lenguaje**: TypeScript con modo estricto
- **Estilos**: Tailwind CSS con animaciones personalizadas
- **UI**: Componentes Radix UI siguiendo patrones shadcn/ui
- **Estado**: Zustand (`lib/store.ts`)
- **Formularios**: React Hook Form + Zod
- **HTTP**: Axios con interceptores configurados

### Estructura del Proyecto

```
app/                    # Páginas Next.js App Router
├── [ruta]/[id]/       # Rutas dinámicas con componentes *-content.tsx
components/
├── ui/                # Componentes base shadcn/ui (Radix UI)
├── navbar.tsx         # Navegación principal
├── footer.tsx         # Pie de página
├── hero.tsx           # Sección hero con carrusel
├── chatbot.tsx        # Asistente virtual
services/              # Capa de servicios API
├── api.ts             # Cliente Axios base con interceptores
├── noticias.ts        # Servicio de noticias
├── eventos.ts         # Servicio de eventos
├── areas-conocimiento.ts
├── recintos.ts
lib/
├── config.ts          # Configuración de variables de entorno
├── store.ts           # Store Zustand (drawer state)
├── types.ts           # Tipos TypeScript compartidos
├── utils.ts           # Utilidades (cn para clases)
hooks/                 # Custom React hooks
```

### Patrón de Servicios API

Cada servicio en `services/` sigue este patrón:
```typescript
import api from './api';

class MiServicio {
  async getItems(params?: { page?: number; limit?: number }): Promise<Response> {
    const response = await api.get<Response>('/endpoint', { params });
    return response.data;
  }

  async getItemById(id: string): Promise<Item> {
    const response = await api.get<Item>(`/endpoint/${id}`);
    return response.data;
  }
}

export default new MiServicio();
```

### Patrón de Páginas con Carga

Las páginas que cargan datos deben usar `PageLoader`:
```typescript
import { PageLoader } from '@/components/ui/page-loader';

if (loading) {
  return <PageLoader message="Cargando información..." />;
}
```

## Configuración Importante

- **Path Aliases**: Usar `@/` para imports (ej: `@/components/ui/button`)
- **Imágenes Remotas**: Dominio permitido `uniapi.onmisales.software`
- **API Base URL**: `https://uniapi.onmisales.software/api`
- **ESLint**: Ignora errores durante builds

## Reglas de Desarrollo

- **Idioma**: Siempre responder en español
- **Package Manager**: Siempre usar Yarn, nunca npm
- **Componentes UI**: Solo usar componentes de `components/ui/` para crear páginas
- **Tipos**: Definir interfaces en `lib/types.ts` o en el servicio correspondiente
