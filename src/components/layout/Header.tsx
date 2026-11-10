
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function Header() {
  const { isLoggedIn, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const handleLogout = (): void => {
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-[#E5E1D8] bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Announcement */}
        <div className="border-b border-[#E5E1D8] py-2 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#898674]">
            A good find is always worth sharing.
          </p>
        </div>

        {/* Main navigation */}
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="text-3xl font-semibold tracking-[-0.08em]">
              10X
            </span>
            <span className="ml-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#898674]">
              Shop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="order-3 flex w-full items-center gap-7 md:order-none md:w-auto md:gap-9">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex min-h-11 items-center px-2 text-xs uppercase tracking-[0.13em] transition ${
                  isActive
                    ? 'font-semibold text-[#252525]'
                    : 'text-[#898674] hover:text-[#252525]'
                }`
              }
            >
              Catalog
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 items-center px-2 text-xs uppercase tracking-[0.13em] text-[#898674] transition hover:text-[#252525]"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex min-h-11 items-center px-2 text-xs uppercase tracking-[0.13em] text-[#898674] transition hover:text-[#252525]"
              >
                Log in
              </Link>
            )}

            <Link
              to="/cart"
              className="flex min-h-11 items-center gap-2 border border-[#252525] px-4 text-xs font-medium uppercase tracking-wider transition hover:bg-[#252525] hover:text-white"
            >
              Cart

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#252525] px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}

              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
