import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

const socket = io()
const initialState = {
  playerName: '',
  playerList: [],
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state: User, { payload }: { payload: string }) => {
      state.playerName = payload
    },
    setList: (state: User, { payload }: { payload: string | Array<string> }) => {
      if (typeof payload === 'string') {
        state.playerList = [...state.playerList, payload]
      } else {
        state.playerList = [...payload]
      }
    },
    handleLeavePlayer: (state: User, { payload }: { payload: string }) => {
      if (payload !== null) {
        const remainPlayer = state.playerList.filter((item) => item !== payload)
        socket.emit('playerList', remainPlayer)
        state.playerList = [...remainPlayer]
      }
    },
  },
})

export const { setName, setList, handleLeavePlayer } = user.actions
export default user.reducer
