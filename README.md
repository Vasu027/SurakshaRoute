# EJS Auth MVC (SafeCommute - demo)

Simple Node.js + Express project demonstrating signup & login using EJS views, MongoDB (Mongoose), bcrypt and sessions.

## Structure (MVC)
- `app.js` - main entry
- `config/` - DB connection code
- `models/` - Mongoose models (User)
- `controllers/` - controllers handling logic (auth)
- `routes/` - route definitions
- `views/` - EJS templates (layout + pages)
- `public/` - static assets (styles)

## Requirements
- Node.js 16+ / npm
- MongoDB (local or Atlas)

## Setup
1. Extract the zip or clone this project.
2. Copy `.env.example` to `.env` and edit:
```
MONGO_URI=mongodb://127.0.0.1:27017/ejs_auth_mvc
SESSION_SECRET=some_long_secret_here
PORT=3000
```
3. Install deps:
```
npm install
```
4. Start the server:
```
npm run dev
# or
npm start
```
5. Open http://localhost:3000

## Notes
- Passwords are hashed with bcrypt.
- Sessions are stored in MongoDB using `connect-mongo`.
- For production you should set secure cookie flags, use HTTPS, and a robust session secret.
