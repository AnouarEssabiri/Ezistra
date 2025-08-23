# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Commands
```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js ESLint

# Alternative package managers
pnpm dev            # Use pnpm (recommended - lockfile present)
```

### Development Workflow
```bash
# Install dependencies
npm install
# OR
pnpm install

# Start development server
npm run dev
# OR  
pnpm dev

# Build and test production build
npm run build && npm run start
```

### Testing Individual Components
No specific test commands found - add testing framework if needed.

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI + shadcn/ui components
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **State Management**: React Context (AuthContext)
- **Build**: Next.js built-in bundling
- **Package Manager**: Both npm and pnpm supported (pnpm preferred)

### Project Structure
```
/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard interface
│   ├── documents/         # Document management
│   ├── form-filler/       # Smart form filling feature
│   ├── document-processor/# Document processing
│   ├── login/signup/      # Authentication pages
│   ├── mobile/            # Mobile-optimized experience
│   ├── profile-settings/  # User settings
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── globals.css        # Global styles & design system
├── components/
│   ├── ui/               # shadcn/ui component library
│   ├── AuthContext.tsx   # Authentication context
│   ├── Navigation.tsx    # Main navigation component
│   └── [shared components]
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

### Core Architecture Patterns

#### Authentication System
- Context-based auth state management via `AuthContext.tsx`
- Demo credentials: username="demo", password="password123"
- Global auth provider wraps entire app in `layout.tsx`
- Protected routes redirect unauthenticated users

#### Navigation & Routing
- Conditional navigation rendering based on auth status
- Mobile-first responsive design with separate mobile routes
- Loading states with navigation overlays
- Auto-redirect to mobile page for mobile users

#### Component Architecture  
- **shadcn/ui**: Pre-built accessible components in `components/ui/`
- **Design System**: CSS custom properties for theming in globals.css
- **Responsive Design**: Mobile-first with desktop navigation variants
- **State Management**: Local component state + Context for global auth

#### Data Architecture
This appears to be a **document management and form-filling SaaS platform** with:
- Personal information storage and management
- Document upload and categorization
- Smart form field mapping and auto-fill capabilities
- Activity tracking and dashboard analytics

### Key Features Implementation

#### Document Management (`/documents`)
- Grid/list view toggles
- File upload with categorization
- Tag-based organization
- Document preview and management

#### Form Filler (`/form-filler`)  
- Complex personal information management
- Field mapping system for form auto-fill
- Saved form configurations
- Multiple data categories (identity, education, medical, etc.)

#### Dashboard (`/dashboard`)
- Activity feed and statistics
- Quick actions and document access
- Storage usage tracking
- Reminder system

### Mobile Support
- Dedicated mobile routes (`/mobile`)
- Automatic mobile detection and redirection
- Responsive component variants
- Mobile-optimized WebView for forms

### Styling System
- **Tailwind CSS v4** with custom design system
- **CSS Custom Properties** for theming (light/dark modes supported)
- **shadcn/ui** design tokens
- **Consistent spacing/typography** via Tailwind utilities

### Configuration Files
- `next.config.mjs`: Disables TypeScript/ESLint build errors, unoptimized images
- `components.json`: shadcn/ui configuration (New York style, CSS variables)
- `tsconfig.json`: Standard Next.js TypeScript setup with path aliases
- `postcss.config.mjs`: Tailwind CSS v4 PostCSS plugin

## Development Notes

### Authentication
- Uses mock authentication with hardcoded demo credentials
- Replace `AuthContext.tsx` with real auth provider for production

### Database
- Currently uses hardcoded mock data throughout components
- Implement real database integration for production use

### Mobile Strategy  
- Separate mobile route structure for optimal mobile experience
- Consider PWA capabilities for document scanning/management

### Form Processing
- Smart field mapping system suggests integration with form parsing APIs
- Document processing features imply OCR or document analysis capabilities

### State Management
- Simple Context pattern for auth state
- Consider upgrading to Zustand or Redux Toolkit for complex state needs

### Testing
- No testing framework currently configured
- Consider adding Vitest + Testing Library for component testing
