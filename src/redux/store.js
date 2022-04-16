import {
    configureStore
} from '@reduxjs/toolkit';
import {
    loginReducer
} from './Reducers';
import { setupListeners } from '@reduxjs/toolkit/query';
import {pokemonApi } from './postData';

const store = configureStore({
    reducer: {
        loginReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})


export default store;
setupListeners(store.dispatch);