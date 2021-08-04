const {
  PHOTO_FETCH_PHOTO_PENDING,
  PHOTO_FETCH_PHOTO_SUCCESS,
  PHOTO_FETCH_PHOTO_ERROR,
  PHOTO_FETCH_PHOTO_TOPIC_SUCCESS,
  PHOTO_FETCH_PHOTO_TOPIC_PENDING,
  PHOTO_FETCH_PHOTO_TOPIC_ERROR,
  SHOW_MODAL,
} = require('./photoTypes');

const initialState = {
  photo: {},
  topic: {},
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
    case PHOTO_FETCH_PHOTO_TOPIC_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case PHOTO_FETCH_PHOTO_TOPIC_SUCCESS:
      return {
        ...state,
        topic: action.payload,
      };
    case PHOTO_FETCH_PHOTO_TOPIC_ERROR:
      return {
        ...state,
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
