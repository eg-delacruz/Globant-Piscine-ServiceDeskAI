# 🛠️ Service DeskAI: Glober Office Management

[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/) 
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Redux-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)](https://www.mongodb.com/)

**Service DeskAI** is a mobile-first issue-tracking solution designed for the fictional office "Glober." It allows employees to report infrastructure problems, manage tickets through their lifecycle, and maintain office facilities with ease. Built from scratch in one week as part of the Globant Piscine challenge.

---

## 📱 User Interface Walkthrough

Service DeskAI is designed with a mobile-first approach, ensuring a smooth experience for field staff and office managers alike.

### 1. Secure Access
Users start with a secure, JWT-authenticated login screen, responsive to any device size.

![Login Screen - Secure JWT Authentication](https://i.imgur.com/BaLUqMS.png)
<br>

### 2. The Dashboard (Standard & Service Desk View)
Once logged in, users see a clear overview of tickets relevant to their role, allowing for quick tracking and status updates.

![User Dashboard - Ticket Tracking](https://i.imgur.com/L52XMFY.png)
<br>

### 3. Admin Controls
Administrators have access to a dedicated panel for managing offices, users, and viewing system-wide data.

![Admin Panel - System Overview](https://i.imgur.com/mF149Xt.png)
<br>

---

## 🚀 Key Features

* **🛡️ Secure Authentication:** Full JWT implementation with role-based access control (RBAC).
* **📸 Rich Reporting:** Support for media uploads (photos) to document damaged items.
* **📱 Mobile-First Design:** Fully responsive UI aligned with WCAG AA accessibility standards.
* **🔄 Ticket Lifecycle:** Real-time status updates (Open → In Progress → Closed).
* **🏗️ Enterprise Ready:** Fully containerized environment using Docker and Docker Compose.

---

## 🏗️ Architecture & Stack



| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Redux (State Management), CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (NoSQL) |
| **DevOps** | Docker, Docker Compose |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |

---

## 👥 User Roles & Permissions

| Role | Permissions |
| :--- | :--- |
| **Standard User** | Submit new tickets, upload photos of damage, and track their own reports. |
| **Service Desk** | Triage incoming tickets, change status, open chats with users, and close tickets. |
| **Admin** | Create/Manage users, add new offices, and view high-level analytics and reports. |

---

## 🛠️ Installation & Setup

### **Prerequisites**
Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### **First Time Setup**

1.  **Clone the repository:**

    git clone [https://github.com/eg-delacruz/Globant-Piscine-ServiceDeskAI](https://github.com/eg-delacruz/Globant-Piscine-ServiceDeskAI)
    cd Globant-Piscine-ServiceDeskAI
2.  **Configure Environment:**
    Create a `.env` file in the root directory and copy the content from `.env.example`.
3.  **Launch with Docker:**
    docker-compose up --build -d
4.  **Access the App:**
    The database will automatically seed. Open your browser at:
    👉 **`http://localhost:5173`**

---

## 🔑 Test Credentials

Once the database is seeded, you can use the following accounts to test the different role-based features:

| Role | Email | Password | What to test |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `SuperPassword123` | Create a new user or a new office location. |
| **Service Desk** | `service_desk_user@example.com` | `service_desk_pass` | Update a ticket status or close a pending report. |
| **Standard** | `standard_user@example.com` | `standard_pass` | Create a new ticket and upload an image. |

---

## 📂 Repository Structure

```bash
.
├── backend/           # Express API, JWT Middleware, Mongoose Models
├── frontend/          # React + Redux source code (Vite)
├── uploads/           # Storage for user-uploaded images
├── seed_images/       # Assets for initial database seeding
└── docker-compose.yml # Container orchestration