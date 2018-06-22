import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

export default ( props ) =>
    <Fragment>
        <Drawer
            open={props.open}
            onClose={props.onClose}
        >
            <div
                tabIndex={0}
                role="button"
            >
                <div>
                    <List>
                        <ListItem button component={Link} to="/todo">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Teste emanoel" />
                        </ListItem>
                        <ListItem button component={Link} to="/trainingSchedule">
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Send mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                </div>
            </div>
        </Drawer>
    </Fragment>