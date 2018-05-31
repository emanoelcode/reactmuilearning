import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    FormControl: {
        width: 250
    }
});

class ExerciseFormComponent extends Component {

    state = this.getInitState();

    getInitState() {
        const {exercise} = this.props;

        return exercise ? exercise : {
            title: '',
            description: '',
            muscles: ''
        }
    }

    //acionado no ciclo de vida do react quando está montando o componente. Recebe (props, state)
    static getDerivedStateFromProps({exercise}) {
        //Se o exercise for undefined retorna null
        return exercise || null;
    }

    handleChange = name => (event) => {
        const {target: {value}} = event;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = () => {
        //cria o id para o novo exercício
        const id = this.state.title.toLocaleLowerCase().replace(/ /g, '-');

        //Aciona a função onSubmit recebida via props, passando o novo objeto exercício
        this.props.onSubmit({
            id: id,
            ...this.state
        });

        //Define os valores iniciais para o state, desta forma, se for criação, limpa o formulário
        this.setState(this.getInitState())
    };

    render() {
        const {classes, muscles: categories} = this.props;
        const {title, description, muscles} = this.state;

        return (
            <form>
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

                <br/>

                <Button
                    color="primary"
                    variant="raised"
                    onClick={this.handleSubmit}
                >
                    {this.props.exercise ? 'Edit' : 'Create'}
                </Button>

            </form>
        );
    }
}

export default withStyles(styles)(ExerciseFormComponent);