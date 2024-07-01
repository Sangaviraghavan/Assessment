import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slice';

const store = configureStore({
    reducer: {
        item: itemReducer,
    },
});

export default store;
