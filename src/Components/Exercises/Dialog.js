import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add } from '@material-ui/icons'
import Form from './Form'

export default class extends Component {

  state = {
    open: false
  }


  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleFormSubmit = exercise => {
    this.handleToggle()

    this.props.onCreate(exercise)

  }

  render() {
    const { open } = this.state,
      { muscles, onCreate } = this.props

    return <Fragment>
      <Button variant="fab" onClick={this.handleToggle} mini>
        <Add />
      </Button>
      <Dialog
        open={open}
        onClose={this.handleToggle}
      >
        <DialogTitle>
          Create a new Exercise
      </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below.
        </DialogContentText>
        <Form 
          muscles={muscles}
          onSubmit={this.handleFormSubmit}
        />
        </DialogContent>
      </Dialog>
    </Fragment>
  }
}