import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    selectedPhotoId: null,
  },
  modalSlice = createSlice({
    name: 'modal',
    initialState,

    reducers: {
      showModal: (state, action) => {
        state.isOpen = true;
        state.selectedPhotoId = action.payload;
      },
      hideModal: (state) => {
        state.isOpen = false;
        state.selectedPhotoId = null;
      },
    },
  });
export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
