
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  category: string
}

const categories = [
  { name: 'Beauty', number: '01' },
  { name: 'Fashion', number: '02' },
  { name: 'Furniture', number: '03' },
  { name: 'Electronics', number: '04' },
]

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products')
        }
        return response.json()
      })
      .then((data) => {
        setProducts(data.products)
      })
      .catch(() => {
        setError('Something went wrong. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const featuredProduct = products[0]

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252525]">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:px-8 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">

          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#898674]">
              A little something for everyone
            </p>

            <h1 className="max-w-xl text-5xl font-medium leading-[1.08] tracking-[-0.05em] md:text-7xl">
              Everyday things.
              <br />
              <span className="font-serif italic">Extraordinary</span>
              <br />
              finds.
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-[#77746D]">
              Discover thoughtfully selected pieces for your everyday life.
              Find something you love, make it yours.
            </p>

            <Link
              to="/shop"
              className="mt-9 inline-flex items-center gap-8 border border-[#252525] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] transition hover:bg-[#252525] hover:text-white"
            >
              Explore collection
              <span className="text-lg">↗</span>
            </Link>

            <p className="mt-12 text-xs uppercase tracking-[0.18em] text-[#99958B]">
              Discover • Explore • Enjoy
            </p>
          </div>

          <div className="relative">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#EAE6DC]">
              {featuredProduct ? (
                <img
                  src={featuredProduct.thumbnail}
                  alt={featuredProduct.title}
                  className="h-full w-full object-contain p-10"
                />
              ) : (
                <div className="text-sm text-[#898674]">
                  {loading ? 'Loading...' : 'Welcome to 10X Shop'}
                </div>
              )}
            </div>

            <div className="absolute -bottom-5 left-5 bg-white px-5 py-4 shadow-sm md:-left-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#99958B]">
                Selected for you
              </p>
              <p className="mt-1 text-sm font-medium">
                {featuredProduct?.title || 'Discover our collection'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-[#E5E1D8]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#898674]">
                Browse our selection
              </p>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                Find your category.
              </h2>
            </div>

            <span className="text-xs tracking-widest text-[#99958B]">
              01 — 04
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.number}
                to="/shop"
                className="group border-t border-[#BDB8AC] py-5"
              >
                <div className="flex justify-between">
                  <span className="text-xs text-[#99958B]">
                    {category.number}
                  </span>
                  <span className="transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-medium transition group-hover:text-[#898674] md:text-2xl">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#898674]">
              The latest selection
            </p>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              A few good finds.
            </h2>
          </div>

          <Link
            to="/shop"
            className="border-b border-[#252525] pb-1 text-xs font-semibold uppercase tracking-wider hover:text-[#898674]"
          >
            View all products ↗
          </Link>
        </div>

        {loading && (
          <p className="py-12 text-center text-sm text-[#898674]">
            Loading collection...
          </p>
        )}

        {error && (
          <p className="py-12 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {products.slice(0, 4).map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#ECE9E1]">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-2 pt-4">
                  <div>
                    <h3 className="text-sm font-medium">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-xs capitalize text-[#99958B]">
                      {product.category}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-medium">
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Closing section */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-[#DCD7CC] pt-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#898674]">
              Something waiting to be discovered
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight">
              Make everyday a little better.
            </h2>
          </div>

          <Link
            to="/shop"
            className="border border-[#252525] px-7 py-4 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#252525] hover:text-white"
          >
            Discover more ↗
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
