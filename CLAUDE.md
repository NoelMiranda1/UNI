# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official web portal for Universidad Nacional de Ingeniería (UNI), built with Next.js 14 App Router, TypeScript, and Tailwind CSS. The application is configured for static export (`output: 'export'` in next.config.js).

## Core Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Building & Production
npm run build        # Build for production (static export)
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Architecture & Structure

### Application Stack
- **Framework**: Next.js 14.1.3 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives following shadcn/ui patterns
- **State Management**: Zustand (see `lib/store.ts`)
- **Forms**: React Hook Form with Zod validation

### Key Architectural Decisions

1. **Static Export**: The app is configured for static site generation with `output: 'export'`
2. **Component Architecture**: UI components in `components/ui/` follow shadcn/ui patterns with composable primitives
3. **Path Aliases**: Use `@/` prefix for imports (configured in tsconfig.json)
4. **Font Loading**: Inter font is loaded via Next.js font optimization

### Project Structure

- `app/` - Next.js App Router pages and layouts
  - Dynamic routes use `[id]` folders with dedicated content components
  - Each route has its own `page.tsx` and optionally a content component
- `components/` - Reusable React components
  - `ui/` - Base UI components (Radix UI based)
  - Main layout components: navbar, footer, chatbot, hero, etc.
- `lib/` - Utilities and store configuration
- `services/` - API service layer (currently has api.ts and chat.ts deleted)
- `hooks/` - Custom React hooks

### Important Configuration

- **ESLint**: Configured with Next.js core-web-vitals and Prettier integration
- **TypeScript**: Strict mode enabled with bundler module resolution
- **Tailwind**: Custom configuration with animation utilities
- **Prettier**: Configured with single quotes, semicolons, and Tailwind plugin
- **Always response in spanish**
- **Always use Yarn never npm**

### Current Git Status

The repository has recently deleted `services/api.ts` and `services/chat.ts` files. These may need to be recreated if API functionality is required.

## Development Notes

- The chatbot component exists but its service layer has been removed
- Images are unoptimized due to static export configuration
- Development webpack caching is disabled to prevent ENOENT errors
- ESLint is set to ignore errors during builds