
import { AddIcCallOutlined, PersonPinCircleOutlined, Router } from '@mui/icons-material'
import { Avatar, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Docx from './docxGenerate/Docx'
import { useRouter } from 'next/router';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';

const fetcher = url => fetch(url).then(r => r.json())



export default function DocumentDialog(props) {

    const { onClose, selectedValue, open } = props;
    const router = useRouter();

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
            <DialogTitle style={{ display: 'flex', alignSelf: 'center' }} >Documentos</DialogTitle>
            <List sx={{ pt: 0 }}>
                {documentos.map((doc) => (
                    <Docx key={doc.id} doc={doc} pescador={props.pescador}>
                        <ListItem disableGutters >
                            <ListItemButton onClick={() => handleListItemClick(doc)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <InsertDriveFileIcon />
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
                        onClick={() => router.push('/documentos')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Adicionar Documento" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Dialog >
    )
}
