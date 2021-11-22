import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
    name: "general",
    initialState: {
        loading: [],
        success: [],
        errors: []
    },
    reducers: {
        addLoading: (state, action) => {
            state.loading = [...state.loading, action.payload];
        },
        removeLoading: (state, action) => {
            state.loading = state.loading.filter(item => item !== action.payload);
        }
    }
});

export default GeneralSlice;