# 📚 Shakespeare Bookstore – Backend

This is the **backend** service of the **Shakespeare Bookstore Application**, responsible for managing authentication, books, purchases, author revenue tracking, and admin controls.

Built using **Node.js**, **TypeScript**, **Express**, **MongoDB**, and **Clean Architecture**.

---

## 🚀 Features

- 🔐 User authentication with JWT (User, Author, Admin)
- 📖 Book publishing, editing, soft delete (draft/published)
- 💰 Revenue tracking for authors
- 🛍️ Purchase handling with unique purchase IDs
- 🧾 Sales history per user/author/admin
- 📬 Email notifications (rate-limited to 100/minute)
- 🎯 Admin dashboard with full user and book control
- 🔌 WebSocket (Socket.IO) setup for real-time features

---

## 🛠️ Tech Stack

- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Architecture:** Clean Architecture (Domain, Application, Infrastructure, Presentation)
- **Authentication:** JWT, Cookies
- **Email Service:** Nodemailer (Queued)
- **Payment Service:** Razorpay (Queued)
- **Utilities:** Morgan, CORS, Socket.IO

---

## 🧱 Folder Structure (Clean Architecture)

