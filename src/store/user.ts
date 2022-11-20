import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playerName: '',
  playerList: [],
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state: User, action) => {
      state.playerName = action.payload
    },
    setList: (state: User, action) => {
      if (typeof action.payload === 'string') {
        state.playerList = [...state.playerList, action.payload]
      } else {
        state.playerList = [...action.payload]
      }
    },
  },
})

export const { setName, setList } = user.actions
export default user.reducer
