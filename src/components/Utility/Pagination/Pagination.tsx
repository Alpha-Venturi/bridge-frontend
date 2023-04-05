import React, { FunctionComponent, useState, useEffect } from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { PaginationType } from '../../../util/types';

type PaginationProps = {
  pagination: PaginationType;
  setPagination: Function;
};

const PaginationElement: FunctionComponent<PaginationProps> = ({ pagination, setPagination, children }) => {
  let pageLimit = 4;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pageLimit);

  useEffect(() => {
    if (pagination.size <= pageLimit) {
      pageLimit = pagination.size;
    }

    if (pagination.page - 1 >= 0 && pagination.page + 1 !== pagination.totalPages) {
      if (pagination.page === 1) {
        setStart(pagination.page - 1);
      } else {
        setStart(pagination.page - 2);
      }
    }

    if (pagination.page + 3 >= pageLimit) {
      if (pagination.page === 1) {
        setEnd(pagination.page + 3);
      } else {
        setEnd(pagination.page + 2);
      }
      pageLimit = end;
      if (pagination.size <= pageLimit) {
        pageLimit = pagination.size;
      }
    }
  }, [pagination.page]);

  let paginationElement = [];

  for (let i = 0; i < pagination.totalPages; i++) {
    if (i >= start && i < end) {
      paginationElement.push(
        <PaginationItem key={`p${i}`} className={pagination.page === i ? 'active' : ''}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();

              setPagination((values: PaginationType) => {
                return { ...values, page: i };
              });
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  return (
    <Pagination className="pagination justify-content-start mb-0" listClassName="justify-content-end mb-0">
      <PaginationItem className={pagination.page === 0 ? 'disabled' : ''}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();

            setPagination((values: PaginationType) => {
              return { ...values, page: pagination.page - 1 };
            });
          }}
          // tabIndex="-1"
        >
          <i className="fas fa-angle-left" />
          <span className="sr-only">Previous</span>
        </PaginationLink>
      </PaginationItem>

      {paginationElement}
      <PaginationItem className={pagination.page === pagination.totalPages - 1 ? 'disabled' : ''}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            setPagination((values: PaginationType) => {
              return { ...values, page: pagination.page + 1 };
            });
          }}
        >
          <i className="fas fa-angle-right" />
          <span className="sr-only">Next</span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationElement;
