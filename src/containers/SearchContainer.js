import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search/index';
import { handleSubmit } from '../store/actions/IssuesActions';
import {
  getIsRepositoryIssuesFetching,
} from '../store/reducers/issues';

class SearchContainer extends React.Component {
  handleSubmit = (userValue, repositoryValue) => {
    if (userValue && repositoryValue) {
      const { handleSubmit } = this.props;
      handleSubmit(userValue, repositoryValue);
    }
  }

  render() {
    const { error, isFetching } = this.props;
    return (
      <Search
        error={error}
        isFetching={isFetching}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: getIsRepositoryIssuesFetching(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (userName, repositoryName) => dispatch(handleSubmit(userName, repositoryName)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
