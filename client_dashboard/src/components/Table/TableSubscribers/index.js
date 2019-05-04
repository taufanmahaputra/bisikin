import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import classnames from 'classnames'

const styles = theme => ({
  table: {
    witdh: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: 600
    })
  },
  tableShrink: {
    width: '65%'
  }
})

class TableSubscribers extends Component {
  render() {
    const { selectedID, subscribers, onClickRow, expanded, classes} = this.props

    return (
      <Table className={classnames(classes.table, {
        [classes.tableShrink]: expanded
      })}>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Line</TableCell>
            <TableCell align="right">Telegram</TableCell>
            <TableCell align="right">Whatsapp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribers.map((subs, idx) =>
            <TableRow key={idx}
                      hover
                      onClick={() => onClickRow(subs)}
                      selected={subs.id === selectedID}>
              <TableCell > {subs.full_name} </TableCell>
              <TableCell align="right">{subs.username}</TableCell>
              <TableCell align="right">{subs.active_line ? '✓' : '-'}</TableCell>
              <TableCell align="right">{subs.active_telegram ? '✓' : '-'}</TableCell>
              <TableCell align="right">{subs.active_whatsapp ? '✓' : '-'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(TableSubscribers)