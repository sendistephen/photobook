const {
  PHOTO_FETCH_PHOTO_PENDING,
  PHOTO_FETCH_PHOTO_SUCCESS,
  PHOTO_FETCH_PHOTO_ERROR,
  SHOW_MODAL,
} = require('./photoTypes');

const initialState = {
  photo: {},
  isLoading: false,
  error: '',
  index: -1,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_FETCH_PHOTO_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case PHOTO_FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        photo: action.payload,
        isloading: false,
        error: false,
      };
    case PHOTO_FETCH_PHOTO_ERROR:
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
export default photoReducer;