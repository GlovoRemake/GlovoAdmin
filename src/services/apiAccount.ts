import { baseQueryWithReauth } from "@/utils/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ITokensResponse } from "@/types/token/ITokensResponse";
import type { IAccountUpdate } from "@/types/account/IAccountUpdate";
import type { IAccountLogin } from "@/types/account/IAccountLogin";
import type { IAccount } from "@/types/account/IAccount";
import { serialize } from "object-to-formdata";

export const apiAccount = createApi({
    reducerPath: "apiAccount",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Account"],
    endpoints: (builder) => ({
        login: builder.mutation<ITokensResponse, IAccountLogin>({
            query: (model) => {
                try {
                    return {
                        method: "POST",
                        url: "/Account/Login",
                        body: model
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            },
        }),
        getProfile: builder.query<IAccount, void>({
            query: () => {
                try {
                    return {
                        url: "/Account/GetProfile",
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            }
        }),
        updateProfile: builder.mutation<void, IAccountUpdate>({
            query: (model) => {
                try {
                    return {
                        method: "POST",
                        url: "/Account/update-profile",
                        body: serialize(model)
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            }
        })
    })
})

export const { 
    useLoginMutation,  
    useGetProfileQuery,
    useUpdateProfileMutation } = apiAccount;