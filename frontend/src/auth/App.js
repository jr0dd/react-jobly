import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import Nav from './Nav'
import Routes from './routes/Routes'
import Loading from './Loading'
import JoblyApi from './Api'
import UserContext from './auth/UserContext'
import jwt from 'jsonwebtoken'

export const tokenId = 'jobly-token'

const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [applicationIds, setApplicationIds] = useState(new Set([]))
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(tokenId)

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = jwt.decode(token)
          JoblyApi.token = token
          const currentUser = await JoblyApi.getCurrentUser(username)
          setCurrentUser(currentUser)
          setApplicationIds(new Set(currentUser.applications))
        } catch (err) {
          console.error(err)
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false)
    getCurrentUser()
  }, [token])

  const logout = () => {
    setCurrentUser(null)
    setToken(null)
  }

  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData)
      setToken(token)
      return
    } catch (err) {
      console.error(err)
    }
  }

  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData)
      setToken(token)
      return
    } catch (err) {
      console.error(err)
    }
  }

  const hasAppliedToJob = id => {
    return applicationIds.has(id)
  }

  const applyToJob = id => {
    if (hasAppliedToJob(id)) return
    JoblyApi.applyToJob(currentUser.username, id)
    setApplicationIds(new Set([...applicationIds, id]))
  }

  if (!infoLoaded) return <Loading />

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <div className='App'>
          <Nav logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
