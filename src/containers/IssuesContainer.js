import React from 'react';
import { connect } from 'react-redux';
import Issues from '../components/Issues/index';
import { handlePageLimitChange, handlePageChange } from '../store/actions/IssuesActions';
import {
  getIssuesCurrentPage,
  getIssuesItemsPerPage,
  getRepositoryIssues,
  getRepositoryIssuesCount,
  getIsRepositoryIssuesFetching,
  getRepositoryError,
} from '../store/reducers/issues';

class IssuesContainer extends React.Component {
  render() {
    const { items, itemsCount, itemsPerPage, itemsCurrentPage, error, isFetching, handlePageLimitChange, handlePageChange } = this.props;
    return (
      <Issues
        items={items}
        itemsCount={itemsCount}
        itemsPerPage={itemsPerPage}
        itemsCurrentPage={itemsCurrentPage}
        error={error}
        isFetching={isFetching}
        handlePageLimitChange={handlePageLimitChange}
        handlePageChange={handlePageChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    itemsCurrentPage: getIssuesCurrentPage(state),
    itemsPerPage: getIssuesItemsPerPage(state),
    items: getRepositoryIssues(state),
    itemsCount: getRepositoryIssuesCount(state),
    isFetching: getIsRepositoryIssuesFetching(state),
    error: getRepositoryError(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePageLimitChange: (pageLimit) => dispatch(handlePageLimitChange(pageLimit)),
    handlePageChange: (page) => dispatch(handlePageChange(page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesContainer);
