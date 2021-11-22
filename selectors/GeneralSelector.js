import { createSelector } from "@reduxjs/toolkit";

const generalSelector = (state) => state.general;

const loading = (action) => createSelector(
    generalSelector,
    general => Boolean(general.loading.find(item => item === action))
);

export const GeneralSelector = {
    loading
};