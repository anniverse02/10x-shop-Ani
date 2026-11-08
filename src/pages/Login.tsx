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
    <section className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2 md:gap-24 md:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#898674]">
            10X Shop / Account
          </p>

          <h1 className="mt-8 max-w-md text-5xl font-medium leading-tight tracking-tight text-[#252525]">
            Good to have you back.
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-7 text-[#898674]">
            Sign in to your account and continue exploring our collection.
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <div className="border-b border-[#D8D4C8] pb-5">
            <h2 className="text-xl font-medium text-[#252525]">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-[#898674]">
              Enter your account details below.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-7">
            <div>
              <label
                htmlFor="username"
                className="mb-3 block text-sm text-[#252525]"
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
                className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525]"
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
                className="mb-3 block text-sm text-[#252525]"
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
                className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525]"
              />

              {passwordError && (
                <p className="mt-2 text-sm text-[#A36F65]">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-between rounded-full border border-[#D8D4C8] bg-[#EEECE4] px-7 py-3 text-sm font-medium text-[#252525] transition hover:bg-[#E5E1D6] focus:outline-none focus:ring-2 focus:ring-[#898674]"
            >
              <span>Sign in</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252525] text-lg text-white">
                →
              </span>
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 inline-block text-sm text-[#898674] transition hover:text-[#252525]"
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Login