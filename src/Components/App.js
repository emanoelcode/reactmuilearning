import React, {Component, Fragment} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import {Header, Footer} from './Layouts';
import { ExerciseList } from './Exercises/ExerciseList'
import {storeMuscles, storeExercises} from '../store.js'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: storeExercises,
            exercise: {},
            editMode: false
        };
    }

    getExercisesByMuscles() {
        //define o valor inicial para mesmo se excluir todos os exercícios os grupos continuam
        const initExercises = storeMuscles.reduce((exercises, category) => ({
            ...exercises,
            [category]: []
        }), {});

        return Object.entries(
            this.state.exercises.reduce((exercises, exercise) => {
                const {muscles} = exercise;
                exercises[muscles] = [...exercises[muscles], exercise]
                // Antes de ter o valor inicial precisa ser como abaixo
                // exercises[muscles] = exercises[muscles]
                //   ? [...exercises[muscles], exercise]
                //   : [exercise]

                return exercises
            }, initExercises)
        )
    }

    handleCategorySelect = category => {
        this.setState({
            category
        })
    };

    handleExerciseSelect = id => this.setState((prevState) => ({
        exercise: prevState.exercises.find(ex => ex.id === id),
        editMode: false
    }));

    //setState recebe (prevState, props). Abaixo props não é utilizado e do prevState só nos interessa os exercicios
    handleExerciseCreate = exercise => this.setState(({exercises}) => ({
        //Atualiza o estado com a nova lista de exercícios
        exercises: [
            //utiliza spread operator "..." para adicionar ao array os exercicios que já estão na base, e com isto mantendo no componente
            ...exercises,
            //Novo exercício
            exercise
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


    render() {
        const exercises = this.getExercisesByMuscles();
        const {category, exercise, editMode} = this.state;

        return (
            <Fragment>
                {/*Componente Fragment acima evita o uso de vários divs, servido para agrupar o retorno abaixo*/}

                {/*CssBaseline Normaliza o CSS */}
                <CssBaseline/>

                <Header
                    muscles={storeMuscles}
                    onExerciseCreate={this.handleExerciseCreate}
                />

                <ExerciseList
                    exercise={exercise}
                    category={category}
                    editMode={editMode}
                    exercises={exercises}
                    muscles={storeMuscles}
                    onSelect={this.handleExerciseSelect}
                    onDelete={this.handleExerciseDelete}
                    onSelectEdit={this.handleExerciseSelectEdit}
                    onEdit={this.handleExerciseEdit}
                />

                <Footer
                    category={category}
                    muscles={storeMuscles}
                    onSelect={this.handleCategorySelect}
                />
            </Fragment>
        );
    }
}