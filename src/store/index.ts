import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import { apiAccount } from "@/services/apiAccount";
import { apiCompany } from "@/services/apiCompany";
import { apiAdmin } from "@/services/apiAdmin";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiCompany.reducerPath]: apiCompany.reducer,
        [apiAdmin.reducerPath]: apiAdmin.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(apiAccount.middleware)
            .concat(apiCompany.middleware)
            .concat(apiAdmin.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch