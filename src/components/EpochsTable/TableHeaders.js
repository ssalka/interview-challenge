import React from 'react';

// TODO: sorting
const TableHeaders = ({ headers }) => {
  return (
    <div className="table-header">
      {headers.map(header =>
        <div className="col" key={header}>
          {header}
        </div>
      )}
      <style jsx>
        {`
        .table-header {
          text-transform: uppercase;
          font-size: 10px;
        }
        `}
      </style>
    </div>
  );
};

export default TableHeaders;