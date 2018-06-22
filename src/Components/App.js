import React, {Component, Fragment} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import {Header, Footer} from './Layouts';
import { ExerciseList } from './Exercises/ExerciseList'
import {storeMuscles, storeExercises} from '../store.js'
import Menu from "./Menu";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: storeExercises,
            exercise: {},
            editMode: false,
            menuOpened: false
        };
    }

    getExercisesByMuscles() {

        //define o valor inicial para mesmo se excluir todos os exercícios os grupos continuam
        const initExercises = storeMuscles.reduce((newEmptyListExerciseByMuscle, muscle) => {
            return ({
                ...newEmptyListExerciseByMuscle,
                [muscle]: []
            })}, {}
        );

        return Object.entries(
            this.state.exercises.reduce((newListExerciseByMuscle, ex) => {
                const {muscles} = ex;
                newListExerciseByMuscle[muscles] = [...newListExerciseByMuscle[muscles], ex];
                return newListExerciseByMuscle;
            }, initExercises)
        )
    }

    handleMuscleSelect = muscleSelected => {
        this.setState({
            muscleSelected
        })
    };

    handleExerciseSelect = id => this.setState((prevState) => ({
        exercise: prevState.exercises.find(ex => ex.id === id),
        editMode: false
    }));

    //setState recebe (prevState, props). Abaixo props não é utilizado e do prevState só nos interessa os exercicios
    handleExerciseCreate = newExercise => this.setState(({exercises}) => ({
        //Atualiza o estado com a nova lista de exercícios
        exercises: [
            //utiliza spread operator "..." para adicionar ao array os exercicios que já estão na base, e com isto mantendo no componente
            ...exercises,
            //Novo exercício
            newExercise
        ]
    }));

    handleExerciseDelete = id => this.setState(({exercises, exercise, editMode}) => ({
        exercises: exercises.filter(ex => ex.id !== id),
        editMode: (exercise.id === id ? false : editMode),
        exercise: (exercise.id === id ? {} : exercise)
    }));

    handleExerciseSelectEdit = id => this.setState(({exercises}) => ({
        exercise: exercises.find(ex => ex.id === id),
        editMode: true
    }));

    handleExerciseEdit = exercise => this.setState(({exercises}) => ({
        exercises: [
            ...exercises.filter(ex => ex.id !== exercise.id),
            exercise
        ],
        exercise
    }));

    handleMenuDrawer = () => {
        this.setState({ menuOpened: !this.state.menuOpened });
    };

    render() {
        const exercises = this.getExercisesByMuscles();
        const {muscleSelected, exercise, editMode} = this.state;

        return (
            <BrowserRouter>
            <Fragment>
                {/*Componente Fragment acima evita o uso de vários divs, servido para agrupar o retorno abaixo*/}

                {/*CssBaseline Normaliza o CSS */}
                <CssBaseline/>

                <Menu
                    open={this.state.menuOpened}
                    onClose={this.handleMenuDrawer}
                />

                <Header
                    muscles={storeMuscles}
                    onExerciseCreate={this.handleExerciseCreate}
                    onClickMenuBotton={this.handleMenuDrawer}
                />

                <ExerciseList
                    exercise={exercise}
                    muscleSelected={muscleSelected}
                    editMode={editMode}
                    exercises={exercises}
                    storeMuscles={storeMuscles}
                    onSelect={this.handleExerciseSelect}
                    onDelete={this.handleExerciseDelete}
                    onSelectEdit={this.handleExerciseSelectEdit}
                    onEdit={this.handleExerciseEdit}
                />

                <Footer
                    muscleSelected={muscleSelected}
                    storeMuscles={storeMuscles}
                    onSelect={this.handleMuscleSelect}
                />
            </Fragment>
            </BrowserRouter>
        );
    }
}