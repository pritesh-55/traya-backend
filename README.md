# 🧠 Traya Health  – Personalized Hair Treatment Platform

## 📌 Description
This is a scalable backend system for **Traya** a health-tech platform that offers personalized solutions for hair loss. The system mimics the real-world flow from onboarding a customer via a detailed hair test to generating a public report and recommending product purchases.

---

## 📦 Tech Stack
| Category          | Technologies                          |
|-------------------|---------------------------------------|
| **Core**          | Node.js (v20.13.1), Express.js        |
| **Database**      | MongoDB (Atlas), Mongoose ODM         |
| **Storage**       | Cloudinary (Scalp Images)             |
| **APIs**          | RESTful JSON APIs                     |

---

## 🚀 Features Implemented

- ✅ **Customer Hair Test Submission**
  - Capture personal details, hair condition, internal health, and scalp images
- ✅ **Public Report Generation**
  - Shareable link of Hair Test Report including root cause analysis, estimated recovery time, product recommendations, and pricing
- ✅ **Product Ordering System**
  - Full flow from recommendations to placing an order with shipping and payment info
- ✅ **Cloudinary Upload Integration**
  - Secure, scalable image uploads and storage for scalp photos
- ✅ **Data Validation**
  - Server-side validation and enums to prevent invalid or inconsistent input
- ✅ **Handling Consistency**
  - All writes for Hair Test, Reports and Orders are atomic & safely rollback on failure
- ✅ **Modular and Scalable Codebase**
  - Easily extendable to microservices, third-party integration, or real-time chat with coach

---

## 📁 Project Structure
```bash
.
├── config/                # Database & Cloudinary config
├── controllers/           # Business logic for each module
├── models/                # Mongoose schemas
├── routes/                # API route definitions
├── utils/                 # Utility functions
├── middlewares/           # Error handling, validations
├── services/              # Customized business logic for product recommendations
├── scripts/               # Script to seed Sample data for Products
├── server.js              # Server entry point
├── .env.example           # Example environment variables
├── README.md              # This file
└── package.json

```
---

## 🛠 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/pritesh-55/traya-backend.git
cd traya-backend

```
2. **Install dependencies**
```bash
npm install

```
3. **Setup environment**
```bash
cp .env.example .env

```
4. **Use a MongoDB Atlas free-tier cluster (replica set) to support transactions**
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/imdiyo?retryWrites=true&w=majority
PORT=5000

```
5. **Run the project**
```bash
npm start

```

---

## 📌 Notes

- Authentication/Authorization, RBAC, Swagger/OpenAPI, Rate Limiting, Message Queues, CI/CD setup and Dockerization were purposely skipped to stay focused on the assignment’s core business objectives.

- If required, I can quickly implement them as a follow-up or live discussion.

---
