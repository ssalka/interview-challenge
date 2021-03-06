import _ from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'

import { EPOCHES_QUERY } from '../../apollo/queries'
import TableHeaders from './TableHeaders'
import EpochRow from './EpochRow'

const PAGE_SIZE = 3

const TABLE_HEADERS = ['id', 'startBlock', 'endBlock', 'queryFees', 'totalRewards']

function bigIntToNumber(bigIntString) {
  const bigInt = BigInt(bigIntString)
  const value = Number(bigInt) / 10 ** 18

  return value
}

const EpochsTable = (props) => {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [sortField, setSortField] = useState('startBlock')
  const [sortOrder, setSortOrder] = useState('asc')

  const res = useQuery(EPOCHES_QUERY, {
    variables: {
      first: PAGE_SIZE,
      orderBy: sortField,
    },
  })
  // separate destructuring because destructuring `fetchMore` off of res causes runtime error
  const { loading, data, error } = res

  const epochs = useMemo(() => {
    if (!data) return []

    return data.epoches.map((epoch) => ({
      ...epoch,
      queryFees: bigIntToNumber(epoch.queryFees),
      totalRewards: bigIntToNumber(epoch.totalRewards),
    }))
  }, [data?.epoches])

  const handleSort = useCallback(
    (_orderBy) => {
      const orderDirection =
        _orderBy === sortField ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
      setSortField(_orderBy)
      setSortOrder(orderDirection)

      // HACK maybe I shouldn't have aliased this field in the query?
      const orderBy = _orderBy.replace('queryFees', 'queryFeeRebates')

      res.fetchMore({
        variables: {
          orderBy,
          orderDirection,
          first: epochs.length,
        },
        updateQuery(prev, { fetchMoreResult }) {
          return {
            epoches: fetchMoreResult.epoches,
          }
        },
      })
    },
    [epochs, sortField],
  )

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
  }, [epochs])

  return (
    <>
      <div className="epochs-table">
        {!(loading || error) && (
          <>
            <TableHeaders
              headers={TABLE_HEADERS}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            {epochs.map((epoch) => (
              <EpochRow
                key={epoch.id}
                data={epoch}
                fields={TABLE_HEADERS}
                sortField={sortField}
              />
            ))}
          </>
        )}
      </div>
      {/*
        REVIEW: how to get full count without pulling in all data?
        Or, is necessary to load all data up-front and only paginate on frontend? :grimacing:
        TODO: separate query that only fetches ID, but gets all of them for full count
      */}
      <div className="row-count">{epochs.length} of 94</div>
      {hasNextPage && (
        <Button variant="flat" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
      <style jsx>
        {`
          .epochs-table {
            width: 100%;
            overflow-x: auto;
          }

          .row-count {
            margin: 16px 0;
            text-align: left;
            font-size: 12px;
            color: white;
            opacity: 0.48;
          }
        `}
      </style>
      <style jsx global>
        {`
          .table-header,
          .epoch-row {
            display: flex;
            align-items: center;
            text-align: left;
          }

          .col {
            min-width: 258px;
            height: 46px;
            display: flex;
            align-items: center;
            padding: 0 12px;
          }

          .smol-text {
            text-transform: uppercase;
            font-size: 10px;
          }
        `}
      </style>
    </>
  )
}

export default EpochsTable
