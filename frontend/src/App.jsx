import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import LoginLanding from './pages/LoginLanding'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/login' element={ <LoginLanding/> } />
        <Route path='/login/admin' element={ <LoginForm/> } />
        <Route path='/login/member' element={ <LoginForm/> } />
      </Routes>
    </>
  )
}

export default App
