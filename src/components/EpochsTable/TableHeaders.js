import React from 'react';
import cx from 'classnames';

// TODO: sorting
const TableHeaders = ({ headers, sortField, sortOrder, onSort }) => {
  return (
    <div className="table-header">
      {headers.map(header =>
        <div key={header}
          className={cx('col', 'smol-text', { 'active-sort-field': sortField === header })}
          onClick={() => onSort(header)}
        >
          {_.words(header).join(' ')}{sortField === header && (
            <img src={`./images/Direction-${sortOrder === 'asc' ? 'Up' : 'Down'}.svg`} />
          )}
        </div>
      )}
      <style jsx>
        {`
          .table-header {
            cursor: pointer;
            user-select: none;
          }

          .col {
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            &:hover {
              border-bottom: 1px solid rgba(255, 255, 255, 0.34);
            }
            &.active-sort-field {
              border-bottom: 1px solid rgba(255, 255, 255, 0.88);
            }

            img {
              margin-left: 8px;
              width: 8px;
              height: 8px;
            }
          }

        `}
      </style>
    </div>
  );
};

export default TableHeaders;