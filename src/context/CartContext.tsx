
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
      try {
        return JSON.parse(savedItems) as CartItem[]
      } catch {
        return []
      }
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product): void => {
    if (product.stock <= 0) return

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentItems
        }

        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number): void => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== id),
    )
  }

  const updateQuantity = (id: number, quantity: number): void => {
    if (!Number.isInteger(quantity) || quantity < 1) return

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.id !== id) return item
        if (quantity > item.product.stock) return item

        return { ...item, quantity }
      }),
    )
  }

  const clearCart = (): void => {
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

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
