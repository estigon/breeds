import { createSlice, configureStore } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    name: '',
    email: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
});

export const { setName, setEmail } = userSlice.actions;
export default userSlice.reducer;
