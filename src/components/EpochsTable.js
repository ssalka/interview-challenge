import React from 'react'
import { Button } from 'theme-ui'

const EpochsTable = (props) => {
  // TODO: pagination
  const hasMore = true

  return (
    <>
      <div className="epochs-table">
        <div>TODO: Table Here</div>
      </div>
      {hasMore && (
        <Button variant="flat" className="btn-load-more">
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
