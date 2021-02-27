import React, { useCallback, useState } from 'react';
import { Button } from 'theme-ui';
import { useQuery } from '@apollo/react-hooks';

import { EPOCHES_QUERY } from '../../apollo/queries';
import TableHeaders from './TableHeaders';
import EpochRow from './EpochRow';

const PAGE_SIZE = 3;

const TABLE_HEADERS = ['id', 'startBlock', 'endBlock', 'totalRewards'];

const EpochsTable = (props) => {
  const [hasNextPage, setHasNextPage] = useState(true)

  const res = useQuery(EPOCHES_QUERY, {
    variables: {
      first: PAGE_SIZE,
    },
  });
  // separate destructuring because destructuring `fetchMore` off of res causes runtime error
  const { loading, data, error } = res

  const handleLoadMore = useCallback(() => {
    res.fetchMore({
      variables: {
        skip: epochs.length,
      },
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
  }, [epochs]);

  return (
    <>
      <div className="epochs-table">
        {!(loading || error) && (
          <>
            <TableHeaders headers={TABLE_HEADERS} sortField={sortField} sortOrder={sortOrder} />
            {epochs.map(epoch =>
              <EpochRow
                key={epoch.id}
                epoch={epoch}
                sortField={sortField}
              />
            )}
          </>
        )}
      </div>
      {/*
        REVIEW: how to get full count without pulling in all data?
        Or, is necessary to load all data up-front and only paginate on frontend? :grimacing:
      */}
      {epoches.length} of 94
      {hasNextPage && (
        <Button variant="flat" className="btn-load-more" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
      <style jsx>
        {`
          .epochs-table {
            width: 100%;
            overflow-x: auto;
          }
        `}
      </style>
      <style jsx global>
        {`
          .btn-load-more {
            margin-top: 40px;
          }

          .table-header, .epoch-row {
            display: flex;
            align-items: center;
            text-align: left;
          }

          .col {
            min-width: 258px;
            height: 46px;
          }
       `}
      </style>
    </>
  )
}

export default EpochsTable;
