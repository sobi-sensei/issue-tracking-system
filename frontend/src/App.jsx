import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

import LoginLanding from './pages/LoginLanding'
import LoginForm from './components/LoginForm'
import './App.css'

axios.defaults.withCredentials = true

const App = () => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me')
        setUser(response.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser();
  }, [])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/login' element={ <LoginLanding/> } />
        <Route path='/login/admin' element={ <LoginForm role='admin' title='Admin Portal' subtitle='Sign in to manage your crew' setUser={setUser}/> } />
        <Route path='/login/member' element={ <LoginForm role='member' title='Member Portal' subtitle='Sign in to access your account'/> } />
      </Routes>
    </>
  )
}

export default App
