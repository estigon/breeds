import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: INITIAL_STATE,
    reducers: {
        addFavorite: (state, action) => {
            state.push(action.payload);
        },
        deleteFavorite: (state, action) => {
            return state.filter(item => item.id !== action.payload.id );
        }
    }
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
