
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { getProductById } from '../services/productService'
import { flyToCart } from '../utils/flyToCart'
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

    const image = document.getElementById(
      'product-image',
    ) as HTMLImageElement | null

    if (image) {
      flyToCart(image)
    }

    addToCart(product)
    setMessage('Added to cart.')
  }

  if (notFound) {
    return <NotFound />
  }

  if (loading) {
    return (
      <p className="theme-page theme-muted py-24 text-center">
        Loading product...
      </p>
    )
  }

  if (error) {
    return (
      <div className="theme-page py-24 text-center">
        <p className="text-red-600">{error}</p>

        <Link
          to="/"
          className="theme-text mt-4 inline-block text-sm underline"
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
    <section className="theme-page min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          to="/"
          className="theme-muted mb-8 inline-block text-sm transition hover:opacity-70"
        >
          ← Back to catalog
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="theme-surface flex items-center justify-center p-10">
            <img
              id="product-image"
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[500px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="theme-muted text-xs uppercase tracking-widest">
              {product.category}
            </p>

            <h1 className="theme-text mt-4 text-4xl font-semibold">
              {product.title}
            </h1>

            <p className="theme-muted mt-4 text-sm">
              ★ {product.rating} / 5
            </p>

            <p className="theme-text mt-6 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>

            <p className="theme-muted mt-6 text-sm leading-7">
              {product.description}
            </p>

            <p className="theme-muted mt-6 text-xs">
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
              className="theme-border theme-text theme-soft theme-soft-hover mt-8 flex w-full items-center justify-between rounded-full border px-7 py-4 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-sm font-medium tracking-wide">
                {product.stock === 0
                  ? 'Out of stock'
                  : cartQuantity >= product.stock
                    ? 'Maximum quantity added'
                    : 'Add to cart'}
              </span>

              <span className="theme-text theme-border flex h-9 w-9 items-center justify-center rounded-full border text-lg">
                +
              </span>
            </button>

            {message && (
              <p className="theme-muted mt-3 text-sm" role="status">
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
