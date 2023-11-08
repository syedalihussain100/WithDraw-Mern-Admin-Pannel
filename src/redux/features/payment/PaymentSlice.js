import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { paymentService } from "./PaymentService";

// get payment

export const getPayment = createAsyncThunk("payment/get-data", async (thunkAPI) => {
    try {
        return await paymentService.getAllPaymentData();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// get details
export const getPaymentDetails = createAsyncThunk("payment/get-details", async (id, thunkAPI) => {
    try {
        return await paymentService.getPaymentDetails(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


//   upload video
export const videoForm = createAsyncThunk(
    "payment/upload-video",
    async (formData, thunkAPI) => {
        try {
            return await paymentService.videoUpload(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get videos

export const getvideos = createAsyncThunk("payment/get-video", async (thunkAPI) => {
    try {
        return await paymentService.getVideos();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


// get video id

export const getvideoId = createAsyncThunk("payment/get-video-id", async (id, thunkAPI) => {
    try {
        return await paymentService.getVideoId(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


// delete video id

export const deletevideoId = createAsyncThunk("payment/delete-video-id", async (id, thunkAPI) => {
    try {
        return await paymentService.deleteVideoId(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});








const initialState = {
    payment: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPayment.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.payment = action.payload;
            })
            .addCase(getPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getPaymentDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPaymentDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.paymentdetails = action.payload;
            })
            .addCase(getPaymentDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(videoForm.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(videoForm.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.video = action.payload;
                state.message = "Your Video has been Uploaded!"
            })
            .addCase(videoForm.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getvideos.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(getvideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.videos = action.payload;
                state.message = "All Videos"
            })

            .addCase(getvideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getvideoId.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(getvideoId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getvideo = action.payload;
                state.message = "Get Video"
            })

            .addCase(getvideoId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deletevideoId.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(deletevideoId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletevideo = action.payload;
                state.message = "your Video has been deleted"
            })
            .addCase(deletevideoId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
});




export default paymentSlice.reducer