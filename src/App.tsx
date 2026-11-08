import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom'

import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Shop from './pages/Shop'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Shop />} />

              <Route
                path="shop"
                element={<Navigate to="/" replace />}
              />

              <Route path="login" element={<Login />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />

              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App