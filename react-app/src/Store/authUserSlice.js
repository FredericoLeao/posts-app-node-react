import { createSlice } from "@reduxjs/toolkit"

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState: {
        value: { isLoguedIn: false },
    },
    reducers: {
        setIsLoguedIn: (state, value) => {
            state.value.isLoguedIn = value.payload
        }
    }
})

export const { setIsLoguedIn } = authUserSlice.actions

export default authUserSlice.reducer