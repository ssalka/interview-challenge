import React, { useCallback, useState } from 'react'
import { Button } from 'theme-ui'
import { EPOCHES_QUERY } from '../apollo/queries'
import { useQuery } from '@apollo/react-hooks'

const PAGE_SIZE = 3

const EpochsTable = (props) => {
  const [hasNextPage, setHasNextPage] = useState(true)

  const res = useQuery(EPOCHES_QUERY, {
    variables: {
      first: PAGE_SIZE,
    },
  })
  // separate destructuring because destructuring `fetchMore` off of res causes runtime error
  const { loading, data, error } = res

  const handleLoadMore = useCallback(() => {
    res.fetchMore({
      first: PAGE_SIZE,
      skip: data.epoches.length,
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          setHasNextPage(false)
          return prev
        }
        return {
          ...prev,
          epoches: prev.epoches.concat(fetchMoreResult.epoches),
        }
      },
    })
  }, [data])

  return (
    <>
      <div className="epochs-table">
        <div>TODO: Table Here</div>
      </div>
      {!(loading || error) &&
        // REVIEW: pretty sure `epoches` is not the correct spelling
        data.epoches.map((item, i) => <div>item {i}</div>)}
      {hasNextPage && (
        <Button variant="flat" className="btn-load-more" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
      <style jsx>
        {`
          .epochs-table {
            background-color: red;
          }

          :global(.btn-load-more) {
            margin-top: 40px;
          }
        `}
      </style>
    </>
  )
}

export default EpochsTable
