import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../../types/user";

interface themeState {
	theme: Theme;
}

const initialState: themeState = {
	theme: "light",
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {},
});

export default themeSlice.reducer;
