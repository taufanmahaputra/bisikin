import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AlertDanger from '../../../components/Alert/Danger'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'input',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
  })
  return errors
}

const renderTextField = ({
                           label,
                           type,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    error={touched && invalid}
    type={type}
    helperText={touched && error}
    margin="normal"
    variant="outlined"
    required
    fullWidth
    {...input}
    {...custom}
  />
)

class RegisterForm extends Component {

  render() {
    const { handleSubmit, errorAlert } = this.props
    return (
      <div className='container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='text-center'>
            <img src='https://i.imgur.com/CeIhNSt.png' className='rounded logo'/>
            <h4 className='logo-text pt-3'>Sign up to Bisikin</h4>
          </div>
          {errorAlert.show && <AlertDanger className='row mt-3' message={errorAlert.message}/>}
          <div className='row'>
            <div className='col'>
              <Field name='token'
                     component={renderTextField}
                     label='Company Username'
                     type='text'
                     helperText='This username will be used as an identification to your target user.'/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <Field name='first_name'
                     component={renderTextField}
                     label='First Name'
                     type='text'/>
            </div>
            <div className='col-sm'>
              <Field name='last_name'
                     component={renderTextField}
                     label='Last Name'
                     type='text'/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <Field name='company_name'
                     component={renderTextField}
                     label='Company Name'
                     type='text'/>
            </div>
            <div className='col-sm'>
              <Field name='url'
                     component={renderTextField}
                     label='Company URL'
                     type='url'/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <Field name='email'
                     component={renderTextField}
                     label='Email'
                     type='email'/>
            </div>
            <div className='col-sm'>
              <Field name='password'
                     component={renderTextField}
                     label='Password'
                     type='password'/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <Field name='phone'
                     component={renderTextField}
                     label='Phone'
                     type='tel'/>
            </div>
            <div className='col-sm'>
              <Field name='mobile_phone'
                     component={renderTextField}
                     label='Mobile Phone'
                     type='tel'/>
            </div>
          </div>
          <div className='row pt-3'>
            <Button variant='contained'
                    color='secondary'
                    type='submit'
                    size='large'
                    fullWidth>
              <span className='login-text'> Sign up</span>
            </Button>
          </div>
          <div className='row pt-5'>
            <div className='col align-self-center text-center'>
              <Link to="/login">Already have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const form = {
  form: 'register',
  validate
}

const mapStateToProps = (state) => {
  return {
    errorAlert: state.notif.errorAlert
  }
}

export default connect(mapStateToProps)(reduxForm(form)(RegisterForm))