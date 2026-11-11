
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="theme-page mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="theme-text text-3xl font-semibold tracking-tight">
        Page not found
      </h1>

      <p className="theme-muted mt-4 text-sm">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="theme-text theme-border theme-soft theme-soft-hover mt-6 rounded-full border px-6 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#898674]"
      >
        Go to catalog
      </Link>
    </section>
  )
}

export default NotFound
