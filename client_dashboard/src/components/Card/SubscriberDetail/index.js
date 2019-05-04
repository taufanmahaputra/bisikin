import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import classnames from 'classnames'

const styles = theme => ({
  card: {
    boxShadow: '0px 9px 21px -9px rgba(0,0,0,0.15)',
    border: '.5px solid',
    borderRadius: 20,
    borderColor: '#aaaaaa',
    margin: 10,
    width: '0%',
    visibility: 'hidden',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: 300
    })
  },
  cardExpanded: {
    visibility: 'visible',
    position: 'absolute',
    right: 0,
    transitionDelay: 225,
    opacity: 1,
    width: '28.5%'
  },
  disabled: {
    color: '#000000'
  },
})

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
    margin="normal"
    variant="outlined"
    rows="5"
    rowsMax="10"
    multiline
    fullWidth
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
)

class SubscriberDetail extends Component {
  render() {
    const { handleSubmit, subs, expanded, classes, onClose} = this.props

    const renderToField = (
      <TextField
        label="To"
        style={{
          borderColor: '#000',
          color: '#000'
        }}
        placeholder={`${subs.full_name} (${subs.username})`}
        disabled
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{
          classes: {
            disabled: classes.disabled,
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    )

    const isMessageEmpty = this.props.input === undefined

    return (
      <div className={classnames(classes.card, 'pt-3', 'pb-4', {
        [classes.cardExpanded]: expanded
      })}>
        <form onSubmit={handleSubmit}>
        <CardContent>
          {renderToField}

          <Field name='input'
                 component={renderTextField}
                 label='Message'
                 type='text'/>
        </CardContent>
        <CardActions className={'mr-2 justify-content-end'}>
          <Button size="small"
                  color="primary"
                  variant='outlined'
                  onClick={onClose}>
            Close
          </Button>
          <Tooltip title='Please fill in the message field'
                   disableFocusListener={!isMessageEmpty}
                   disableHoverListener={!isMessageEmpty}
                   disableTouchListener={!isMessageEmpty}>
            <div>
              <Button size="small"
                      color="primary"
                      variant='contained'
                      type='submit'
                      disabled={isMessageEmpty}>
                Send
              </Button>
            </div>
          </Tooltip>
        </CardActions>
        </form>
      </div>
    )
  }
}

const form = {
  form: 'messageDetail',
  enableReinitialize: true
}

const selector = formValueSelector('messageDetail')
const mapStateToProps = (state) => {
  return {
    input: selector(state, 'input')
  }
}
export default connect(mapStateToProps, null)(reduxForm(form)(withStyles(styles)(SubscriberDetail)))