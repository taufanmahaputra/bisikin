import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setErrorAlert } from '../../../actions/notif'

class Danger extends Component {
  componentWillUnmount() {
    this.props.setErrorAlert({show: false})
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

const mapDispatchToProps = { setErrorAlert }
export default connect(null, mapDispatchToProps)(Danger)