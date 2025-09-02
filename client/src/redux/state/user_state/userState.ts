import { createSlice } from "@reduxjs/toolkit";
import { UserForAuth } from "../../../types/user";

interface UserState {
	user: UserForAuth | null;
}

const initialState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, actions) => {
			state.user = actions.payload.user;
		},
		removeUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
