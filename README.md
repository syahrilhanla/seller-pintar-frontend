# SellerPintar Frontend by Syahril Hanla

## 🔗 [Live Demo](https://sellerpintar-frontend-syahril.vercel.app)

## 📝 Demo Description

This project was developed as a take-home test assignment for the Frontend Web Developer role at SellerPintar Digital Asia. The entire application was built over 2 days period from Monday night to Wednesday night (June 2025). Please kindly 
review this repo and demo. Since I was late to notice the Glints chat (Monday), thus this project still quiet messy even for my standard. I hope we'd meet on live interview session, even just to chat, connect, and kindly know each others. 

Warm regards. Syahril Hanla.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Components](#components)
- [Pages & Routes](#pages--routes)
- [Styling](#styling)
- [Rich Text Editor](#rich-text-editor)
- [Image Uploads](#image-uploads)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🌟 Overview

Seller Pintar Frontend is a content management system built with Next.js 15 that allows users to create, view, and manage articles. The application includes role-based authentication (admin/user), article management, category management, and a rich text editor for content creation.

## ✨ Features

- **Authentication & Authorization**
  - Role-based access control (admin/user)
  - Secure login and session management
  - Protected routes based on user roles

- **Article Management**
  - Create, read, update, and delete articles
  - Rich text editing capabilities with TipTap
  - Article filtering and pagination
  - Article preview before publishing

- **Category Management**
  - Admin can create, update, and delete categories
  - Articles can be associated with categories

- **Admin Dashboard**
  - Manage articles and categories

## 🛠️ Tech Stack (Keeping it minimum outside of mandatory stacks)

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router + [usehooks-ts](https://usehooks-ts.com)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **Rich Text Editor**: [TipTap](https://tiptap.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── admin/            # Admin dashboard pages
│   ├── article/          # Article pages
│   ├── login/            # Authentication pages
│   ├── profile/          # User profile pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── AdminArticle/     # Article management components
│   ├── Article/          # Article display components
│   ├── Auth/             # Authentication components
│   ├── Category/         # Category management components
│   ├── Navbar/           # Navigation components
│   ├── tiptap-icons/     # Icons for rich text editor
│   ├── tiptap-ui/        # UI components for rich text editor
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # SCSS styles
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/syahrilhanla/seller-pintar-frontend.git
   cd seller-pintar-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🔐 Authentication

The application uses role-based authentication stored in localStorage. The `AuthGuard` component handles route protection based on user roles:

- **Admin**: Has access to admin dashboard, article management, category management, and all user features
- **User**: Can view articles and see their profile

## 🧩 Components

### Key Components

- **ArticleRichTextEditor**: TipTap-based rich text editor for creating and editing article content
- **AdminArticleForm**: Form for creating and editing articles with validation
- **ArticleCard**: Display card for articles in list view
- **PaginationComponent**: Reusable pagination with ellipsis for long page lists
- **Navbar**: Main navigation component with dropdown for user actions
- **AuthGuard**: Protection for routes based on authentication status and user role

## 📄 Pages & Routes

- `/` - Home page
- `/login` - User login
- `/article` - Article listing
- `/article/[id]` - Article detail view
- `/profile` - User profile
- `/article/blob/preview` - Article preview for admin
- `/admin` - Admin dashboard
- `/admin/article-form` - Article creation/editing
- `/admin/category` - Category management
- `/admin/profile` - Admin profile

## 📝 Rich Text Editor

The TipTap editor provides rich text editing capabilities:
- Text formatting (bold, italic, headers)
- Lists (ordered and unordered)
- Text alignment (still buggy with menu buttons, works just fine with shortcuts)
- Custom toolbar with intuitive icons

## 🖼️ Image Uploads

- Image preview before upload
- Integration with S3 for storage
- Support for various image formats

## 🚢 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```