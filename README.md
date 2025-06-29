# Resume Builder

Resume Builder is a modern, full-stack web application that empowers users to create, customize, and download professional resumes with ease. Built with React, TypeScript, Node.js, Express, and MongoDB, it features secure authentication, role-based access (user & admin), a beautiful UI, and an integrated AI-powered chatbot for instant assistance.

## ✨ Features

- **Beautiful, customizable resume templates**
- **Secure authentication** with Argon2 password hashing
- **Role-based access control** (User & Admin)
- **Admin dashboard** for user management 
- **Download resumes as polished PDFs** with loading feedback
- **AI-powered chatbot** for instant help and resume tips


## 🛠️ Tech Stack & Popular Libraries

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
  - **UI Components:** shadcn/ui, Lucide React (icons)
  - **Form Validation:** react-hook-form, zod
  - **Routing:** react-router-dom
  - **HTTP Requests:** axios
- **Backend:** Node.js, Express, MongoDB, Argon2
- **AI:** Botpress integration for chatbot support
- **Architecture:** Microservice Architecture for Backend
- **PDF Generation:** Puppeteer (for server-side PDF downloads)
- **Caching & Performance:** Redis (for user caching)
- **Logging:** Winston (for robust logging)
- **Validation:** Joi (for input validation)

## 🚀 Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/Ayush-Dai/Resume-Builder.git
   cd Resume-Builder
   ```
2. **Install dependencies**
   - _For each backend service:_
     ```sh
     cd backend/Auth-Service
     npm install
     cd ../api-gateway
     npm install
     cd ../AdminPanel-Service
     npm install
     cd ../pdf-downloader
     npm install
     ```
   - For frontend:
     ```sh
     cd ../../frontend
     npm install
     ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both backend and frontend (if provided) and fill in your configuration.
4. **Run the backend and frontend servers**
   - Backend:
     ```sh
     npm run dev (for all services in separate terminal)
     ```
   - Frontend:
     ```sh
     npm run dev
     ```
5. **Open your browser** and go to `http://localhost:5173` to start building your resume!

## 👨‍💻 Developer

Built by [Ayush Bishwakarma](https://github.com/Ayush-Dai) with ❤️

## 📄 License

This project is open source and available under the [MIT License](LICENSE).