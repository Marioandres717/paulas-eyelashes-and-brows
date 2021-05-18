import React from 'react'
import App from './src/components/app'
import Layout from './src/components/layout'

function wrapPageElement({ element, props }) {
  return (
    <Layout {...props}>
      <App>{element}</App>
    </Layout>
  )
}
export { wrapPageElement }
