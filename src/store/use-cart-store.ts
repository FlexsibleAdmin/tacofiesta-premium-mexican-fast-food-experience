import { create } from 'zustand';
import { CartItem } from '@shared/types';
import { api } from '@/lib/api-client';
import { v4 as uuidv4 } from 'uuid';
interface CartState {
  userId: string | null;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  // Actions
  init: () => Promise<void>;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  clearCart: () => void;
}
// Helper to sync cart state to backend
const syncCart = async (userId: string, items: CartItem[]) => {
  try {
    await api(`/api/cart/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ cart: items })
    });
  } catch (e) {
    console.error("Failed to sync cart to backend", e);
  }
};
export const useCartStore = create<CartState>((set, get) => ({
  userId: null,
  items: [],
  isOpen: false,
  isLoading: false,
  init: async () => {
    // 1. Get or create User ID
    let id = localStorage.getItem('tacofiesta-userid');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('tacofiesta-userid', id);
    }
    set({ userId: id });
    // 2. Fetch remote cart
    try {
      set({ isLoading: true });
      const remoteCart = await api<CartItem[]>(`/api/cart/${id}`);
      if (Array.isArray(remoteCart)) {
        set({ items: remoteCart });
      }
    } catch (e) {
      console.error("Failed to fetch initial cart", e);
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: (item) => {
    const { items, userId } = get();
    const newItems = [...items, item];
    set({ items: newItems, isOpen: true });
    if (userId) syncCart(userId, newItems);
  },
  removeItem: (id) => {
    const { items, userId } = get();
    const newItems = items.filter((i) => i.id !== id);
    set({ items: newItems });
    if (userId) syncCart(userId, newItems);
  },
  updateItemQuantity: (id, quantity) => {
    const { items, userId } = get();
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0);
    set({ items: newItems });
    if (userId) syncCart(userId, newItems);
  },
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  clearCart: () => {
    const { userId } = get();
    set({ items: [] });
    if (userId) syncCart(userId, []);
  },
}));