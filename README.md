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

## ⚙️ Scalability Considerations (To handle million of users)

### 1. Latency Optimizations
- Currently we are waiting for image being uploaded, further optimization we can decouple image upload to a background process.
- To maintain consistency report generation logic is kept in the transaction but if the business logic goes more complex and involves AI then we need to generate the report asynchronously without transaction and optimize process by precompute data, cache, etc.
- For further optimization, we can use Redis to cache Hair test reports and Orders.
- We can tune Mongoose poolSize for concurrent operations.

### 2. Concurrency & Consistency
- All writes for Create User, Hair Test and Report are atomic & safely rollback on failure

### 3. Query Performance
- Already applied necessary Unique and Compound Indices on collections which supports faster results for GET APIs.
- For further optimization in case of very large datasets, we can use Sharding & Partitioning, User collection: shard by phoneNumber (hashed or range), HairTest: shard by user (so that tests for a user are on the same shard) or Report: shard by publicId (hashed) or by creation time..
- Read-heavy endpoints can use MongoDB Atlas Read Replicas

### 4. Scaling
- We can AWS S3 for image upload instead of Cloudinary and can leverage functionalities like Pre Signed URL which will remove all the load on API Server and optimized delivery via CDN.
- We can deploy behind Kubernetes/NGINX with horizontal pods for traffic splitting (load balancing)
- We can offload other async tasks to background workers (RabbitMQ/Kafka).

### 5. Monitoring & Load Testing
- Integrate tools like Prometheus/Grafana or ELK for metrics.
- Integrate tools like Artillery / k6 for load testing.
- We can use Circuit Breakers & Retry Patterns for external services (third-party calls)

### 6. 🔮 Future Improvements
- **Real-time Analytics**: User behavior tracking with Kafka/RabbitMQ
- **Global Deployment**: Multi-region MongoDB clusters
- **ML Integration**: Dynamic product weighting based on outcomes

---

## 📌 Notes

- Authentication/Authorization, RBAC, Swagger/OpenAPI, Rate Limiting, Message Queues, CI/CD setup and Dockerization were purposely skipped to stay focused on the assignment’s core business objectives.

- If required, I can quickly implement them as a follow-up or live discussion.

---
