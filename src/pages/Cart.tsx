import { useCart } from '../context/CartContext'

function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#252525]">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <p className="mt-4 text-sm text-[#898674]">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="mt-10 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-6 border-b border-[#D8D4C8] pb-6"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-24 w-24 bg-white object-contain p-2"
                />

                <div>
                  <h2 className="text-sm font-medium text-[#252525]">
                    {item.product.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#898674]">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8D4C8] text-[#252525] transition hover:bg-[#EAE7DE]"
                    >
                      -
                    </button>

                    <span className="text-sm text-[#252525]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8D4C8] text-[#252525] transition hover:bg-[#EAE7DE]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-[#F0EAE4] px-3 py-2 text-xs text-[#A36F65] transition hover:bg-[#E8DDD6]"
                  >
                    <span>✕</span>
                    <span>Remove item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
