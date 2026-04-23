# Revisei

Fullstack study management application focused on organizing subjects, tracking progress and building consistent study habits.

**Live Demo:** https://revisei.vercel.app/ <br>
**Backend API:** https://github.com/LuisFPamplona/back-end-revisei

---

## Preview

<p align="center">
  <img src="./docs/demo.gif" width="800"/>
</p>

## Screenshots

### Dashboard

<p align="center">
  <img src="./docs/dashboard.png" width="400"/>
</p>

### Subjects

<p align="center">
  <img src="./docs/subjects.png" width="400"/>
  <img src="./docs/subject.png" width="400"/>
</p>

### Review Session

<p align="center">
  <img src="./docs/review.png" width="400"/>
</p>

### Settings

<p align="center">
  <img src="./docs/configs.png" width="400"/>
</p>

---

## Core Features

* Subject and topic management
* Daily study goal system
* Smart "Next Action" suggestion
* Performance tracking per subject
* Study session with timer
* Internationalization (i18n)
* Global loading system integrated with API requests
* User authentication and protected routes

---

## Architecture

The application follows a fullstack architecture:

* Frontend handles UI and state management
* Backend exposes REST APIs with business logic
* Prisma is used as ORM for database access
* PostgreSQL (Neon) stores user data

### Frontend

* React + TypeScript
* Vite
* Context API for global state
* i18next for internationalization
* Centralized request layer (`fetchWithAuth`)
* Global loading system decoupled from component tree

### Backend

* Node.js + Express
* Prisma ORM
* JWT authentication
* Route protection via middleware
* Modular structure (routes, controllers, services)

### Infrastructure

* Vercel (Frontend)
* Render (Backend)
* Neon (PostgreSQL)

---

## Key Learnings

* Handling real production issues and debugging errors
* Managing database migrations in production (Neon + Prisma)
* Designing scalable React component architecture
* Separating concerns between frontend and backend
* Building a complete fullstack application from scratch

---

## Technologies

### Frontend

* React
* TypeScript
* Vite
* i18next
* react-toastify

### Backend

* Node.js
* Express
* Prisma
* JWT
* bcrypt

---

## Project Structure

### Frontend

```txt
src/
  components/
  contexts/
  services/
  config/
  pages/
  i18n/
```

### Backend

```txt
src/
  routes/
  controllers/
  middlewares/
  services/
  prisma/
```

---

## Running Locally

### 1. Clone repositories

```bash
git clone https://github.com/LuisFPamplona/front-end-revisei
git clone https://github.com/LuisFPamplona/back-end-revisei
```

---

### 2. Backend

```bash
cd back-end-revisei
npm install
```

Create `.env`:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Run:

```bash
npx prisma db push
npm run dev
```

---

### 3. Frontend

```bash
cd front-end-revisei
npm install
```

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

Run:

```bash
npm run dev
```

---

## Environment Variables

### Frontend

* `VITE_API_URL`: Backend API URL

### Backend

* `DATABASE_URL`: PostgreSQL connection string
* `JWT_SECRET`: Token secret

---

## Highlights

* Global loading system integrated with request layer
* Clear separation between frontend and backend
* Scalable and modular architecture
* Full production deployment (frontend, backend, database)

---

## Future Improvements

* Study history analytics
* Enhanced performance insights
* Improved mobile experience
* Subject templates (pre-built study structures)

---

## Author

Luis Pamplona <br>
LinkedIn: https://www.linkedin.com/in/luis-pamplona-552030310
