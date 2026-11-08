import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts } from '../services/productService'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory,
        )

  if (loading) {
    return (
      <div className="bg-[#F7F5F0] py-24 text-center text-[#898674]">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#F7F5F0] py-24 text-center text-red-600">
        {error}
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#898674]">
            Explore our selection
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#252525]">
            The Collection
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#898674]">
            Discover products selected for everyday living.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`border px-4 py-2 text-xs uppercase tracking-wider transition ${
              selectedCategory === 'all'
                ? 'border-[#252525] bg-[#252525] text-white'
                : 'border-[#D8D4CA] text-[#898674] hover:border-[#252525]'
            }`}
          >
            All products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`border px-4 py-2 text-xs uppercase tracking-wider transition ${
                selectedCategory === category
                  ? 'border-[#252525] bg-[#252525] text-white'
                  : 'border-[#D8D4CA] text-[#898674] hover:border-[#252525]'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="py-16 text-center text-sm text-[#898674]">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/products/${product.id}`}>
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-white p-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#898674]">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-sm font-medium text-[#252525]">
                      {product.title}
                    </h2>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#252525]">
                        ${product.price.toFixed(2)}
                      </p>

                      <p className="text-xs text-[#898674]">
                        ★ {product.rating}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="mt-4 flex w-full items-center justify-between rounded-full border border-[#D8D4C8] bg-[#EEECE4] px-5 py-2.5 text-xs font-medium text-[#252525] transition hover:bg-[#E5E1D6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#252525] text-base text-white">
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