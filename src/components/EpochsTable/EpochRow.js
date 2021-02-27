import React from 'react';

// REVIEW: probably would be better to use HEADERS array along with
// _.at (lodash) to assure row values align by column with headers
const EpochRow = ({ epoch }) => {
  const { id, startBlock, endBlock, queryFees, totalRewards } = epoch;

  return (
    <div className="epoch-row">
      <div className="col">
        {id}
      </div>
      <div className="col">
        #{startBlock}
      </div>
      <div className="col">
        #{endBlock}
      </div>
      <div className="col">
        {queryFees} GRT
      </div>
      <div className="col">
        {totalRewards} GRT
      </div>
      <style jsx>
        {`
          .col {
            font-size: 16px;
          }
        `}
      </style>
    </div>
  );
};

export default EpochRow;