import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setErrorLogin } from '../../../actions/notif'

class Danger extends Component {
  componentWillUnmount() {
    this.props.setErrorLogin({show: false})
  }

  render() {
    const { className, message } = this.props
    return (
      <div className={`alert alert-danger ${className}`} role="alert">
        {message}
      </div>
    )
  }
}

const mapDispatchToProps = { setErrorLogin }
export default connect(null, mapDispatchToProps)(Danger)