import axios from "axios";
import { getUserCollections, getUserUrl } from "utils/api";
import {
	USER_FETCH_USER_PENDING,
	USER_FETCH_USER_SUCCESS,
	USER_FETCH_USER_ERROR,
	USER_FETCH_USER_PHOTOS_ERROR,
	USER_FETCH_USER_PHOTOS_PENDING,
	USER_FETCH_USER_PHOTOS_SUCCESS,
	OPEN_MODAL,
	USER_FETCH_USER_COLLECTIONS_PENDING,
	USER_FETCH_USER_COLLECTIONS_SUCCESS,
	USER_FETCH_USER_COLLECTIONS_ERROR,
	USER_CLEAR_USER_PHOTOS,
} from "./userTypes";
import { getUserPhotosUrl } from "utils/api";
import { getPage, getPerPage } from "./userReducer";

export const fetchUser = (username) => async (dispatch) => {
	try {
		dispatch({
			type: USER_FETCH_USER_PENDING,
		});

		const url = getUserUrl(username);
		const res = await axios(url);
		const data = res.data;
    console.log(url)
		dispatch({
			type: USER_FETCH_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_FETCH_USER_ERROR,
			payload: error.message,
		});
	}
};
export const fetchUserPhotos = (username) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_FETCH_USER_PHOTOS_PENDING,
		});

		const url = getUserPhotosUrl({
			username,
			page: getPage(getState()),
			perPage: getPerPage(getState()),
		});
		console.log(getPerPage(getState()));
		console.log(url);
		const res = await axios(url);
		const data = res.data;
		console.log(data);
		dispatch({
			type: USER_FETCH_USER_PHOTOS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_FETCH_USER_PHOTOS_ERROR,
			payload: error.message,
		});
	}
};

export const getUserCollection = (username) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_FETCH_USER_COLLECTIONS_PENDING,
		});
		this.setState({ isLoading: false });
		const url = getUserCollections({
			username,
			page: getPage(getState()),
			perPage: getPerPage(getState()),
		});
		const res = await axios(url);
		const data = res.data;
		dispatch({
			type: USER_FETCH_USER_COLLECTIONS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_FETCH_USER_COLLECTIONS_ERROR,
			payload: error.message,
		});
	}
};
export const clearPhotos = () => (dispatch) => {
	dispatch({
		type: USER_CLEAR_USER_PHOTOS,
	});
};
export const handleModal = (index) => (dispatch) => {
	dispatch({
		type: OPEN_MODAL,
		payload: index,
	});
};
