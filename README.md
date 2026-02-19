# HRMS Lite – Role-Based Employee & Attendance Management System

## 🔹 Project Overview
HRMS Lite is a full-stack web application developed using Django REST Framework and React (Vite) to manage employees and attendance with Role-Based Access Control (RBAC).  
The system supports three roles: Admin, HR, and Employee, each with different permissions for managing employee records and attendance.

The application is fully deployed with a live frontend (Vercel) and backend API (Render) connected to a PostgreSQL database.

---

## 🌐 Live Application
- Frontend (Vercel): https://hrmslitebackendfinal.vercel.app/
- Backend API (Render): https://hr-4lye.onrender.com/api/
- GitHub Repository: https://github.com/Kishorui/Hr

---

## 🛠️ Tech Stack Used

### Frontend
- React (Vite)
- JavaScript (ES6)
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)
- PostgreSQL (Production)
- SQLite (Local Development)

### Deployment
- Frontend Hosting: Vercel
- Backend Hosting: Render
- Database: Render PostgreSQL
- Version Control: GitHub

---

## ✨ Key Features
- User Signup & Login with JWT Authentication
- Role Selection (Admin / HR / Employee)
- Role-Based Access Control (RBAC)
- Employee Management (Add/Delete)
- Attendance Management
- Dashboard with protected routes
- Secure API with token authentication
- Production deployment with PostgreSQL database

---

## 🔐 Role-Based Functionalities

### 👑 Admin
- Add Employee ✅
- Delete Employee ✅
- Mark Attendance ✅
- View All Attendance ✅

### 🧑‍💼 HR
- Add Employee ✅
- Mark Attendance ✅
- View Attendance ✅
- Delete Employee ❌ (Permission Restricted)

### 👨‍💻 Employee
- View Own Attendance Only ✅
- Add Employee ❌
- Delete Employee ❌
- Mark Attendance ❌

UI buttons are dynamically hidden based on user role.

## 📁 Project Structure
Hr/
├── hrms-lite-frontend-final/ # React Frontend (Vite)
├── hrms_lite_backend_final/ # Django Backend (DRF)
└── README.md


## ⚙️ Steps to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Kishorui/Hr.git
cd Hr

2️⃣ Backend Setup (Django)
cd hrms_lite_backend_final
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/

3️⃣ Frontend Setup (React + Vite)
cd hrms-lite-frontend-final
npm install
npm run dev


Frontend runs at:

http://127.0.0.1:5173/

🔌 API Configuration

Update API base URL in:

src/api/api.js


For local development:

http://127.0.0.1:8000/api/


For production:

https://hr-4lye.onrender.com/api/

🗄️ Database Configuration

Local Environment: SQLite

Production Environment: PostgreSQL (Render Managed Database)

Environment variables used for secure database connection

⚠️ Assumptions & Limitations

Role is assigned during signup and stored in UserProfile model

Email is used to map employee attendance for Employee role

Basic validation implemented (no advanced validation library)

Free Render hosting may cause cold start delays (first API call slow)

No email verification or password reset functionality (can be extended)

Designed for single organization HR management

🚀 Deployment Details

Frontend deployed on Vercel (Vite build)

Backend deployed on Render using Gunicorn

PostgreSQL used as live production database

CORS enabled for frontend-backend communication

Environment variables configured on Render


