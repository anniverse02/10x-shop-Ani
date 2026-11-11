
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { getProducts } from '../services/productService'
import { useCart } from '../context/CartContext'
import { flyToCart } from '../utils/flyToCart'
import type { Product } from '../types/product'

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''

  const { addToCart } = useCart()

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      try {
        const productsData = await getProducts()
        setProducts(productsData)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())

    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (
    product: Product,
    image: HTMLImageElement | null,
  ): void => {
    if (image && product.stock > 0) {
      flyToCart(image)
    }

    addToCart(product)
  }

  if (loading) {
    return (
      <div className="theme-page theme-muted py-24 text-center">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="theme-page py-24 text-center text-red-600">
        {error}
      </div>
    )
  }

  return (
    <section className="theme-page min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <p className="theme-muted text-xs uppercase tracking-[0.2em]">
            Explore our selection
          </p>

          <h1 className="theme-text mt-3 text-4xl font-semibold tracking-tight">
            The Collection
          </h1>

          <p className="theme-muted mt-4 max-w-lg text-sm leading-6">
            Discover products selected for everyday living.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`theme-border border px-4 py-2 text-xs uppercase tracking-wider transition ${
              selectedCategory === 'all'
                ? 'theme-text theme-soft'
                : 'theme-muted hover:theme-text'
            }`}
          >
            All products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`theme-border border px-4 py-2 text-xs uppercase tracking-wider transition ${
                selectedCategory === category
                  ? 'theme-text theme-soft'
                  : 'theme-muted hover:theme-text'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="theme-muted py-16 text-center text-sm">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="theme-surface flex aspect-[4/5] items-center justify-center overflow-hidden p-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="theme-muted text-[10px] uppercase tracking-wider">
                      {product.category}
                    </p>

                    <h2 className="theme-text mt-2 text-sm font-medium">
                      {product.title}
                    </h2>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="theme-text text-sm font-semibold">
                        ${product.price.toFixed(2)}
                      </p>

                      <p className="theme-muted text-xs">
                        ★ {product.rating}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={(event) => {
                    const image =
                      event.currentTarget.parentElement?.querySelector('img')

                    handleAddToCart(product, image || null)
                  }}
                  disabled={product.stock === 0}
                  className="theme-border theme-text theme-soft theme-soft-hover mt-4 flex w-full items-center justify-between rounded-full border px-5 py-2.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                  </span>

                  <span className="theme-text theme-border flex h-7 w-7 items-center justify-center rounded-full border text-base">
                    +
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Shop
