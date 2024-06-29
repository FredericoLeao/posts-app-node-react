import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUserSlice'

export default configureStore({
    reducer: {
        authUser: authUserReducer,
    },
})
