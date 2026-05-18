import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { products } from './data';

/* ============================================================
   SAFE LOCALSTORAGE HELPERS
   ============================================================ */

function safeParseArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeLoad<T>(key: string): T[] {
  try {
    return safeParseArray<T>(localStorage.getItem(key));
  } catch {
    return [];
  }
}

function safeSave(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage full or blocked */
  }
}

/* ============================================================
   CART CONTEXT
   ============================================================ */
interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = 'vstore-cart';

function isValidCartItem(item: unknown): item is CartItem {
  if (typeof item !== 'object' || item === null) return false;
  const c = item as Record<string, unknown>;
  return typeof c.productId === 'number' && typeof c.quantity === 'number' && c.quantity > 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => safeLoad<CartItem>(CART_KEY).filter(isValidCartItem));

  useEffect(() => { safeSave(CART_KEY, items); }, [items]);

  const addToCart = (productId: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { productId, quantity: 1 }];
    });
  };
  const removeFromCart = (productId: number) => setItems(prev => prev.filter(i => i.productId !== productId));
  const updateQuantity = (productId: number, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setItems(prev => prev.map(i => (i.productId === productId ? { ...i, quantity: qty } : i)));
  };
  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + (i.quantity ?? 0), 0), [items]);
  const totalPrice = useMemo(() => items.reduce((s, item) => {
    const product = products.find(p => p.id === item.productId);
    return s + (product?.price ?? 0) * (item.quantity ?? 0);
  }, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

/* ============================================================
   WISHLIST CONTEXT
   ============================================================ */
interface WishlistContextType {
  wishlistItems: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const WISHLIST_KEY = 'vstore-wishlist';

function isValidWishlistItem(item: unknown): item is number {
  return typeof item === 'number' && item > 0;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<number[]>(() => 
    safeLoad<number>(WISHLIST_KEY).filter(isValidWishlistItem)
  );

  useEffect(() => { safeSave(WISHLIST_KEY, wishlistItems); }, [wishlistItems]);

  const addToWishlist = (productId: number) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: number) => wishlistItems.includes(productId);

  const clearWishlist = () => setWishlistItems([]);

  const totalWishlistItems = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist, 
      isInWishlist, 
      clearWishlist,
      totalWishlistItems 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
