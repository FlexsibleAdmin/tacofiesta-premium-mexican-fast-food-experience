export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Product & Menu Types
export interface Modifier {
  id: string;
  name: string;
  price: number;
  type: 'boolean' | 'quantity';
  default: boolean | number;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  categoryId: string;
  popular?: boolean;
  modifiers?: Modifier[];
}
export interface Category {
  id: string;
  name: string;
}
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  modifiers: Record<string, boolean | number>;
  totalPrice: number;
}
// User & Chat Types
export interface User {
  id: string;
  name: string;
  cart?: CartItem[];
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}