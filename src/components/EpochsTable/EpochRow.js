import _ from 'lodash';
import React from 'react';
import { Button } from 'theme-ui';

// REVIEW: probably would be better to use HEADERS array along with
// _.at (lodash) to assure row values align by column with headers
const EpochRow = ({ data, fields }) => {
  const [id, startBlock, endBlock, queryFees, totalRewards] = _.at(data, fields);

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
        {_.round(queryFees)} GRT
      </div>
      <div className="col">
        {_.round(totalRewards)} GRT

        <Button variant="fab">
          <img src="./images/Delegate.svg" />
        </Button>
      </div>
      <style jsx>
        {`
          .epoch-row {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            & :global(button) {
              visibility: hidden;
              padding: 8px;
              margin-left: auto;

              img {
                min-width: 20px;
                min-height: 10px;
              }
            }

            &:hover {
              background-color: rgba(255, 255, 255, 0.02);
              & :global(button) {
                visibility: visible;
              }
            }
          }
          .col {
            font-size: 16px;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default EpochRow;