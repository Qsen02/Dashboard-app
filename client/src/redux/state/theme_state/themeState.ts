import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../../types/user";
import { getThemeData, setThemeData } from "../../../utils/userHelper";

interface themeState {
	theme: Theme | null;
}

const initialState: themeState = {
	theme: getThemeData() || "light",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggle: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
			setThemeData(state.theme);
		},
	},
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
