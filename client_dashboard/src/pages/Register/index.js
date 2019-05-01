import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { onClickSignupBUttonSubmit } from '../../actions/auth'
import RegisterForm from '../../components/Form/RegisterForm'

class Register extends Component {
  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.replace('/dashboard')
    }
  }

  render() {
    return (
      <RegisterForm onSubmit={this._onSubmitRegisterForm}/>
    )
  }

  _onSubmitRegisterForm = (values) => {
    this.props.onClickSignupBUttonSubmit(values)
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.app.loggedIn
  }
}
const mapDispatchToProps = { replace, onClickSignupBUttonSubmit }

export default connect(mapStateToProps, mapDispatchToProps)(Register)