import React from 'react';
import PropTypes from 'prop-types';
import IssuesList from '../IssuesList/index';
import './styles.scss';

export default class Issues extends React.Component {
  setPage = page => {
    const { handlePageChange } = this.props;
    handlePageChange(page);
  }

  render() {
    const {
      items,
      itemsCount,
      error,
      isFetching,
      itemsCurrentPage,
      itemsPerPage,
      handlePageLimitChange,
    } = this.props;

    if (!error && !isFetching && (!items || items.length === 0)) {
      return null;
    }

    return (
      <div className="issues">
        {error &&
          <div className="issues__error">
            <p>
              Во время запроса произошла ошибка:
              <br/>
              <span className="issues__error-value">
                {error}
              </span>
            </p>
          </div>
        }
        {isFetching &&
          <div className="issues__loader">
            <p>Загрузка...</p>
          </div>
        }
        {items && items.length > 0 &&
          <div className="issues__list">
            <IssuesList
              items={items}
              itemsCount={itemsCount}
              itemsPerPage={itemsPerPage}
              itemsCurrentPage={itemsCurrentPage}
              setPage={this.setPage}
              handlePageLimitChange={handlePageLimitChange}
            />
          </div>
        }
      </div>
    );
  }
}

Issues.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handlePageLimitChange: PropTypes.func.isRequired,
};

Issues.defaultProps = {
  error: ""
};
