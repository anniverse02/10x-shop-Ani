
import { Link, NavLink } from 'react-router-dom'

function Header() {
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
        <div className="flex min-h-20 items-center justify-between gap-4">

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
          <nav className="hidden items-center gap-9 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.13em] transition ${
                  isActive
                    ? 'font-semibold text-[#252525]'
                    : 'text-[#898674] hover:text-[#252525]'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.13em] transition ${
                  isActive
                    ? 'font-semibold text-[#252525]'
                    : 'text-[#898674] hover:text-[#252525]'
                }`
              }
            >
              Collection
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="hidden text-xs uppercase tracking-[0.13em] text-[#898674] transition hover:text-[#252525] sm:block"
            >
              Account
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 border border-[#252525] px-4 py-3 text-xs font-medium uppercase tracking-wider transition hover:bg-[#252525] hover:text-white"
            >
              Cart <span>↗</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
