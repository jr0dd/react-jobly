import React, { useState, useContext } from 'react'
import Alert from './Alert'
import JoblyApi from '../Api'
import UserContext from '../auth/UserContext'

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: ''
  })

  const [formErrors, setFormErrors] = useState([])
  const [saveConfirmed, setSaveConfirmed] = useState(false)

  const handleSubmit = async evt => {
    evt.preventDefault()

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    }

    const username = formData.username
    let updatedUser

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData)
    } catch (err) {
      setFormErrors(err)
      return
    }

    setFormData(formData => ({
      ...formData,
      password: ''
    }))
    setFormErrors([])
    setSaveConfirmed(true)
    setCurrentUser(updatedUser)
  }

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
    setFormErrors([])
  }

  return (
    <div className='col-md-6 col-lg-4 offset-md-3 offset-lg-4'>
      <h3>Profile</h3>
      <div className='card'>
        <div className='card-body'>
          <form>
            <div className='form-group'>
              <label>Username</label>
              <p className='form-control-plaintext'>{formData.username}</p>
            </div>
            <div className='form-group'>
              <label>First Name</label>
              <input
                name='firstName'
                className='form-control'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Last Name</label>
              <input
                name='lastName'
                className='form-control'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                name='email'
                className='form-control'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Confirm password to make changes:</label>
              <input
                type='password'
                name='password'
                className='form-control'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type='danger' messages={formErrors} />
              : null}

            {saveConfirmed
              ? <Alert type='success' messages={['Updated successfully.']} />
              : null}

            <button
              className='btn btn-primary btn-block mt-4'
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
