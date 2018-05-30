import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts';
import Exercises from './Exercises'
import { muscles, exercises } from '../store.js'

export default class extends Component {
  state = {
    exercises,
    exercise: {},
    editMode: false

  }

  getExercisesByMuscles() {

    //define o valor inicial para mesmo se excluir todos os exercícios os grupos continuam
    const initExercises = muscles.reduce((exercises, category) => ({
      ...exercises,
      [category]: []
    }), {})

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
      const { muscles } = exercise
      exercises[muscles] = [...exercises[muscles], exercise]
      // Antes de ter o valor inicial precisa ser como abaixo
      // exercises[muscles] = exercises[muscles] 
      //   ? [...exercises[muscles], exercise]
      //   : [exercise]

      return exercises
      }, initExercises)
    )
  }

  handleCategorySelected = category => {
    this.setState({
      category
    })
  }

  handleExerciseSelected = id => {
    this.setState((prevState) => ({
      exercise: prevState.exercises.find(ex => ex.id === id),
      editMode: false
    }))
  }

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
        exercises: [
          ...exercises,
          exercise
        ]
    }))
  }

  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: false,
      exercise: {}
    }))
  }

  handleExerciseSelectEdit = id => 
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }))

  handleExerciseEdit = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      exercise
    }))
  }

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise, editMode } = this.state

    return <Fragment>
        <Header 
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises 
          exercise={exercise}
          category={category}
          editMode={editMode}
          exercises={exercises}
          muscles={muscles}
          onSelect={this.handleExerciseSelected}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
        />

        <Footer 
          category={category}
          muscles={muscles} 
          onSelect={this.handleCategorySelected}
        />
      </Fragment>
  }
} 