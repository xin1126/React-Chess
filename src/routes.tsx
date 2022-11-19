import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from './pages/home/index'
import Lobby from './pages/lobby/index'
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
    path: '/about',
    element: <About />,
  },
]

export default routes
