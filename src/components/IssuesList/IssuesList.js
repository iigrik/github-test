import React from 'react';
import PropTypes from 'prop-types';
import IssuePreview from '../IssuePreview/index';
import Pagination from '../Pagination/index';
import { getDateFormatted } from '../../utils/date';
import './styles.scss';

const IssuesList = ({ items, itemsCount, itemsPerPage, itemsCurrentPage, setPage, handlePageLimitChange }) => {
  const onPageLimitChange = e => {
    handlePageLimitChange(e.target.value);
  };
  const pagesQuantity = Math.ceil(itemsCount / itemsPerPage);
  const pageLimit = itemsPerPage || 10;
  const listItems = items.map(itemData => {
    const { id, title, url } = itemData;
    const dateFormatted = getDateFormatted(itemData.created_at);

    return (
      <li className="issues-list__item" key={id}>
        <IssuePreview id={id.toString()} title={title} url={url} date={dateFormatted} />
      </li>
    );
  });

  return (
    <div className="issues-list">
      <div className="issues-list__select-block">
        <select className="issues-list__select" value={pageLimit} onChange={onPageLimitChange}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="80">80</option>
        </select>
      </div>

      <ul className="issues-list__items">
        {listItems}
      </ul>

      {items.length && pagesQuantity > 1 &&
        <div className="issues-list__pagination">
          <Pagination pagesQuantity={pagesQuantity} currentPage={itemsCurrentPage} onPageChange={setPage} />
        </div>
      }
    </div>
  );
};

export default IssuesList;

IssuesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  itemsCurrentPage: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
};

IssuesList.defaultProps = {
  itemsCount: 0,
  itemsPerPage: 10,
  itemsCurrentPage: 1,
};
