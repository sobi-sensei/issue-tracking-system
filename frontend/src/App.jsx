import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

import LoginLanding from './pages/LoginLanding'
import LoginForm from './components/LoginForm'
import Landing from './pages/Landing'
import RegisterForm from './components/RegisterForm'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import './App.css'

axios.defaults.withCredentials = true

const App = () => {

  const [user, setUser] = useState(null)
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
        <Route
          path='/' 
          element={
            user 
              ? <Navigate to='/dashboard' /> 
              : <Navigate to='/auth' />}/>

        <Route 
          path='/auth' 
          element={<Landing />}/>

        <Route 
          path='/login' 
          element={ <LoginLanding mode='login'/> }/>

        <Route 
          path='/login/admin' 
          element={ 
            <LoginForm 
              role='admin' 
              title='Admin Portal'
              subtitle='Sign in to manage your crew' 
              setUser={setUser}/> 
          } />

        <Route 
          path='/login/member' 
          element={
            <LoginForm 
              role='member' 
              title='Member Portal'
              subtitle='Sign in to access your account' 
              setUser={setUser} />
          } />

        <Route 
          path='/register' 
          element={
          <LoginLanding mode='register' />} />
        
        <Route 
          path='/register/admin' 
          element={
            <RegisterForm 
              role='admin' 
              title='Admin Registration'
              subtitle='Create your admin account'
              setUser={setUser} />
          }/>

        <Route 
          path='/register/member' 
          element={
            <RegisterForm 
              role='member' 
              title='Member Registration'
              subtitle='Create your member account' 
              setUser={setUser} />
            }/>
        
        <Route
          path='/dashboard'
          element={
            user
              ? <Layout user={user} />
              : <Navigate to='/login' />
          }
        >
          <Route
            index
            element={<Dashboard/>}
          />
        </Route>

      </Routes>
    </>
  )
}

export default App
