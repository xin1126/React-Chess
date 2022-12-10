import React, { useEffect } from 'react'
import { HashRouter, useRoutes, useLocation, useNavigate } from 'react-router-dom'
import routes from './routes'
// import Footer from '@/components/Footer'
// import Heade from '@/components/Heade'

const ToHome: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  return <div></div>
}

const Element: React.FC = () => {
  const element = useRoutes(routes)

  const location = useLocation()
  const user = useSelector((state: User) => state)

  if (location.pathname !== '/' && !user.playerName) {
    return <ToHome />
  }

  return element
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="mx-auto flex h-screen max-w-[800px] flex-col pt-5">
        <Element />
      </div>
    </HashRouter>
  )
}

export default App
