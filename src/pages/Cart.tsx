
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
    <div className="theme-page min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="theme-text text-3xl font-semibold tracking-tight">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-8">
            <p className="theme-muted text-sm">
              Your cart is currently empty.
            </p>

            <Link
              to="/"
              className="theme-text mt-6 inline-block text-sm underline"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="theme-border flex flex-wrap items-center gap-6 border-b pb-6"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="theme-surface h-24 w-24 object-contain p-2"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="theme-text text-sm font-medium">
                    {item.product.title}
                  </h2>

                  <p className="theme-muted mt-2 text-sm">
                    Price: ${item.product.price.toFixed(2)}
                  </p>

                  <p className="theme-text mt-1 text-sm font-medium">
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
                      className="theme-text theme-border theme-soft-hover flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>

                    <span
                      className="theme-text text-sm"
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
                      className="theme-text theme-border theme-soft-hover flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40"
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

            <div className="theme-border flex justify-end border-t pt-6">
              <div className="text-right">
                <p className="theme-muted text-xs uppercase tracking-widest">
                  Total
                </p>

                <p className="theme-text mt-2 text-2xl font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/checkout"
                className="theme-text theme-border theme-soft theme-soft-hover flex items-center gap-8 rounded-full border px-7 py-4 text-sm transition"
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
