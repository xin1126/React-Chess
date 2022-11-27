import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from './pages/home/index'
import Lobby from './pages/lobby/index'
import Room from './pages/room/index'
import About from './pages/about/index'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/lobby',
    element: <Lobby />,
  },
  {
    path: '/room/:name',
    element: <Room />,
  },
  {
    path: '/about',
    element: <About />,
  },
]

export default routes
