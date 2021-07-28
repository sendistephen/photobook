import {
  SEARCH_COLLECTIONS_PENDING,
  SEARCH_COLLECTIONS_SUCCESS,
  SEARCH_COLLECTIONS_ERROR,
} from './searchCollectionsTypes';

const initialState = {
  collections: [],
  page: 1,
  perPage: 25,
  isLoading: false,
  error: null,
  hasMore: true,
};

const searchCollectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COLLECTIONS_PENDING:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SEARCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: [...state.collections, ...action.payload],
        hasMore: !!action.payload.length,
        page: state.page + 1,
        isLoading: false,
        error: null,
      };
    case SEARCH_COLLECTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getPage = (state) => state.searchCollections.page;
export const getPerPage = (state) => state.searchCollections.perPage;
export default searchCollectionsReducer;
