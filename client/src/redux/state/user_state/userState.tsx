import { createSlice } from "@reduxjs/toolkit";
import { UserForAuth } from "../../../types/user";

interface UserState {
	user: UserForAuth | null;
}

const initialState: UserState = {
    user: null
}

const userSlice=createSlice({
    name: "user",
    initialState,
    reducers:{}
});

export default userSlice.reducer;
