
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

function Header() {
  const { isLoggedIn, logout } = useAuth()
  const { items } = useCart()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(
    () => new URLSearchParams(location.search).get('search') ?? '',
  )

  const searchInputRef = useRef<HTMLInputElement>(null)

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  const handleLogout = (): void => {
    logout()
    navigate('/')
  }

  const handleSearch = (value: string): void => {
    setSearchQuery(value)

    if (value.trim()) {
      navigate(`/?search=${encodeURIComponent(value)}`, {
        replace: true,
      })
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleCloseSearch = (): void => {
    setIsSearchOpen(false)
    setSearchQuery('')
    navigate(location.pathname, { replace: true })
  }

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="theme-page theme-border border-b">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Announcement */}
        <div className="theme-border border-b py-2 text-center">
          <p className="theme-muted text-[10px] font-medium uppercase tracking-[0.2em]">
            A good find is always worth sharing.
          </p>
        </div>

        {/* Main navigation */}
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="theme-text flex items-center gap-1">
            <span className="text-3xl font-semibold tracking-[-0.08em]">
              10X
            </span>
            <span className="theme-muted ml-1 text-[10px] font-medium uppercase tracking-[0.22em]">
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
                    ? 'theme-text font-semibold'
                    : 'theme-muted hover:theme-text'
                }`
              }
            >
              Catalog
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-5">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="theme-muted hover:theme-text flex min-h-11 items-center px-2 text-xs uppercase tracking-[0.13em] transition"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="theme-muted hover:theme-text flex min-h-11 items-center px-2 text-xs uppercase tracking-[0.13em] transition"
              >
                Log in
              </Link>
            )}

            <Link
              id="cart-link"
              to="/cart"
              className="theme-text theme-border theme-soft-hover flex min-h-11 items-center gap-2 border px-3 sm:px-4 text-xs font-medium uppercase tracking-wider transition"
            >
              Cart

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#252525] px-1 text-[10px] text-white dark:bg-[#F1EFE8] dark:text-[#252525]">
                  {cartCount}
                </span>
              )}

              <span>↗</span>
            </Link>

            {/* Search */}
            <div className="flex items-center gap-2">
              {isSearchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="animate-in flex items-center"
                >
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      handleSearch(event.target.value)
                    }
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="theme-input h-11 w-36 border px-3 text-xs outline-none transition-all focus:border-[#898674] sm:w-52"
                  />
                </form>
              )}

              <button
                type="button"
                onClick={() => {
                  if (isSearchOpen) {
                    handleCloseSearch()
                  } else {
                    setIsSearchOpen(true)
                  }
                }}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                aria-expanded={isSearchOpen}
                className="theme-text theme-border theme-soft-hover flex h-11 w-11 items-center justify-center border text-lg transition"
              >
                {isSearchOpen ? '×' : '⌕'}
              </button>
            </div>

            {/* Dark Mode */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
              className="theme-text theme-border theme-soft-hover flex h-11 w-11 items-center justify-center border text-lg transition"
            >
              {isDarkMode ? '☀' : '☾'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
