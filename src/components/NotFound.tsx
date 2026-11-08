import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-[#252525]">
        Page not found
      </h1>

      <p className="mt-4 text-sm text-[#898674]">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full border border-[#E5E1D8] px-6 py-3 text-sm font-medium text-[#252525] transition hover:bg-[#F7F5F0] focus:outline-none focus:ring-2 focus:ring-[#898674]"
      >
        Go to catalog
      </Link>
    </section>
  )
}

export default NotFound