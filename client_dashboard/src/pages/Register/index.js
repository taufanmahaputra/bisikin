import React, { Component } from 'react'
import RegisterForm from '../../components/Form/RegisterForm'

class Register extends Component {
  render() {
    return (
      <RegisterForm onSubmit={this._onSubmitRegisterForm}/>
    )
  }

  _onSubmitRegisterForm = (values) => {
    //TODO: dispatch to request api
    console.log(values)
  }
}

export default Register