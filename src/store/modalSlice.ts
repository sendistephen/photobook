import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ModalState {
  isOpen: boolean;
  selectedPhotoId: string | null;
}

const initialState: ModalState = {
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
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectActivePhotoId = (state: RootState) =>
  state.modal.selectedPhotoId;

export default modalSlice.reducer;
