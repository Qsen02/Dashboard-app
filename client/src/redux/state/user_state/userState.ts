import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserForAuth } from "../../../types/user";
import { getUserData, removeUserData, setUserData } from "../../../utils/userHelper";

interface UserState {
	user: UserForAuth | null;
}

const initialState: UserState = {
	user: getUserData(),
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, actions: PayloadAction<UserForAuth>) => {
			state.user = actions.payload;
            setUserData(actions.payload);
		},
		removeUser:(state) => {
			state.user = null;
            removeUserData();
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
