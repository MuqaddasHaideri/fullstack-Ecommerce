export const API_BASE = process.env.EXPO_PUBLIC_BASE_URL;

export const endpoints = {
  login: "/api/auth/login",
  signup: "/api/auth/signup",
  profile: "/api/auth/profile",
  getProducts: "/api/products",
  category: "/api/products/category",
  search: "/api/products/search",
  favorite: "/api/products/favorites",
  filter: "/api/products/filter",
  addToCart: "/api/products/cart",
};
