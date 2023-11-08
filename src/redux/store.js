import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user/UserSlice";
import paymentReducer from "./features/payment/PaymentSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer
  },
});