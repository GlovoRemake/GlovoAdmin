import { baseQueryWithReauth } from "@/utils/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IRequestCompany } from "@/types/company/IRequestCompany";
import type { IApprovalCompany } from "@/types/company/IApprovalCompany";
import type { IPagedRes } from "@/types/api/IPagedRes";

export const apiCompany = createApi({
    reducerPath: "apiCompany",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Requests"],
    endpoints: (builder) => ({
        getAllRequestCompany: builder.query<IPagedRes<IRequestCompany, "requests">, {pageNumber: number, pageSize: number}>({
            query: (model) => {
                try {
                    return {
                        method: "GET",
                        url: `/Company/all?PageNumber=${model.pageNumber}&PageSize=${model.pageSize}`
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            },
            providesTags: ["Requests"]
        }),
        approveRequest: builder.mutation<void, IApprovalCompany>({
            query: (model) => {
                try {
                    return {
                        method: "POST",
                        url: "/Company/approval",
                        body: model
                    }
                } catch {
                    throw new Error("Помилка перетворення данних");
                }
            },
            invalidatesTags: ["Requests"]
        })
    })
})

export const { useGetAllRequestCompanyQuery, useApproveRequestMutation } = apiCompany;