import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    streams: [],
    stream: null,
    isLoading: false
}

export const getStreams = createAsyncThunk('streams/getStreams', async () => {
    const response = await axios.get('http://localhost:3000/api/stream')
    const session = sessionStorage.setItem('streams', JSON.stringify(response.data))
    return response.data
})

const streamsSlice = createSlice({
    name: 'streams',
    initialState,
    reducers: {
        changeStreamName(state, action) {
            state.streams.forEach(stream => {
                if(stream.streamId === action.payload.id) {
                    stream.streamName = action.payload.streamName
                }
            })
        },

        addNewStream(state, action) {
            state.streams.push(action.payload)
        },

        deleteStream(state, action) {
            state.streams = action.payload
            if(state.streams.length === 0) {
                state.streams = []
            }
        }
    },
    extraReducers: (build) => {
        build.addCase(getStreams.pending, state => {
            state.isLoading = true
        })
        build.addCase(getStreams.fulfilled, (state, action) => {
            state.streams = action.payload
            state.isLoading = false
        })
    }
})

export const { changeStreamName, addNewStream, deleteStream } = streamsSlice.actions
export default streamsSlice.reducer