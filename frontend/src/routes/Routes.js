import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import CompanyList from './companies/CompanyList'
import JobList from './jobs/JobList'
import CompanyDetail from './companies/CompanyDetail'
import LoginForm from '../forms/LoginForm'
import ProfileForm from '../forms/ProfileForm'
import SignupForm from '../forms/SignupForm'
import PrivateRoute from './PrivateRoute'

const Routes = ({ login, signup }) => {
  return (
    <div className='pt-5'>
      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/login'>
          <LoginForm login={login} />
        </Route>

        <Route exact path='/signup'>
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path='/companies'>
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path='/jobs'>
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path='/companies/:handle'>
          <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute path='/profile'>
          <ProfileForm />
        </PrivateRoute>

        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Routes
