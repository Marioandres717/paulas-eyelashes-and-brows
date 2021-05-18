import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './error-fallback'

export default function App({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  )
}
