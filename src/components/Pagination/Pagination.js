import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Pagination = ({ pagesQuantity, currentPage, onPageChange }) => {
  const pageNeighbours = 2;
  let pagesToShow = pageNeighbours * 2 + 1;
  const pageLast = pagesQuantity;

  const pages = [];
  let pageFirst;

  if (pagesQuantity <= pagesToShow) {
    pageFirst = 1;
    pagesToShow = pagesQuantity;
  } else {
    if (currentPage <= Math.ceil(pagesToShow / 2)) {
      pageFirst = 1;
    } else if (currentPage + Math.floor((pagesToShow - 1) / 2) >= pagesQuantity) {
      pageFirst = pagesQuantity - (pagesToShow - 1);
    } else {
      pageFirst = currentPage - Math.floor(pagesToShow / 2);
    }
  }

  for (let i = 1; i <= pagesToShow; i++) {
    pages.push(pageFirst++);
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {pagesQuantity > pagesToShow &&
          <li className="pagination__item" key="first">
            <button
              className={currentPage === 1 ? "pagination__button pagination__button_disabled" : "pagination__button pagination__button_enabled"}
              type="button"
              disabled={currentPage === 1 ? true : false}
              onClick={() => onPageChange(1)}
            >
              &laquo;
            </button>
          </li>
        }
        <li className="pagination__item" key="-1">
          <button
            className={currentPage === 1 ? "pagination__button pagination__button_disabled" : "pagination__button pagination__button_enabled"}
            type="button"
            disabled={currentPage === 1 ? true : false}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
        </li>
        {pages.map(page => (
          <li className="pagination__item" key={page}>
            <button
              className={currentPage === page ? "pagination__button pagination__button_active" : "pagination__button pagination__button_enabled"}
              type="button"
              disabled={currentPage === page ? true : false}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="pagination__item" key="+1">
          <button
            className={currentPage === pageLast ? "pagination__button pagination__button_disabled" : "pagination__button pagination__button_enabled"}
            type="button"
            disabled={currentPage === pageLast ? true : false}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
        {pagesQuantity > pagesToShow &&
          <li className="pagination__item" key="last">
            <button
              className={currentPage === pageLast ? "pagination__button pagination__button_disabled" : "pagination__button pagination__button_enabled"}
              type="button"
              disabled={currentPage === pageLast ? true : false}
              onClick={() => onPageChange(pageLast)}
            >
              &raquo;
            </button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
