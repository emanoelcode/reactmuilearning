import React from 'react'
import {Paper, Tabs, Tab, withWidth} from '@material-ui/core'

//withWidth adiciona no props a informação da largura da tela que está sendo utilizada para visualizar o app
export default withWidth()(({storeMuscles, muscleSelected, onSelect, width}) => {

    //Obtem o indese do muscle selecionado
    const index = (muscleSelected ? storeMuscles.findIndex(group => group === muscleSelected) + 1 : 0);

    const onIndexSelect = (e, index) =>
        onSelect(index === 0 ? '' : storeMuscles[index - 1]);

    return (
        <Paper>
            <Tabs
                value={index}
                onChange={onIndexSelect}
                indicatorColor="primary"
                textColor="primary"
                centered={width !== 'xs'}
                scrollable={width === 'xs'}
            >
                <Tab label="ALL"/>
                {storeMuscles.map(muscle =>
                    <Tab key={muscle} label={muscle}/>
                )}
            </Tabs>
        </Paper>
    );
})