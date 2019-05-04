import React, { Component } from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import DashboardIcon from '@material-ui/icons/DashboardRounded'
import MessageIcon from '@material-ui/icons/MessageRounded'
import Message from '../../pages/Message'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  test: {
    color: theme.palette.common.white
  },
  drawerMenu: {
    position: 'relative',
    backgroundColor: '#0e2f44',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  listItem: {
    '&:focus': {
      backgroundColor: '#673ab7'
    },
    '&:hover': {
      backgroundColor: '#673ab7'
    }
  },
  listItemText: {
    color: '#fff'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  }
})

class Layout extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerMenu)
          }}
          open
        >
          <Divider/>
          <List component="nav">
            {['Dashboard', 'Message'].map((item, idx) => (
              <ListItem
                key={idx}
                button
                className={classes.listItem}
                component={Link}
                to={item.toLowerCase()}>
                <ListItemIcon
                  classes={{
                    root: classes.listItemText
                  }}>
                  {item === 'Dashboard' ? <DashboardIcon/> : <MessageIcon/>}
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.listItemText
                  }}
                  primary={item}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
            <Route path='/message' component={Message} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)