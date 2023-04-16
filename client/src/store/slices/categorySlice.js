import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    categories: null,
    isLoading: false
}

export const getCategories = createAsyncThunk('category/getCategories', async () => {
    const response = await axios.get('http://localhost:3000/api/category')
    localStorage.setItem('categories', JSON.stringify(response.data))
    return response.data
})

export const updateCategory = createAsyncThunk('category/updateStreamCategory', async (data) => {
    const response = await axios.put(`http://localhost:3000/api/stream/update/${data.streamKey}`, data)
    return response.data
})

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload
        }
    },
    extraReducers: (build) => {
        build.addCase(getCategories.pending, state => {
            state.isLoading = true
        })
        build.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isLoading = false
        })
    }
})

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer