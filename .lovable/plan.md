

# Netflix-Style Authentication System (Login and Signup)

## Overview
Add Netflix-inspired Login and Signup pages with a dark theme matching the existing movie browser. Since no backend is connected, this will use **local storage mock authentication** that simulates the full flow -- it can be upgraded to real Supabase auth later.

## What You Will Get

### Login Page (`/login`)
- Netflix-style dark page with the MOVIEFLIX logo
- Semi-transparent card over a dark/blurred movie backdrop
- Email and Password fields
- "Sign In" button with red Netflix-style styling
- Link to Sign Up page
- Form validation (email format, password minimum length)

### Signup Page (`/signup`)
- Same Netflix-style layout
- Fields: Username, Email, Password, Phone
- Client-side validation for all fields
- Passwords are hashed (using a browser-safe hashing approach) before storing in local storage
- Link to Login page

### Auth Flow
- On signup: validate inputs, hash password, store user in local storage, redirect to `/`
- On login: validate credentials against stored users, generate a mock JWT-like token, store in local storage, redirect to `/`
- Protected routes: the movie dashboard (`/`) redirects to `/login` if not authenticated
- Logout button in the Navbar

### New Files
- `src/lib/auth.ts` -- auth utilities (mock user storage, password hashing with Web Crypto API, token generation, login/signup logic)
- `src/contexts/AuthContext.tsx` -- React context for auth state management
- `src/pages/Login.tsx` -- Netflix-style login page
- `src/pages/Signup.tsx` -- Netflix-style signup page
- `src/components/ProtectedRoute.tsx` -- route wrapper that redirects unauthenticated users

### Modified Files
- `src/App.tsx` -- add routes for `/login` and `/signup`, wrap app in AuthProvider, protect the home route
- `src/components/Navbar.tsx` -- add user greeting and logout button

## Technical Details

### Password Security (Browser-Safe)
Since there is no backend, bcrypt cannot be used directly. Instead, passwords will be hashed using the browser's built-in **Web Crypto API** (SHA-256 with a salt), which is the most secure option available client-side. This is suitable for demo/prototype purposes.

### Mock JWT Token
A base64-encoded JSON object with user info and expiry, stored in local storage. This simulates JWT behavior for the redirect flow.

### Validation Rules
- **Email**: Must be valid email format (zod validation)
- **Password**: Minimum 6 characters
- **Username**: Required, 2-30 characters
- **Phone**: Optional, basic format check

### Important Note
This is a **frontend-only mock** authentication. For production use with real bcrypt hashing and JWT tokens, you would need to connect Lovable Cloud or Supabase -- I can help upgrade when you are ready.

