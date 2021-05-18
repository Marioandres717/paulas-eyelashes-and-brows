import React from 'react'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ border: '1px solid red' }}>
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}
export default ErrorFallback
