const {
  COLLECTION_FETCH_PHOTO_COLLECTION_ERROR,
  COLLECTION_FETCH_PHOTO_COLLECTION_SUCCESS,
  COLLECTION_FETCH_PHOTO_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS,
  COLLECTION_FETCH_SINGLE_COLLECTION_ERROR,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_SUCCESS,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_PENDING,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_ERROR,
  COLLECTION_CLEAR_USER_COLLECTION,
  SHOW_MODAL,
} = require('./collectionsTypes');

const initialState = {
  userPhotoCollection: [],
  collections: [],
  collection: {},
  hasMore: true,
  isLoading: false,
  index: -1,
  page: 1,
  perPage: 30,
  error: null,
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_FETCH_PHOTO_COLLECTION_PENDING:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case COLLECTION_FETCH_PHOTO_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userPhotoCollection: [...state.userPhotoCollection, ...action.payload],
        page: state.page + 1,
        hasMore: !!action.payload.length,
        error: null,
      };
    case COLLECTION_FETCH_PHOTO_COLLECTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case COLLECTION_FETCH_SINGLE_COLLECTION_PENDING:
      return {
        ...state,
        error: null,
      };
    case COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: action.payload,
        error: null,
      };
    case COLLECTION_FETCH_SINGLE_COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case COLLECTIONS_FETCH_PHOTO_COLLECTIONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case COLLECTIONS_FETCH_PHOTO_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collections: [...state.collections, ...action.payload],
      };
    case COLLECTIONS_FETCH_PHOTO_COLLECTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case COLLECTION_CLEAR_USER_COLLECTION:
      return {
        ...state,
        userPhotoCollection: [],
      };
    case SHOW_MODAL:
      return {
        ...state,
        index: action.payload,
      };
    default:
      return state;
  }
};
export const getPage = (state) => state.collections.page;
export const getPerPage = (state) => state.collections.perPage;
export default collectionsReducer;
