import {
  SEARCH_PHOTOS_ERROR,
  SEARCH_PHOTOS_PENDING,
  SEARCH_PHOTOS_SUCCESS,
  SHOW_MODAL,
  SEARCH_CLEAR_PHOTOS,
  SEARCH_COLLECTIONS_PENDING,
  SEARCH_COLLECTIONS_SUCCESS,
  SEARCH_CLEAR_COLLECTIONS,
  SEARCH_COLLECTIONS_ERROR,
  SEARCH_ACTIVE_TAB,
} from './searchTypes';

const initialState = {
  photos: [],
  collections: [],
  activeTab: '',
  page: 1,
  perPage: 25,
  isLoading: false,
  error: null,
  hasMore: true,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SEARCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        hasMore: !!action.payload.length,
        page: state.page + 1,
        isLoading: false,
        error: null,
      };
    case SEARCH_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_CLEAR_PHOTOS:
      return {
        ...state,
        photos: [],
      };
    case SHOW_MODAL:
      return {
        ...state,
        index: action.payload,
      };
    case SEARCH_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
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
    case SEARCH_CLEAR_COLLECTIONS:
      return {
        ...state,
        collections: [],
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

export const getPage = (state) => state.search.page;
export const getPerPage = (state) => state.search.perPage;
export default searchReducer;
