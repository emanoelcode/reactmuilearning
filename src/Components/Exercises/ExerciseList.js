import React, {Fragment} from 'react'
import {Grid, Paper, Typography, List, IconButton} from '@material-ui/core'
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core/'
import {Delete, Edit} from '@material-ui/icons'
import ExerciseForm from './ExerciseForm'
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    Paper: {
        padding: 20,
        marginTop: 5,
        height: 500,
        overflowY: 'auto'
    }
});

const ExerciseListComponent =
    ({
         //classes vem pelo uso do withStyles    t
         classes,
         exercises,
         storeMuscles,
         muscleSelected,
         editMode,
         exercise,
         exercise: {
             id,
             title = 'Welcome!',
             description = 'Please select an exercise from the list on the left.'
         },
         onSelect,
         onDelete,
         onSelectEdit,
         onEdit
     }) => (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.Paper}>
                    {exercises.map(([group, exercises]) =>
                        !muscleSelected || muscleSelected === group
                            ? (
                                <Fragment key={group}>
                                    <Typography
                                        variant="headline"
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {group}
                                    </Typography>
                                    <List component="nav">
                                        {exercises.map(({id, title}) =>
                                            <ListItem
                                                key={id}
                                                button
                                                onClick={() => onSelect(id)}
                                            >
                                                <ListItemText
                                                    primary={title}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => onSelectEdit(id)}>
                                                        <Edit/>
                                                    </IconButton>
                                                    <IconButton onClick={() => onDelete(id)}>
                                                        <Delete/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </List>
                                </Fragment>
                            )
                            : (null)
                    )}
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.Paper}>
                    {editMode
                        ? <ExerciseForm
                            exercise={exercise}
                            muscles={storeMuscles}
                            onSubmit={onEdit}
                        />
                        : <Fragment>
                            <Typography
                                variant="display1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="subheading"
                                style={{marginTop: 20}}
                            >
                                {description}
                            </Typography>
                        </Fragment>
                    }
                </Paper>
            </Grid>
        </Grid>
    );

//Exporta com nome fixo, por isto precisa ser importado com
// import { ExerciseList } from './Exercises/ExerciseList' e com nome exato, se fosse export default poderia ser
// importado sem {} e com qualquer nome import ExerciseListaMelhor from './Exercises/ExerciseList'
export const ExerciseList = withStyles(styles)(ExerciseListComponent);