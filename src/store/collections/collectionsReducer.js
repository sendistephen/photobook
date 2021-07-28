const {
  COLLECTION_FETCH_COLLECTION_PENDING,
  COLLECTION_FETCH_COLLECTION_SUCCESS,
  COLLECTION_FETCH_COLLECTION_ERROR,
  SHOW_MODAL,
} = require('./collectionsTypes');

const initialState = {
  photoCollection: [],
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
    case COLLECTION_FETCH_COLLECTION_PENDING:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case COLLECTION_FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photoCollection: [...state.photoCollection, ...action.payload],
        page: state.page + 1,
        hasMore: !!action.payload.length,
        error: null,
      };
    case COLLECTION_FETCH_COLLECTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
export const getPage = (state) => state.photoCollection.page;
export const getPerPage = (state) => state.photoCollection.perPage;
export default collectionsReducer;
