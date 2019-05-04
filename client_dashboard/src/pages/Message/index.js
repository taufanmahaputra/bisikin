import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { replace } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import { pageRequest, onClickSendMessage } from '../../actions/message'

import TableSubscribers from '../../components/Table/TableSubscribers'
import SubscriberDetail from '../../components/Card/SubscriberDetail'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
})


class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      messageDetail: {}
    }
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      return this.props.replace('/login')
    }

    this.props.pageRequest()
  }

  render() {
    const { expanded, messageDetail } = this.state
    const { classes, subscribers } = this.props

    return (<div className={'container-fluid'}>
      <div className={'row justify-content-end'}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}>
          Send a message
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}>
          Send multicast message
        </Button>
      </div>
      <Divider className={'mt-3'}/>
      <div className={'row justify-content-start'}>
        <TableSubscribers
          selectedID={messageDetail.id}
          onClickRow={this._onClickRow}
          subscribers={subscribers}
          expanded={expanded}/>
        <SubscriberDetail
          onSubmit={this._handleSubmitSendMessage}
          onClose={this._onClickCloseButton}
          subs={messageDetail}
          expanded={expanded}/>
      </div>
    </div>)
  }

  _onClickRow = (subs) => {
    if (!this.state.expanded) {
      this.setState({ expanded: !this.state.expanded })
    }
    this.setState({ messageDetail: subs })
  }

  _onClickCloseButton = () => {
    this.props.reset('messageDetail')
    this.setState({ expanded: false, messageDetail: {} })
  }

  _handleSubmitSendMessage = (values) => {
    this.props.onClickSendMessage(this.state.messageDetail.username, values.input)
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.app.loggedIn,
    subscribers: state.message.subscribers
  }
}
const mapDispatchToProps = { reset, replace, pageRequest, onClickSendMessage }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Message))