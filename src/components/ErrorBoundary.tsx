import { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5F0] px-6 text-center">
          <h1 className="text-2xl font-medium text-[#252525]">
            Something went wrong.
          </h1>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full border border-[#D8D4C8] px-6 py-3 text-sm text-[#252525] hover:bg-[#EEECE4]"
          >
            Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary