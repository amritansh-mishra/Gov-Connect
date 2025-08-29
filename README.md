# 🏛️ GovConnect - Government Digital Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive digital platform designed to bridge the gap between government departments and citizens, providing transparent communication, project tracking, and efficient service delivery through modern web technologies.

## ✨ Features

### 🔐 **Authentication & Security**
- **JWT-based authentication** with bcrypt password hashing
- **Dual user types**: Citizens and Government Departments
- **Email OTP verification** for enhanced security
- **Department access codes** for authorized personnel
- **Role-based access control** with secure permissions

### 👥 **User Management**
- **Citizen Portal**: Access government services, submit feedback, track projects
- **Department Portal**: Manage projects, track progress, engage with citizens
- **Multi-step registration** for department users with comprehensive information
- **User profile management** with secure data handling

### 🎨 **Modern UI/UX**
- **Glassmorphism design** with backdrop blur effects and transparency
- **Responsive layout** optimized for all devices and screen sizes
- **Animated backgrounds** with floating orbs and smooth transitions
- **Professional government-appropriate styling** with modern aesthetics
- **Interactive elements** with hover effects and micro-animations

### 📱 **Frontend Technologies**
- **React 18** with modern hooks and functional components
- **Vite** for fast development and optimized building
- **Tailwind CSS** for utility-first styling and responsive design
- **Lucide React** for beautiful, consistent icons
- **React Router** for seamless single-page application navigation

### 🚀 **Backend Architecture**
- **Node.js** with Express.js framework for robust API development
- **MongoDB** with Mongoose ODM for flexible data persistence
- **Modular structure** with separate routes, controllers, and middleware
- **RESTful API** design with proper error handling and validation
- **Environment-based configuration** for different deployment stages

## 🏗️ System Architecture

### **Frontend Structure**
```
Frontend/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── LoginForm.jsx            # Enhanced login with glassmorphism
│   │   ├── SignupForm.jsx           # Citizen registration with OTP
│   │   ├── DepartmentSignupForm.jsx # Multi-step dept registration
│   │   ├── Header.jsx               # Navigation header component
│   │   ├── Sidebar.jsx              # User-specific navigation
│   │   ├── StatsCard.jsx            # Dashboard statistics display
│   │   └── QuickActions.jsx         # Quick action buttons
│   ├── pages/                       # Main application views
│   │   ├── Landing.jsx              # Beautiful homepage with features
│   │   ├── Dashboard.jsx            # Department dashboard
│   │   ├── CitizenDashboard.jsx     # Citizen portal interface
│   │   ├── ProjectsDirectory.jsx    # Project listings and details
│   │   ├── CitizenFeedback.jsx      # Feedback submission system
│   │   ├── Analytics.jsx            # Data visualization
│   │   └── Settings.jsx             # User preferences
│   ├── api.js                       # Centralized API client
│   ├── firebase.js                  # Firebase configuration
│   └── i18n.js                     # Internationalization setup
```

### **Backend Structure**
```
Backend/
├── src/
│   ├── models/                      # MongoDB schemas
│   │   └── User.js                 # User model with dept fields
│   ├── controllers/                 # Business logic
│   │   ├── authController.js       # Authentication logic
│   │   ├── projectController.js    # Project management
│   │   └── feedbackController.js   # Feedback handling
│   ├── routes/                     # API endpoints
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── projectRoutes.js        # Project endpoints
│   │   └── feedbackRoutes.js       # Feedback endpoints
│   ├── middleware/                  # Request processing
│   │   └── authMiddleware.js       # JWT verification
│   ├── app.js                      # Express app configuration
│   ├── db.js                       # MongoDB connection
│   └── server.js                   # Server entry point
├── .env                            # Environment variables
└── package.json                    # Dependencies and scripts
```

## 🔧 Technical Specifications

### **Authentication Flow**
1. **User Registration**: Email validation + OTP verification
2. **Login Process**: Username/password + department code (if applicable)
3. **Token Management**: JWT tokens with 2-hour expiration
4. **Route Protection**: Middleware-based access control
5. **Session Persistence**: Local storage with automatic token refresh

### **Database Schema**
- **User Collection**: Extended with department-specific fields
  - Basic info: username, email, password hash
  - Department fields: department name, contact person, phone, address
  - Business data: employee count, budget, description
- **Project Collection**: Government project information
- **Feedback Collection**: Citizen feedback and ratings

### **API Endpoints**
```
Authentication:
├── POST /api/auth/register          # User registration
├── POST /api/auth/login            # User authentication
└── GET  /api/auth/me              # User profile (protected)

Projects:
├── GET  /api/projects              # Project listings
└── GET  /api/projects/:id          # Project details

Feedback:
├── GET  /api/feedback              # Get feedback (protected)
└── POST /api/feedback              # Submit feedback (protected)

Health:
└── GET  /health                    # Service health check
```

## 🎯 Use Cases

### **For Citizens**
- **Project Access**: View government project information and progress
- **Feedback System**: Submit ratings and comments on services
- **Progress Tracking**: Monitor project milestones and timelines
- **Document Access**: Download reports and official documents
- **Service Discovery**: Find available government services

### **For Government Departments**
- **Project Management**: Manage project portfolios and timelines
- **Budget Tracking**: Monitor expenditures and budget allocations
- **Citizen Engagement**: Respond to feedback and concerns
- **Analytics**: Generate reports and performance metrics
- **Inter-department Coordination**: Collaborate with other agencies

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** 18+ and npm
- **MongoDB** 6+ running locally or cloud instance
- **Modern web browser** with ES6+ support
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GovConnect
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Configure environment variables
   # Edit .env file with your settings
   
   # Start development server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Configure API base URL
   # VITE_API_BASE_URL=http://localhost:4000
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:4000
   - **Database**: MongoDB connection established

### **Environment Configuration**

#### **Backend (.env)**
```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=mongodb://127.0.0.1:27017/govconnect
```

#### **Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:4000
```

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 10 salt rounds
- **JWT Tokens**: Secure session management with expiration
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation and sanitization
- **Rate Limiting**: Protection against brute force attacks
- **Environment Variables**: Secure configuration management

## 🌟 Design Philosophy

- **Accessibility First**: Usable by all citizens regardless of ability
- **Government Appropriate**: Professional, trustworthy, and official appearance
- **Modern Aesthetics**: Engaging user experience with contemporary design
- **Performance Focused**: Fast loading, responsive, and efficient
- **User Centric**: Designed around citizen and department needs
- **Scalable Architecture**: Built to handle growth and expansion

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices and touch interfaces
- **Cross Platform**: Works seamlessly across all devices and browsers
- **Progressive Enhancement**: Core functionality available without JavaScript
- **Accessibility**: WCAG 2.1 AA compliance for inclusive design

## 🧪 Testing

### **Backend Testing**
```bash
cd Backend
npm test                    # Run test suite
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report
```

### **Frontend Testing**
```bash
cd Frontend
npm test                   # Run test suite
npm run test:watch        # Watch mode for development
npm run build             # Production build test
```

## 📦 Deployment

### **Production Build**
```bash
# Frontend
cd Frontend
npm run build
npm run preview

# Backend
cd Backend
npm run build
npm start
```

### **Docker Deployment**
```bash
# Build and run with Docker
docker-compose up -d

# Or build individual containers
docker build -t govconnect-frontend ./Frontend
docker build -t govconnect-backend ./Backend
```

## 🔄 API Documentation

### **Authentication Headers**
```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

### **Response Format**
```json
{
  "status": "success",
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### **Error Handling**
```json
{
  "status": "error",
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## 🚧 Development

### **Code Style**
- **ESLint** configuration for consistent code quality
- **Prettier** for automatic code formatting
- **Conventional Commits** for commit message standards
- **TypeScript** support for type safety (optional)

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug description"
```

## 📈 Future Enhancements

- **Real-time Notifications**: WebSocket-based live updates
- **Advanced Analytics**: Machine learning insights and predictions
- **Mobile Application**: Native iOS and Android apps
- **Multi-language Support**: Internationalization for diverse populations
- **Government Integration**: APIs for existing government systems
- **Blockchain Verification**: Document authenticity and verification
- **AI Chatbot**: Intelligent citizen assistance
- **Voice Interface**: Accessibility through voice commands

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### **Development Setup**
```bash
# Install development dependencies
npm install -g nodemon concurrently

# Run both frontend and backend
npm run dev:full
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Government Digital Service** for inspiration and best practices
- **Open Source Community** for the amazing tools and libraries
- **Design System** contributors for the beautiful UI components
- **Security Researchers** for helping improve our security posture

## 📞 Support

- **Documentation**: [Wiki](wiki-link)
- **Issues**: [GitHub Issues](issues-link)
- **Discussions**: [GitHub Discussions](discussions-link)
- **Email**: support@govconnect.gov

---

**GovConnect** represents the future of government-citizen interaction, combining modern web technologies with secure, scalable architecture to create a transparent and efficient digital government ecosystem. 

*Building bridges between citizens and government through technology.* 🏛️✨

---

<div align="center">
  <p><strong>Made with ❤️ for better government services</strong></p>
  <p><em>Empowering citizens, enabling departments</em></p>
</div>
