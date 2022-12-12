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
      if (!payload) return

      if (typeof payload === 'string') {
        state.playerList = [...state.playerList, payload]
      } else {
        const init = payload.includes('init')
        if (init) payload = payload.filter((item) => item !== 'init')
        if (state.playerList.length === payload.length) return
        state.playerList = [...payload]
        if (init) return
      }
      socket.emit('playerList', state.playerList, true)
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
