import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {details:'' },
    reducers: {
        sercices:(state,action)=>{
            state.details = action.payload
        }
        
    },

});

export const {sercices} = userSlice.actions;
export default userSlice.reducer;
