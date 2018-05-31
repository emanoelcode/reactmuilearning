import React, {Component, Fragment} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Add} from '@material-ui/icons'
import ExerciseForm from './ExerciseForm'

export default class ExerciseDialog extends Component {

    //Esta é uma forma alternativa de definir o valor inicial de state sem precisar implementar o constructor
    state = {
        open: false
    };

    //{} não são necessários após o => pois é somente uma instrução
    handleToggle = () => this.setState({
        open: !this.state.open
    });

    handleFormSubmit = exercise => {
        this.handleToggle();
        this.props.onCreate(exercise);
    };

    render() {
        const {open} = this.state;
        const {muscles} = this.props;

        return (
            <Fragment>

                <Button variant="fab" onClick={this.handleToggle} mini>
                    <Add/>
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
                        <ExerciseForm
                            muscles={muscles}
                            onSubmit={this.handleFormSubmit}
                        />
                    </DialogContent>
                </Dialog>

            </Fragment>
        );
    }
}