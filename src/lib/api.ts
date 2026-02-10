//Who will I use this api system for now

import { env } from "@/env";

export const API = env.NEXT_PUBLIC_BACKEND_API_URL;

export const providerAPI = `${API}/provider`;
export const mealAPI = `${API}/meals`;
export const orderAPI = `${API}/order`;

export const cartAPI = `${API}/cart`;
export const adminAPI = `${API}/admin`;
