import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  })
  return errors
}

const renderTextField = ({ label,
                           type,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    error={touched && invalid}
    type={type}
    margin="normal"
    variant="outlined"
    fullWidth
    required
    {...input}
    {...custom}
  />
)

class LoginForm extends Component {

  render() {
    const { handleSubmit, errorLogin } = this.props
    return (
      <div className='container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='text-center'>
            <img src='https://i.imgur.com/CeIhNSt.png' className='rounded logo' />
            <h4 className='logo-text pt-3'>Log in to Bisikin</h4>
          </div>
          {errorLogin.show && <AlertDanger className='row mt-3' message={errorLogin.message}/>}
          <div className='row'>
            <Field name='input'
                   component={renderTextField}
                   label='Email or username'
                   type='text' />
          </div>
          <div className='row'>
            <Field name='password'
                   component={renderTextField}
                   label='Password'
                   type='password' />
          </div>
          <div className='row pt-3'>
            <Button variant='contained'
                    color='secondary'
                    type='submit'
                    size='large'
                    fullWidth >
              <span className='login-text'> Log in</span>
            </Button>
          </div>
          <div className='row pt-5'>
            <div className='col align-self-center text-center'>
              <Link to="/signup">Sign up for Bisikin</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const form = {
  form: 'login',
  enableReinitialize: true,
  validate
}

const mapStateToProps = (state) => {
  return {
    errorLogin: state.notif.errorLogin
  }
}

export default connect(mapStateToProps)(reduxForm(form)(LoginForm))