import { create } from 'zustand';
import { Product } from '@/lib/mock-menu';
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  modifiers: Record<string, boolean | number>;
  totalPrice: number;
}
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item], 
    isOpen: true 
  })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter((i) => i.id !== id) 
  })),
  updateItemQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0)
  })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  clearCart: () => set({ items: [] }),
}));