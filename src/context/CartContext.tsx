
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/product'

interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cart')

    if (savedItems) {
      return JSON.parse(savedItems) as CartItem[]
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product) => {
    const existingItem = items.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      setItems([...items, { product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setItems(items.filter((item) => item.product.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setItems(
      items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
