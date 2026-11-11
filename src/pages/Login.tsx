
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setUsernameError('')
    setPasswordError('')

    const trimmedUsername = username.trim()

    let hasError = false

    if (!trimmedUsername) {
      setUsernameError('Username is required')
      hasError = true
    }

    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      hasError = true
    }

    if (hasError) {
      return
    }

    login(trimmedUsername)

    const from = location.state?.from?.pathname

    if (from === '/checkout') {
      navigate('/checkout', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <section className="theme-page min-h-screen">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2 md:gap-24 md:py-28">
        <div className="flex flex-col justify-center">
          <p className="theme-muted text-xs uppercase tracking-[0.2em]">
            10X Shop / Account
          </p>

          <h1 className="theme-text mt-8 max-w-md text-5xl font-medium leading-tight tracking-tight">
            Good to have you back.
          </h1>

          <p className="theme-muted mt-6 max-w-sm text-sm leading-7">
            Sign in to your account and continue exploring our collection.
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <div className="theme-border border-b pb-5">
            <h2 className="theme-text text-xl font-medium">
              Sign in
            </h2>

            <p className="theme-muted mt-2 text-sm">
              Enter your account details below.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-7">
            <div>
              <label
                htmlFor="username"
                className="theme-text mb-3 block text-sm"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="theme-input w-full border-b bg-transparent px-1 py-3 text-sm outline-none transition focus:border-[#898674]"
              />

              {usernameError && (
                <p className="mt-2 text-sm text-[#A36F65]">
                  {usernameError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="theme-text mb-3 block text-sm"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="theme-input w-full border-b bg-transparent px-1 py-3 text-sm outline-none transition focus:border-[#898674]"
              />

              {passwordError && (
                <p className="mt-2 text-sm text-[#A36F65]">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="theme-text theme-border theme-soft theme-soft-hover flex w-full items-center justify-between rounded-full border px-7 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#898674]"
            >
              <span>Sign in</span>

              <span className="theme-text theme-border flex h-9 w-9 items-center justify-center rounded-full border text-lg">
                →
              </span>
            </button>
          </form>

          <Link
            to="/"
            className="theme-muted mt-6 inline-block text-sm transition hover:underline"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login
