import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/room',
    element: <Room />,
  },
];

export default routes;
