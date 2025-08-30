# 🏛️ GovConnect
**A digital platform bridging Citizens & Government**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

## ✨ Key Features

- 🔐 **Authentication**: JWT-based with bcrypt password hashing
- 👥 **Dual Portals**: Separate interfaces for Citizens & Government Departments
- 🎨 **Modern UI/UX**: Glassmorphism design with responsive layout
- 📊 **Project Tracking**: Visual progress indicators and status updates
- 💬 **Feedback System**: Citizen-government communication platform
- 🔒 **Security**: Role-based access control and department verification

## 💻 Tech Stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS** (Glassmorphism design)
- **React Router** (Navigation)
- **Lucide React** (Icons)

### Backend
- **Node.js** + Express.js
- **MongoDB** + Mongoose
- **JWT** Authentication
- **bcrypt** Password hashing

## 🛠️ Setup Guide

### **Prerequisites**
- **Node.js 18+** ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use Homebrew: `brew install mongodb-community`)
- **Git** for cloning repository

### **Installation Steps**

#### **Step 1: Install & Start MongoDB**
```bash
# Install MongoDB (Mac)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### **Step 2: Clone & Setup Project**
```bash
# Clone repository
git clone https://github.com/amritansh-mishra/Gov-Connect
cd Gov-Connect

# Setup Backend (Terminal 1)
cd Backend
npm install
echo "PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=hackathon-secret-2024
MONGODB_URI=mongodb://127.0.0.1:27017/govconnect" > .env
npm run dev

# Setup Frontend (Terminal 2)
cd Frontend
npm install --legacy-peer-deps
echo "VITE_API_BASE_URL=http://localhost:4000" > .env
npm run dev
```

#### **Step 3: Verify Setup**
- **Backend**: http://localhost:4000/health (should show "Server is running!")
- **Frontend**: http://localhost:5173 (should show GovConnect homepage)

## 🔑 Login & Usage Guide

### **Demo Credentials (Quick Start)**

#### **Citizen Account**
- **Username**: `demo_citizen`
- **Password**: `citizen123`

#### **Department Account**
- **Username**: `demo_department`
- **Password**: `dept123`
- **Department Code**: `GOVDEPT2024`

#### **OTP Verification**
- **OTP Code**: `123456` (if prompted during registration)

### **Login Steps**
1. Visit http://localhost:5173
2. Click **"Login"** button
3. Enter credentials above
4. Click **"Sign In"**
5. ✅ Access your dashboard

### **Creating New Accounts**

#### **Citizen Signup**
1. Click **"Sign Up"** → Fill form (username, email, password)
2. Click **"Create Account"** → ✅ Ready to login

#### **Department Signup**
1. Click **"Sign Up"** → Select **"Government Department"** tab
2. Complete multi-step form (department info, contact details)
3. Enter department code (min 6 characters)
4. Click **"Create Department Account"** → ✅ Ready to login

## 🏃‍♂️ Demo Flow (5 Minutes)

1. **Start**: Run backend + frontend servers
2. **Login**: Use demo credentials
3. **Explore**: Navigate citizen/department dashboards
4. **Test**: View projects, submit feedback
5. **Switch**: Try both user types

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails | Run `npm install --legacy-peer-deps` |
| Port 4000 in use | `lsof -ti:4000 \| xargs kill -9` |
| MongoDB error | `brew services start mongodb-community` |
| Frontend won't load | Check backend is running on port 4000 |

## 🚀 Future Enhancements

- 🔔 **Real-time Notifications**: WebSocket-based live updates
- 🤖 **AI Chatbot**: Intelligent citizen assistance
- 🔗 **Blockchain Verification**: Document authenticity
- 🌍 **Multilingual Support**: Hindi, English, regional languages
- 📱 **Mobile App**: Native iOS/Android applications

---

**🏛️ Empowering citizens, enabling departments - Building the future of digital governance.**

