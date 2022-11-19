import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playerName: '',
  playerList: []
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state: User, action) => {
      state.playerName = action.payload
    },
    setList: (state: User, action) => {
      state.playerList = [...state.playerList, action.payload]
    },
  },
})

export const { setName, setList } = user.actions
export default user.reducer
