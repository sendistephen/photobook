import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ModalState {
  isOpen: boolean;
  selectedPhotoId: string | null;
  photos: Photo[] | Collection[];
}

interface ModalPayload {
  photoId: string;
  photos: Photo[] | Collection[];
}

const initialState: ModalState = {
    isOpen: false,
    selectedPhotoId: null,
    photos: [],
  },
  modalSlice = createSlice({
    name: 'modal',
    initialState,

    reducers: {
      showModal: (state, action: PayloadAction<ModalPayload>) => {
        state.isOpen = true;
        state.selectedPhotoId = action.payload.photoId;
        state.photos = action.payload.photos;
      },
      hideModal: (state) => {
        state.isOpen = false;
        state.selectedPhotoId = null;
        state.photos = [];
      },
    },
  });

export const { showModal, hideModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectActivePhotoId = (state: RootState) =>
  state.modal.selectedPhotoId;
export const selectModalPhotos = (state: RootState) => state.modal.photos;

export default modalSlice.reducer;
