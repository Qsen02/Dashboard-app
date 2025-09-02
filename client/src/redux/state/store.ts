import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/user_state/userState";
import themeReducer from "../state/theme_state/themeState"

export const store = configureStore({
	reducer: {
		user: userReducer,
		theme: themeReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
