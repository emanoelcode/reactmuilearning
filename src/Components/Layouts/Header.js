import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import ExerciseDialog from '../Exercises/ExerciseDialog'

//componente stateless recebe props utilizando destructuring ({ muscles, onExerciseCreate })
export default ({ muscles, onExerciseCreate }) =>
    <AppBar position="static">
      <Toolbar>
          {/* flex: 1 faz com que o Botão do dialog fique no canto direito*/}
        <Typography variant="headline" color="inherit" style={{flex: 1}}>
          Exercise Database
        </Typography>
        <ExerciseDialog
          muscles={muscles}
          onCreate={onExerciseCreate}
        />
      </Toolbar>
    </AppBar>