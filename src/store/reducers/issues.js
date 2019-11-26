import {
  SET_CURRENT_REPOSITORY,
  SET_ITEMS_CURRENT_PAGE,
  SET_PAGE_LIMIT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAIL,
  FETCH_ITEMS_SUCCESS,
} from '../actions/IssuesActions';

const initialState = {
  currentRepository: '',
  repositories: {},
  itemsPerPage: 10,
  currentPage: 1,
};

const initialRepositoryState = {
  items: '',
  itemsCount: '',
  isFetching: false,
  errorMessage: '',
};

function repositoryReducer(state = initialRepositoryState, action, rootState) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };

    case FETCH_ITEMS_SUCCESS:
      const items = [...state.items];
      const newItems = action.payload.items;
      for (let i = 0, len = newItems.length; i < len; i++) {
        items[i + (rootState.itemsPerPage * (rootState.currentPage - 1))] = newItems[i];
      }
      return {
        ...state,
        isFetching: false,
        errorMessage: '',
        items,
        itemsCount: action.payload.total_count,
      };

    case FETCH_ITEMS_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
}

export function issuesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_REPOSITORY:
      return {
        ...state,
        currentRepository: action.payload,
      };

    case SET_ITEMS_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case SET_PAGE_LIMIT:
      return {
        ...state,
        itemsPerPage: action.payload
      };

    case FETCH_ITEMS_REQUEST:
    case FETCH_ITEMS_SUCCESS:
    case FETCH_ITEMS_FAIL:
      return {
        ...state,
        repositories: {
          ...state.repositories,
          [action.repository]: repositoryReducer(state.repositories[action.repository], action, state),
        },
      };

    default:
      return state;
  }
}

export function getCurrentRepository(state) {
  return state.issues.repository;
}

export function getIssuesCurrentPage(state) {
  return state.issues.currentPage;
}

export function getIssuesItemsPerPage(state) {
  return state.issues.itemsPerPage;
}

export function getRepositoryIssues(state) {
  const { currentRepository, itemsPerPage, currentPage } = state.issues;
  const { repositories } = state.issues;
  if (currentRepository && currentRepository in repositories) {
    const { items } = repositories[currentRepository];
    const firstItemIndex = itemsPerPage * (currentPage - 1);
    return items.slice(firstItemIndex, (firstItemIndex + itemsPerPage));
  } else {
    return null;
  }
}

export function getRepositoryIssuesCount(state) {
  const { currentRepository } = state.issues;
  if (currentRepository && currentRepository in state.issues.repositories) {
    return state.issues.repositories[currentRepository].itemsCount;
  } else {
    return null;
  }
}

export function getIsRepositoryIssuesFetching(state) {
  const { currentRepository } = state.issues;
  if (currentRepository && currentRepository in state.issues.repositories) {
    return state.issues.repositories[currentRepository].isFetching;
  } else {
    return false;
  }
}

export function getRepositoryError(state) {
  const { currentRepository } = state.issues;
  if (currentRepository && currentRepository in state.issues.repositories) {
    return state.issues.repositories[currentRepository].errorMessage;
  } else {
    return null;
  }
}
