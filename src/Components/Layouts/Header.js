import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ExerciseDialog from '../Exercises/ExerciseDialog'

//componente stateless recebe props utilizando destructuring ({ muscles, onExerciseCreate })
export default ({ muscles, onExerciseCreate, onClickMenuBotton }) =>
    <AppBar position="static">
      <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={onClickMenuBotton}>
              <MenuIcon />
          </IconButton>
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