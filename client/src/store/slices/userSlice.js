import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    profile: null,
    follows: [],
    isLoading: false
}

export const signIn = createAsyncThunk('user/signIn', async (data) => {
    const local = localStorage.getItem('user')
    if(!local) {
        const response = await axios.post('http://localhost:3000/api/auth/signin', data)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
    return JSON.parse(local)
   
})

export const signUp = createAsyncThunk('user/signUp', async (data) => {
    let formData = new FormData()
    const { avatar } = data
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('avatar', avatar[0])

    const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    if(localStorage.getItem('user')) {
        localStorage.removeItem('user')
    }

    localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
})

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (data) => {
    let formData = new FormData()
    const { avatar } = data
    formData.append('avatar', avatar[0])

    const response = await axios.put(`http://localhost:3000/api/profile/update/avatar/${data.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    let local = JSON.parse(localStorage.getItem('user'))
    local.profile = response.data
    localStorage.setItem('user', JSON.stringify(local))

    return response.data
})

export const addFollow = createAsyncThunk('user/addFollow', async (data) => {
    const response = await axios.post('http://localhost:3000/api/follow/create', data)
    return response.data
})

export const getProfile = createAsyncThunk('user/getProfile', async (id) => {
    const response = await axios.get(`http://localhost:3000/api/profile/${id}`)
    return response.data
})

export const updateProfile = createAsyncThunk('user/updateProfile', async ({ id, data }) => {
    const response = await axios.put(`http://localhost:3000/api/profile/update/${id}`, data)
    
    let local = JSON.parse(localStorage.getItem('user'))
    local.profile = response.data
    localStorage.setItem('user', JSON.stringify(local))

    return response.data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user
            state.profile = action.payload.profile
            state.follows = action.payload.follows
        },
        clearUser(state) {
            localStorage.removeItem('user')
            state.user = null
        }
    },
    extraReducers: (build) => {
        build.addCase(updateAvatar.pending, state => {
            state.isLoading = true
        })

        build.addCase(updateAvatar.fulfilled, (state, action) => {
            state.profile = action.payload
        })

        build.addCase(signIn.pending, (state) => {
            state.isLoading = true
        })
        build.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.profile = action.payload.profile
            state.follows = action.payload.follows
            state.isLoading = false
        })
        build.addCase(signUp.pending, state => {
            state.isLoading = true
        })
        build.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.profile = action.payload.profile
            state.follows = action.payload.follows
            state.isLoading = false
        })
        build.addCase(getProfile.pending, state => {
            state.isLoading = true
        })
        build.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload
            state.isLoading = false
        })
        build.addCase(updateProfile.pending, state => {
            state.isLoading = true
        })
        build.addCase(updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload
            state.isLoading = false
        })
        build.addCase(addFollow.pending, state => {
            state.isLoading = true
        })
        build.addCase(addFollow.fulfilled, (state, action) => {
            state.follows.push(action.payload)
            state.isLoading = false
        })
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer