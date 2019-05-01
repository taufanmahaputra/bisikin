import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { onClickLoginButtonSubmit } from '../../actions/auth'
import LoginForm from '../../components/Form/LoginForm'

class Login extends Component {
  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.replace('/dashboard')
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this._onSubmitLoginForm}/>
    )
  }

  _onSubmitLoginForm = (values) => {
    this.props.onClickLoginButtonSubmit(values)
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.app.loggedIn
  }
}
const mapDispatchToProps = { replace, onClickLoginButtonSubmit }

export default connect(mapStateToProps, mapDispatchToProps)(Login)