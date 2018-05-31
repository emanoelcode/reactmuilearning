import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from 'material-ui/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  FormControl: {
    width: 250
  }
})

export default withStyles(styles)(class extends Component {
  
  state = this.getInitState()

  getInitState() {
    const { exercise } = this.props

    return exercise ? exercise : {
      title: '',
      description: '',
      muscles: ''
    }
  }

  static getDerivedStateFromProps({exercise}) {
    return  exercise || null
  }

  //event ({ target: { value } })
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
      ...this.state
    })

    this.setState(this.getInitState())
  }

  render () {
    const { classes, muscles: categories } = this.props
    const { title, description, muscles } = this.state

    return <form>
      <TextField
        label="Title"
        value={title}
        onChange={this.handleChange('title')}
        margin="normal"
        className={classes.FormControl}
      />

      <br />
      <FormControl className={classes.FormControl}>
        <InputLabel htmlFor="muscles">
          Muscles
              </InputLabel>
        <Select
          key={muscles}
          value={muscles}
          onChange={this.handleChange('muscles')}
        >
          {categories.map(category =>
            <MenuItem
              value={category}
              key={category}
            >
              {category}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <br />
      <TextField
        multiline
        rows="4"
        label="Description"
        value={description}
        onChange={this.handleChange('description')}
        margin="normal"
        className={classes.FormControl}
      />

      <br />

      <Button
        color="primary"
        variant="raised"
        onClick={this.handleSubmit}
      >
        {this.props.exercise ? 'Edit' :'Create'}
      </Button>

    </form>
  }
})