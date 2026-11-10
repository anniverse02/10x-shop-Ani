
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { items, clearCart } = useCart()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  const [fullNameError, setFullNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [cityError, setCityError] = useState('')

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0)

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (isSubmitting) return

    setFullNameError('')
    setEmailError('')
    setAddressError('')
    setCityError('')

    let hasError = false

    if (fullName.trim().length < 3) {
      setFullNameError('Full name must be at least 3 characters')
      hasError = true
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address')
      hasError = true
    }

    if (address.trim().length < 5) {
      setAddressError('Address must be at least 5 characters')
      hasError = true
    }

    if (!city.trim()) {
      setCityError('City is required')
      hasError = true
    }

    if (hasError) return

    setOrderTotal(totalPrice)
    setIsSubmitting(true)

    window.setTimeout(() => {
      clearCart()
      setOrderPlaced(true)
      setIsSubmitting(false)
    }, 500)
  }

  if (orderPlaced) {
    return (
      <section className="min-h-screen bg-[#F7F5F0] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#898674]">
            10X Shop / Order complete
          </p>

          <div className="mt-10 border-t border-[#D8D4C8] pt-16">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A3A184] text-sm text-[#898674]">
                ✓
              </span>

              <p className="text-xs uppercase tracking-widest text-[#898674]">
                Order confirmed
              </p>
            </div>

            <h1 className="mt-8 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-[#252525] sm:text-5xl">
              Thank you! Your order has been placed.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#898674]">
              Your order has been successfully submitted.
              We appreciate your purchase and hope you enjoy your new items.
            </p>

            <div className="mt-16 border-t border-[#D8D4C8] py-8">
              <p className="text-xs uppercase tracking-widest text-[#898674]">
                Order total
              </p>

              <p className="mt-3 text-2xl font-medium text-[#252525]">
                ${orderTotal.toFixed(2)}
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-8 rounded-full border border-[#CFCABC] px-7 py-4 text-sm text-[#252525] transition hover:bg-[#EEECE4] focus:outline-none focus:ring-2 focus:ring-[#898674]"
            >
              <span>Continue shopping</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-[#F7F5F0] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-widest text-[#898674]">
            10X Shop / Checkout
          </p>

          <h1 className="mt-8 text-3xl font-medium text-[#252525]">
            Your cart is empty.
          </h1>

          <p className="mt-4 text-sm text-[#898674]">
            Add some products before placing your order.
          </p>

          <Link
            to="/"
            className="mt-8 inline-block text-sm text-[#252525] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#898674]"
          >
            Back to shop →
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-b border-[#D8D4C8] pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#898674]">
            10X Shop / Checkout
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-tight text-[#252525]">
            Complete your order
          </h1>

          <p className="mt-3 text-sm text-[#898674]">
            Just a few details before your order is ready.
          </p>
        </div>

        <div className="grid gap-16 py-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-xl font-medium text-[#252525]">
              Delivery information
            </h2>

            <p className="mt-2 text-sm text-[#898674]">
              Please provide your delivery details.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm text-[#252525]"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(fullNameError)}
                  aria-describedby={fullNameError ? 'fullName-error' : undefined}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525] focus:ring-1 focus:ring-[#898674]"
                />

                {fullNameError && (
                  <p
                    id="fullName-error"
                    className="mt-2 text-sm text-[#A36F65]"
                    role="alert"
                  >
                    {fullNameError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-[#252525]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525] focus:ring-1 focus:ring-[#898674]"
                />

                {emailError && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-[#A36F65]"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm text-[#252525]"
                >
                  Delivery address
                </label>

                <textarea
                  id="address"
                  required
                  autoComplete="street-address"
                  aria-invalid={Boolean(addressError)}
                  aria-describedby={addressError ? 'address-error' : undefined}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Street, apartment..."
                  rows={3}
                  className="w-full resize-none border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525] focus:ring-1 focus:ring-[#898674]"
                />

                {addressError && (
                  <p
                    id="address-error"
                    className="mt-2 text-sm text-[#A36F65]"
                    role="alert"
                  >
                    {addressError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm text-[#252525]"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  aria-invalid={Boolean(cityError)}
                  aria-describedby={cityError ? 'city-error' : undefined}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Your city"
                  className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525] focus:ring-1 focus:ring-[#898674]"
                />

                {cityError && (
                  <p
                    id="city-error"
                    className="mt-2 text-sm text-[#A36F65]"
                    role="alert"
                  >
                    {cityError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-between rounded-full border border-[#D8D4C8] bg-[#EEECE4] px-7 py-3 text-sm font-medium text-[#252525] transition hover:bg-[#E5E1D6] focus:outline-none focus:ring-2 focus:ring-[#898674] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {isSubmitting ? 'Placing order...' : 'Place order'}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252525] text-lg text-white">
                  +
                </span>
              </button>
            </form>
          </div>

          <div className="lg:border-l lg:border-[#D8D4C8] lg:pl-12">
            <h2 className="text-xl font-medium text-[#252525]">
              Your order
            </h2>

            <p className="mt-2 text-sm text-[#898674]">
              {items.length} different products
            </p>

            <div className="mt-8 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-20 w-20 shrink-0 bg-white object-contain p-2"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-medium text-[#252525]">
                      {item.product.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#898674]">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm text-[#252525]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-[#D8D4C8] pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#898674]">Total</p>

                <p className="text-2xl font-medium text-[#252525]">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <p className="mt-3 text-xs text-[#898674]">
                Shipping details will be confirmed with your order.
              </p>
            </div>

            <Link
              to="/cart"
              className="mt-8 inline-block text-xs text-[#898674] underline underline-offset-4 transition hover:text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#898674]"
            >
              Back to shopping cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
