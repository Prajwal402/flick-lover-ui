export interface StoredUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

export interface AuthToken {
  userId: string;
  username: string;
  email: string;
  exp: number;
}

const USERS_KEY = "movieflix_users";
const TOKEN_KEY = "movieflix_token";

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateToken(user: StoredUser): string {
  const payload: AuthToken = {
    userId: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

export function getToken(): AuthToken | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const token: AuthToken = JSON.parse(atob(raw));
    if (token.exp < Date.now()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function signup(
  username: string,
  email: string,
  password: string,
  phone: string
): Promise<{ success: true } | { success: false; error: string }> {
  const users = getStoredUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }
  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    username,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    salt,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  const token = generateToken(newUser);
  localStorage.setItem(TOKEN_KEY, token);
  return { success: true };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: true } | { success: false; error: string }> {
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }
  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    return { success: false, error: "Invalid email or password." };
  }
  const token = generateToken(user);
  localStorage.setItem(TOKEN_KEY, token);
  return { success: true };
}
