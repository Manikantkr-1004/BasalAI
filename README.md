# Basal AI - Task Management System

## Project Overview
Basal AI is a full-stack task management system designed to create, manage, and track tasks with features like authentication, task prioritization, and status updates.

![home](https://github.com/user-attachments/assets/bc204ecd-12e9-46de-bac8-8a88df3ca3f2)

### Frontend
- **Framework**: Vite + React.js
- **State Management**: Redux
- **Routing**: React Router DOM
- **Deployment**: [Netlify](https://basalai.netlify.app)

### Backend
- **Framework**: Node.js + Express.js
- **Database**: MongoDB
- **Deployment**: [Render](https://basalai.onrender.com)

---

## Features
- **User Authentication**: Secure login and registration with cookies.
- **Task Management**:
  - Create, update, delete, and retrieve tasks.
  - Filter and sort tasks by status, priority, and creation date.
---

## How to Use

### Frontend
Access the frontend here: [Basal AI Frontend](https://basalai.netlify.app)

### Backend
API Base URL: [Basal AI Backend](https://basalai.onrender.com)

---

## API Routes

### Authentication
- `POST /register`: User registration
- `POST /login`: User login

### Task Management
- `GET /tasks`: Get tasks with filters, sorting, and pagination
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

---

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Manikantkr-1004/BasalAI.git

2. **For Frontend**:
   ```bash
   cd Frontend
   npm install
   Inside src/Redux/userReducer folder => go to action file => replace API url with yours running backend API URL
   npm run dev

3. **For Backend**:
   ```bash
   cd Backend
   npm install
   Put your MONGOURL in .env file
   npm run dev


## Disclaimer
**Use Chrome Browser Only:** Since the frontend and backend are deployed on different domains, authentication using cookies may not work on Safari or other browsers due to CORS and browser restrictions.
