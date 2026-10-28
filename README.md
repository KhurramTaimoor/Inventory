# CageMaster — ERP / Inventory UI Prototype

A **React-based ERP interface prototype** exploring the UI structure of sales, purchasing, inventory, ledger, and reporting workflows.

## What's implemented
- Dashboard shell with role-gated application routes
- Screens for customers, sales orders/invoices, purchasing, products, categories, and stock
- Reusable, schema-like form/table views for multiple administrative modules
- Search, print, and PDF-export interface controls
- Responsive dashboard design with UI translation and RTL-aware layout elements

## Tech stack
React 19 · JavaScript · Vite · React Router · Tailwind CSS · Lucide Icons · jsPDF · AOS

## Local setup
```bash
git clone https://github.com/KhurramTaimoor/Inventory.git
cd Inventory
npm install
npm run dev
```

## Code map
- `src/App.jsx` — routes and ERP modules
- `src/components/GenericPage.jsx` — reusable forms and tables
- `src/components/LedgerPage.jsx` — ledger UI
- `src/pages/DashboardHome.jsx` — dashboard overview
- `src/pages/AuthPage.jsx` — prototype login UI

## Important project status
**This repository is a UI prototype, not a production ERP.** Some tables and PDF exports use sample data; some buttons are illustrative. The current authentication flow includes client-side checks and demo credentials, which are **not secure** and must be replaced with server-side authentication and authorization before deploying or using real customer data.

## Engineering focus
Multi-module UI architecture · reusable components · routed dashboards · print/PDF UX · internationalization.

**Maintainer:** [Khurram Taimoor](https://github.com/KhurramTaimoor)
