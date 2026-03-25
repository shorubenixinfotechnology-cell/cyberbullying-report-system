# SafeReport - Anonymous Cyberbullying Report System

SafeReport is a secure, anonymous platform designed to help victims of cyberbullying report incidents without fear of exposure. The system provides a streamlined reporting process, incident tracking, and an administrative dashboard for case management.

## 🚀 Features

- **Anonymous Reporting**: Submit detailed incidents including category, date, location, and evidence without revealing your identity.
- **Secure Incident Tracking**: Receive a unique tracking ID to monitor the status of your report.
- **Admin Dashboard**: A centralized portal for administrators to review, manage, and investigate reports.
- **Modern UI/UX**: Premium, responsive design with support for both light and dark modes.
- **Privacy First**: No tracking of IP addresses or personal device information during the reporting process.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and shared logic.
- `public/`: Static assets like icons and images.
- `styles/`: Global styles and Tailwind configuration.

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or pnpm

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use).

### Admin Access
- **URL**: `/admin`
- **Demo Password**: `admin123`

## 🛡️ Privacy & Security
SafeReport uses an in-memory database for the demonstration version. In a production environment, it is designed to be integrated with secure databases like Supabase or Neon to ensure encrypted data storage.

## 📄 License
This project is for demonstration purposes. All rights reserved.
