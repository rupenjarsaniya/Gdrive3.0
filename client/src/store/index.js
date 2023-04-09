import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./reducers/web3Slice";

export default configureStore({
    reducer: {
        web3: web3Reducer,
    },
});
