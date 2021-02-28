import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { Button } from 'theme-ui';

// REVIEW: probably would be better to use HEADERS array along with
// _.at (lodash) to assure row values align by column with headers
const EpochRow = ({ data, fields, sortField }) => {
  const [id, startBlock, endBlock, queryFees, totalRewards] = _.at(data, fields);

  // REVIEW: should be mapping over `fields`, but that requires moving formatting
  // from here into the epochs useEffect in EpochsTable
  return (
    <div className="epoch-row">
      <div className={cx('col', { 'is-sort-field': sortField === 'id'})}>
        {id}
      </div>
      <div className={cx('col', { 'is-sort-field': sortField === 'startBlock'})}>
        #{startBlock}
      </div>
      <div className={cx('col', { 'is-sort-field': sortField === 'endBlock'})}>
        #{endBlock}
      </div>
      <div className={cx('col', { 'is-sort-field': sortField === 'queryFees'})}>
        {_.round(queryFees)} GRT
      </div>
      <div className={cx('col', { 'is-sort-field': sortField === 'totalRewards'})}>
        {_.round(totalRewards)} GRT

        <Button variant="fab" onClick={() => alert("Sorry, this is still TODO :'(")}>
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
            color: rgba(255, 255, 255, 0.64);

            &.is-sort-field {
              color: rgba(255, 255, 255, 0.88);
            }
          }
        `}
      </style>
    </div>
  );
};

export default EpochRow;