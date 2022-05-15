import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        favorites: favoritesReducer
    }
})

export default store;