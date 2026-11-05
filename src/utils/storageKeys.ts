// every key this app writes to localStorage
// index.html reads STORAGE_KEYS.theme directly before React loads, so keep that value in sync
export const STORAGE_KEYS = {
  cart: "shop_cart",
  users: "shop_users",
  currentUser: "shop_user",
  orders: "shop_orders",
  reviews: "shop_reviews",
  theme: "shop_theme",
} as const
