import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./UserService";
import { config } from "../../../utils/axiosConfig";
import axios from "axios";



// login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// all users
export const AllUsers = createAsyncThunk(
    "auth/users",
    async (userData, thunkAPI) => {
        try {
            return await authService.getUsers();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// update user active
export const UserActive = createAsyncThunk(
    'auth/user-active',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/user/active/${id}`, {
                active: data.active,
            }, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// update user active
export const UpdateUserActive = createAsyncThunk(
    'auth/update-user-active',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/user/update-useractive/${id}`, {
                superrole: data.superrole,
            }, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);







//   logout

export const UserLogout = createAsyncThunk(
    "auth/user-logout",
    async (thunkAPI) => {
        try {
            return await authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);







const getCustomerfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const userSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.logInUser = action.payload;
                state.message = "Login Successfully!"
                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Only Admin can access";
            })
            .addCase(AllUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(AllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.allUser = action.payload;
                state.message = "All Users"
            })

            .addCase(AllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Something Went Wrong";
            })
            .addCase(UserActive.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(UserActive.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.activeUser = action.payload;
                state.message = "User has been Activated!"
            })
            .addCase(UserActive.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.error
            })
            .addCase(UserLogout.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(UserLogout.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.UserLogout = action.payload;
                state.message = "Logout Successfully"
            })
            .addCase(UserLogout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.error
            })
            .addCase(UpdateUserActive.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(UpdateUserActive.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.isSuccess = true;
                state.updateUserRole = action.payload;
                state.message = "User Role has been Activated!"
            })

            .addCase(UpdateUserActive.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.error
            })


        // .addCase(resetState, () => initialState);
    },
});



export default userSlice.reducer