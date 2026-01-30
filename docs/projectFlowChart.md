# FoodHub 🍱 – Flowchart & System Design

## 1️⃣ High-Level System Flowchart (Overall)

```
User (Web / Mobile)
        │
        ▼
Frontend (Next.js App Router)
        │
        │  REST / JSON (HTTPS)
        ▼
Backend API (Node.js + Express / Next.js API)
        │
        │ ORM (Prisma / Drizzle)
        ▼
Database (PostgreSQL)
        │
        ├── Users
        ├── ProviderProfiles
        ├── Meals
        ├── Orders
        ├── Reviews
        └── Categories
```

---

## 2️⃣ Authentication & Authorization Flow

```
User
 │
 │ Register / Login
 ▼
Auth API
 │  (bcrypt + JWT)
 │
 ├── Validate Input (Zod)
 ├── Hash Password
 ├── Generate JWT
 │
 ▼
Client Stores Token
 │
 ▼
Protected Route Access
 │
 ▼
RBAC Middleware (Customer / Provider / Admin)
```

🔐 **RBAC Rule**

- Customer → order, review
- Provider → manage meals, orders
- Admin → full access

---

## 3️⃣ Customer Flowchart (Deep – Requirement Based)

```
Visitor
  │
  │ Browse without login
  ▼
Home / Meals Page
  │
  │ Want to order?
  ▼
Login / Register (Role = CUSTOMER)
  │
  │ Auth Success (JWT)
  ▼
Browse Meals (Filter / Search)
  │
  ▼
View Meal Details
  │
  │ Check availability
  ▼
Add to Cart
  │
  │ Modify quantity
  ▼
Cart Page
  │
  │ Proceed to checkout
  ▼
Checkout
  │  - Delivery Address
  │  - Cash on Delivery
  ▼
Create Order API
  │
  ▼
Order Status = PLACED
  │
  │ Track Order
  ▼
Status Updates
(PLACED → PREPARING → READY → DELIVERED)
  │
  ▼
Order Delivered
  │
  │ Eligible for review
  ▼
Leave Review
  │
  ▼
Order Completed
```

Customer **Can Do**

- Browse & search meals
- Place & track orders
- Cancel (only PLACED state)
- Review after delivery

---

## 4️⃣ Provider Flowchart (Deep – Requirement Based)

```
Provider
  │
  │ Register (Role = PROVIDER)
  ▼
Login
  │
  │ Complete Profile
  ▼
Provider Dashboard
  │
  ├── Manage Menu
  │     ├ Add Meal
  │     ├ Update Meal
  │     └ Remove Meal
  │
  └── Manage Orders
          │
          ▼
     New Order Received
          │
          ▼
     Accept Order
          │
          ▼
     Update Status
 (PLACED → PREPARING → READY)
          │
          ▼
     Handed to Delivery
          │
          ▼
     Mark as DELIVERED
```

Provider **Can Do**

- Manage own menu only
- Update order status
- Cannot delete delivered orders

---

## 5️⃣ Admin Flowchart (Deep – Requirement Based)

```
Admin (Seeded Account)
   │
   ▼
Admin Login
   │
   ▼
Admin Dashboard
   │
   ├── User Management
   │     ├ View Customers
   │     ├ View Providers
   │     ├ Suspend / Activate
   │
   ├── Order Oversight
   │     ├ View All Orders
   │     └ Resolve Issues
   │
   └── Category Management
         ├ Add Category
         ├ Update Category
         └ Delete Category
```

Admin **Can Do**

- Full system access
- No ordering capability
- Platform moderation only

---

# 🧠 System Design (Industry-Level)

## 6️⃣ Architecture Style

**Monorepo (Recommended)**

```
apps/
 ├── web (Next.js)
 └── api (Express / Next API)
packages/
 ├── ui (shared components)
 ├── config (eslint, tsconfig)
 └── db (prisma / drizzle)
```

---

## 7️⃣ Frontend System Design

**Responsibilities**

- UI Rendering
- Form Validation (React Hook Form + Zod)
- State Management (Zustand / TanStack Query)
- Auth Guard (Middleware)

**Data Flow**

```
UI → API Call → Cache (TanStack Query)
           ↓
        Error / Success State
```

---

## 8️⃣ Backend System Design

**Layers**

```
Route
 └── Controller
      └── Service
           └── Repository (DB)
```

**Key Components**

- Auth Middleware (JWT)
- Role Guard Middleware
- Global Error Handler
- Input Validation (Zod)

---

## 9️⃣ Database Design (Logical)

### Users

- id
- name
- email
- password
- role (CUSTOMER | PROVIDER | ADMIN)
- status

### ProviderProfiles

- id
- userId (FK)
- restaurantName
- address

### Meals

- id
- providerId
- categoryId
- price
- availability

### Orders

- id
- customerId
- status
- totalAmount

### OrderItems

- orderId
- mealId
- quantity

---

## 🔟 Scalability Considerations

- CDN for images
- Pagination & filtering
- Indexing (orders, meals)
- Background jobs (order cleanup)
- Ready for Payment Gateway future

---

## ✅ Why This Design is Strong

✔ Clear separation of concerns
✔ Scalable & maintainable
✔ Real-world production ready
✔ Easy to extend (payment, delivery)

---

📌 **Next Step Suggestion**
1️⃣ Database schema finalize
2️⃣ Auth + RBAC implementation
3️⃣ Order flow backend
4️⃣ Provider dashboard
5️⃣ Admin panel
