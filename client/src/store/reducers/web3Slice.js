import { createSlice } from "@reduxjs/toolkit";
export const web3Slice = createSlice({
    name: "web3",
    initialState: {
        provider: {},
        account: "",
        contract: {},
    },
    reducers: {
        setProvider: (state, { payload }) => {
            state.provider = payload;
        },
        setAccount: (state, { payload }) => {
            state.account = payload;
        },
        setContract: (state, { payload }) => {
            state.contract = payload;
        },
    },
});

export const { setProvider, setAccount, setContract } = web3Slice.actions;
export default web3Slice.reducer;
