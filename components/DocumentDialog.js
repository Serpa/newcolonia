
import { AddIcCallOutlined, PersonPinCircleOutlined } from '@mui/icons-material'
import { Avatar, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Docx from './docxGenerate/Docx'

const fetcher = url => fetch(url).then(r => r.json())



export default function DocumentDialog(props) {

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const { data: documentos, error } = useSWR(`/api/documentos/`, fetcher)

    if (error)
        return (
            <div>
                <h1>404</h1>
                <p>Loading failed...</p>
            </div>
        );

    if (!documentos)
        return (
            <CircularProgress style={{ display: 'flex', alignSelf: 'center' }} />
        )
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {documentos.map((doc) => (
                    <Docx key={doc.id} doc={doc} pescador={props.pescador}>
                        <ListItem disableGutters >
                            <ListItemButton onClick={() => handleListItemClick(doc)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonPinCircleOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={doc.nomeDocumento} />
                            </ListItemButton>
                        </ListItem>
                    </Docx>
                ))}

                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcCallOutlined />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Dialog >
    )
}
