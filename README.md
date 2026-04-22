# Parth Patel Portfolio

A professional, dynamic portfolio website built with Next.js, Tailwind CSS, and MongoDB.

## 🚀 Features
- **Dynamic Content**: Managed via a custom Admin Panel.
- **Resilient Database**: Automatic fallback to local JSON storage if MongoDB is unavailable.
- **Modern UI**: Clean, dark-themed design with smooth animations and custom cursor.
- **Image Management**: Integrated Cloudinary support for easy image/video uploads.

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ 
- MongoDB (Optional, local fallback provided)

### 2. Environment Setup
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```
Fill in your MongoDB URI, JWT Secret, and Cloudinary credentials.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔐 Admin Panel
Access the management dashboard at `/admin`.
- **Default Credentials**: Check your `.env.local` for `ADMIN_ID` and `ADMIN_PASS`.
- **Features**: Manage projects (featured selection), biography, skills, and client reviews.

## 📁 Project Structure
- `src/app`: Next.js App Router (Pages and API)
- `src/components`: Reusable UI components
- `src/lib`: Database logic and data fetching helpers
- `data/`: Local storage fallback for offline development

## 📜 License
MIT
