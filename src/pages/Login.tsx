import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          expiresInMins: 30,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid username or password.')
      }

      localStorage.setItem('accessToken', data.accessToken)

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      )

      navigate('/shop')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
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
                required
                className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525]"
              />
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
                required
                className="w-full border-b border-[#CFCABC] bg-transparent px-1 py-3 text-sm text-[#252525] outline-none transition focus:border-[#252525]"
              />
            </div>

            {error && (
              <p className="text-sm text-[#A36F65]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-between rounded-full border border-[#D8D4C8] bg-[#EEECE4] px-7 py-3 text-sm font-medium text-[#252525] transition hover:bg-[#E5E1D6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252525] text-lg text-white">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login