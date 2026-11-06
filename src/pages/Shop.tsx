import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts, getCategories } from '../services/productService'
import type { Product } from '../types/product'

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadShopData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ])

        setProducts(productsData)
        setCategories(categoriesData)
      } catch {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadShopData()
  }, [])

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory,
        )

  if (loading) {
    return (
      <div className="py-24 text-center text-[#898674]">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-600">
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

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group"
            >
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
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-16 text-center text-sm text-[#898674]">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  )
}

export default Shop