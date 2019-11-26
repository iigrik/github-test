export const SET_CURRENT_REPOSITORY = 'SET_CURRENT_REPOSITORY';
export const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';
export const SET_PAGE_LIMIT = 'SET_PAGE_LIMIT';
export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_FAIL = 'FETCH_ITEMS_FAIL';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';

const setCurrentRepository = data => ({
  type: SET_CURRENT_REPOSITORY,
  payload: data,
});

const setIssuesCurrentPage = page => ({
  type: SET_ITEMS_CURRENT_PAGE,
  payload: page,
});

const setPageLimit = value => ({
  type: SET_PAGE_LIMIT,
  payload: value,
});

const fetchIssuesRequest = repository => ({
  type: FETCH_ITEMS_REQUEST,
  repository,
});

const fetchIssuesSuccess = (repository, data) => ({
  type: FETCH_ITEMS_SUCCESS,
  repository,
  payload: data,
});

const fetchIssuesFail = (repository, errorMessage) => ({
  type: FETCH_ITEMS_FAIL,
  repository,
  errorMessage: errorMessage,
});

const fetchIssues = (currentRepository, itemsPerPage, currentPage) => (dispatch, getState) => {
  dispatch(fetchIssuesRequest(currentRepository));

  // fetch(`https://api.github.com/repos/${userName}/${repositoryName}/issues?page=0&per_page=5`, {
  fetch(`https://api.github.com/search/issues?q=repo:${currentRepository}+type:issue+state:open&page=${currentPage}&per_page=${itemsPerPage}`, {
    method: "GET"
  })
    .then(
      response => response.json(),
      error => {
        console.log('An error occurred.', error);
        dispatch(fetchIssuesFail(error));
      }
    )
    .then(json => {
      if (json.errors) {
        const message = json.message || "Error";
        const { errors } = json;
        let errorMessage = "";
        if (errors && errors[0]) {
          errorMessage = errors[0].message;
        } else {
          errorMessage = message;
        }
        dispatch(fetchIssuesFail(currentRepository, errorMessage));
      } else {
        dispatch(fetchIssuesSuccess(currentRepository, json));
      }
    });
};

function shouldFetchIssues(state, currentRepository, itemsPerPage, currentPage) {
  const { repositories } = state.issues;
  const repositoryExists = currentRepository in repositories;

  if (!repositoryExists) {
    return true;
  } else {
    const repositoryIsFetching = repositories[currentRepository].isFetching;
    const repositoryIssues = repositories[currentRepository].items || [];
    const fetchingIssuesFirstIndex = itemsPerPage * (currentPage - 1);
    let repositoryHasFetchingIssues = true;

    for (let i = fetchingIssuesFirstIndex, len = (fetchingIssuesFirstIndex + itemsPerPage); i < len; i++) {
      if (typeof repositoryIssues[i] === "undefined") {
        repositoryHasFetchingIssues = false;
        break;
      }
    }

    if (!repositoryIsFetching && !repositoryHasFetchingIssues) {
      return true;
    }
  }

  return false;
}

const fetchIssuesIfNeeded = (currentRepository, itemsPerPage, currentPage) => (dispatch, getState) => {
  if (shouldFetchIssues(getState(), currentRepository, itemsPerPage, currentPage)) {
    return dispatch(fetchIssues(currentRepository, itemsPerPage, currentPage));
  }
}

export const handleSubmit = (author, name) => (dispatch, getState) => {
  const { itemsPerPage, currentPage } = getState().issues;
  const repository = `${author}/${name}`;
  dispatch(setCurrentRepository(repository));
  if (currentPage !== 1) {
    dispatch(setIssuesCurrentPage(1));
  }
  dispatch(fetchIssuesIfNeeded(repository, itemsPerPage, 1));
}

export const handlePageLimitChange = (pageLimit) => (dispatch, getState) => {
  const { currentRepository, currentPage } = getState().issues;
  dispatch(setPageLimit(pageLimit));
  dispatch(fetchIssuesIfNeeded(currentRepository, pageLimit, currentPage));
}

export const handlePageChange = (page) => (dispatch, getState) => {
  const { currentRepository, itemsPerPage, currentPage } = getState().issues;
  if (currentPage !== page) {
    dispatch(setIssuesCurrentPage(page));
  }
  dispatch(fetchIssuesIfNeeded(currentRepository, itemsPerPage, page));
}
