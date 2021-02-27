import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'theme-ui';
import { useQuery } from '@apollo/react-hooks';

import { EPOCHES_QUERY } from '../../apollo/queries';
import TableHeaders from './TableHeaders';
import EpochRow from './EpochRow';

const PAGE_SIZE = 3;

const TABLE_HEADERS = ['id', 'startBlock', 'endBlock', 'queryFees', 'totalRewards'].map(
  field => _.words(field).join(' ')
);

function bigIntToNumber(bigIntString) {
  const bigInt = BigInt(bigIntString);
  const value = Number(bigInt) / (10 ** 18);

  return value;
}

const EpochsTable = (props) => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sortField, setSortField] = useState(TABLE_HEADERS[0]);
  const [sortOrder, setSortOrder] = useState('asc');

  const res = useQuery(EPOCHES_QUERY, {
    variables: {
      first: PAGE_SIZE,
    },
  });
  // separate destructuring because destructuring `fetchMore` off of res causes runtime error
  const { loading, data, error } = res;

  const epochs = useMemo(() => {
    if (!data) return [];

    return data.epoches.map(epoch => ({
      ...epoch,
      queryFees: bigIntToNumber(epoch.queryFees),
      totalRewards: bigIntToNumber(epoch.totalRewards),
    }));
  }, [data?.epoches]);


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
      {epochs.length} of 94
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
