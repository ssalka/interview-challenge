import { Button, Box, Flex } from 'theme-ui'
import { useState, useEffect } from 'react'
import { withApollo } from '../apollo/client'
import EpochsTable from '../components/EpochsTable'

const Index = () => {
  return (
    <Box
      sx={{
        pt: '48px',
        // TODO mobile-specific spacing
        m: '0 64px',
        textAlign: 'center',
      }}
    >
      <Flex className="search-row" mb={16}>
        <h1>Indexers</h1>
        <div id="search-bar">
          <img src="./images/Search.svg" />
          TODO: Search
        </div>
      </Flex>
      <EpochsTable />
      <style jsx>
        {`
          /* FIXME: should use \`Flex\` component props, but they don't seem to be applying... */
          :global(.search-row) {
            gap: 16px;
            align-items: center;
          }

          #search-bar {
            border-left: 1px solid #ccc;
            padding-left: 8px;

            img {
              margin-right: 4px;
            }
          }
        `}
      </style>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
