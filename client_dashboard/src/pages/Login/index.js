import React, { Component } from 'react'
import LoginForm from '../../components/Form/LoginForm'

class Login extends Component {
  render() {
    return (
      <LoginForm onSubmit={this._onSubmitLoginForm}/>
    )
  }

  _onSubmitLoginForm = (values) => {
    //TODO: dispatch to request api
    console.log(values)
  }
}

export default Login