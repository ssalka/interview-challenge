import { Box } from 'theme-ui'
import { useState, useEffect } from 'react'
import { withApollo } from '../apollo/client'

const Index = () => {
  return (
    <Box
      sx={{
        pt: '48px',
        m: '0 auto',
        textAlign: 'center'
      }}>
      <h1>Welcome to the Edge & Node coding challenge!</h1>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })

