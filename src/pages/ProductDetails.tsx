import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'

import { getProductById } from '../services/productService'
import type { Product } from '../types/product'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!id) {
          throw new Error('Product not found')
        }

        const data = await getProductById(Number(id))
        setProduct(data)
      } catch {
        setError('Could not load product.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <p className="py-24 text-center">Loading product...</p>
  }

  if (error || !product) {
    return <p className="py-24 text-center text-red-600">{error || 'Product not found.'}</p>
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
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
            {product.stock} items available
          </p>
          <button onClick={() => addToCart(product)}
          className="mt-8 flex w-full items-center justify-between rounded-full
          border border-[#D8D4C8] bg-[#EEECE4] px-7 py-4 text-[#252525] transition-all duration-300 hover:bg-[#E5E1D6]">
          <span className="text-sm font-medium tracking-wide">
              Add to cart
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252525] 
          text-lg text-white transition-transform duration-300 group-hover:rotate-45">
            +
            </span>
          </button>

        </div>
      </div>
    </section>
  )
}

export default ProductDetails