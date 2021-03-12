import { createSlice } from '@reduxjs/toolkit'
import { supabase } from "../utils/api";


const usersSlice = createSlice({
    name: 'user',
    initialState: {
        user: supabase.auth.user(),
        status: 'idle',
        error: null
    },
    reducers: {
        isAuth: state => {
                const session = supabase.auth.session();
                state.user = session?.user ?? null 
        },
        updateUser: (state, action) => {
            state.user = action.payload
        }  
    }
})

export const { isAuth, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

export const userState = state => state.user.user