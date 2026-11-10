
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart()

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  )

  return (
    <div className="min-h-screen w-full bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#252525]">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-8">
            <p className="text-sm text-[#898674]">
              Your cart is currently empty.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block text-sm text-[#252525] underline"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-wrap items-center gap-6 border-b border-[#D8D4C8] pb-6"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-24 w-24 bg-white object-contain p-2"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-medium text-[#252525]">
                    {item.product.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#898674]">
                    Price: ${item.product.price.toFixed(2)}
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#252525]">
                    Subtotal: $
                    {(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                        )
                      }
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.product.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D4C8] text-[#252525] transition hover:bg-[#EAE7DE] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>

                    <span
                      className="text-sm text-[#252525]"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                        )
                      }
                      disabled={
                        item.quantity >= item.product.stock
                      }
                      aria-label={`Increase quantity of ${item.product.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D4C8] text-[#252525] transition hover:bg-[#EAE7DE] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.title} from cart`}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-[#F0EAE4] px-3 py-2 text-xs text-[#A36F65] transition hover:bg-[#E8DDD6]"
                  >
                    <span>✕</span>
                    <span>Remove item</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end border-t border-[#D8D4C8] pt-6">
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-[#898674]">
                  Total
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#252525]">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/checkout"
                className="flex items-center gap-8 rounded-full border border-[#CFCABC] px-7 py-4 text-sm text-[#252525] transition hover:bg-[#EEECE4]"
              >
                <span>Continue to checkout</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

