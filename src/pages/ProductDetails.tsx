
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import NotFound from '../components/NotFound'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart, items } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [message, setMessage] = useState('')

  const productId = Number(id)

  const cartItem = items.find(
    (item) => item.product.id === productId,
  )

  const cartQuantity = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      if (!id || !Number.isInteger(productId) || productId <= 0) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (error) {
        if (error instanceof Error && error.message === 'Product not found') {
          setNotFound(true)
        } else {
          setError('Could not load product. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, productId])

  const handleAddToCart = (): void => {
    if (!product || product.stock === 0) return

    if (cartQuantity >= product.stock) {
      setMessage('You have added all available items to your cart.')
      return
    }

    addToCart(product)
    setMessage('Added to cart.')
  }

  if (notFound) {
    return <NotFound />
  }

  if (loading) {
    return (
      <p className="bg-[#F7F5F0] py-24 text-center text-[#898674]">
        Loading product...
      </p>
    )
  }

  if (error) {
    return (
      <div className="bg-[#F7F5F0] py-24 text-center">
        <p className="text-red-600">{error}</p>

        <Link
          to="/"
          className="mt-4 inline-block text-sm text-[#252525] underline"
        >
          Back to catalog
        </Link>
      </div>
    )
  }

  if (!product) {
    return <NotFound />
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-[#898674] transition hover:text-[#252525]"
        >
          ← Back to catalog
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex items-center justify-center bg-white p-10">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[500px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-[#898674]">
              {product.category}
            </p>

            <h1 className="mt-4 text-4xl font-semibold text-[#252525]">
              {product.title}
            </h1>

            <p className="mt-4 text-sm text-[#898674]">
              ★ {product.rating} / 5
            </p>

            <p className="mt-6 text-2xl font-semibold text-[#252525]">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 text-sm leading-7 text-[#898674]">
              {product.description}
            </p>

            <p className="mt-6 text-xs text-[#898674]">
              {product.stock > 5
                ? 'In stock'
                : product.stock > 0
                  ? `Only ${product.stock} left`
                  : 'Out of stock'}
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={
                product.stock === 0 ||
                cartQuantity >= product.stock
              }
              className="mt-8 flex w-full items-center justify-between rounded-full border border-[#D8D4C8] bg-[#EEECE4] px-7 py-4 text-[#252525] transition-all duration-300 hover:bg-[#E5E1D6] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-sm font-medium tracking-wide">
                {product.stock === 0
                  ? 'Out of stock'
                  : cartQuantity >= product.stock
                    ? 'Maximum quantity added'
                    : 'Add to cart'}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252525] text-lg text-white">
                +
              </span>
            </button>

            {message && (
              <p className="mt-3 text-sm text-[#898674]" role="status">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
