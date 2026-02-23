# 🎓 Edutech Frontend Assessment

Modern Admin Dashboard built using **Next.js, NextAuth, Zustand, and Material-UI (MUI)**.
All backend data is fetched from: **[https://dummyjson.com]**

---

## 🚀 Live Demo

👉 https://your-app-name.vercel.app

---

## 🔐 Demo Login Credentials

* **Username:** `emilys`
* **Password:** `emilyspass`

---

# 🛠 Tech Stack

* **Next.js (App Router)**
* **NextAuth** (JWT Authentication)
* **Zustand** (State Management)
* **Material-UI (MUI)** (UI Components)
* **Axios** (API Calls)
* **Swiper** (Product Image Carousel)
* **DummyJSON** (Public API)

---

# ✨ Features

## 🔑 Authentication

* Admin login using DummyJSON Auth API
* Token stored in Zustand
* JWT session using NextAuth
* Protected dashboard routes
* Logout functionality

---

## 👥 Users Module

* Paginated users list
* Search functionality
* Responsive MUI table layout
* Single user detailed view (Tabbed layout)

---

## 🛍 Products Module

* Paginated products grid
* Search functionality
* Category filter
* Product detail page with image carousel
* Discount price calculation

---

# 🗂 State Management (Zustand)

### Used For:

* Authentication state
* Users data
* Products data

### Why Zustand?

* Lightweight and simple
* Built-in async support
* Less boilerplate compared to Redux

---

# 💾 Client-Side Caching

Caching prevents repeated API calls for the same page/search/category, improving performance and user experience by serving data from memory.

Caching is implemented inside Zustand stores using a `cache` object keyed by:

```
page + search + category
```

---

# ⚡ Performance Optimizations

* `React.memo` used for page components
* `useCallback` and `useMemo` used where necessary
* API-side pagination (`limit` & `skip`)
* Debounced search input

---

# 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Environment Variables

Create a `.env.local` file in the root directory:

```
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

# 📁 Folder Structure

```
app/
  login/
  dashboard/
    users/
    products/
  api/auth/[...nextauth]/

store/
  authStore.js
  userStore.js
  productStore.js

services/
  api.js
```

---

# 🔐 Route Protection

Dashboard routes are protected using middleware:

```
matcher: ["/dashboard/:path*"]
```

Unauthenticated users are redirected to `/login`.

---

# 👨‍💻 Author

**Vipul Mehra**

---

> This project demonstrates practical frontend skills including authentication, state management, API integration, performance optimization, and responsive UI development using modern React tools.
