import React from 'react'

import { ThemeProvider } from 'theme-ui'
import theme from '../theme'

import Layout from '../components/Layout'

const MyApp = (props) => {
  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
