import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ExitToApp } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import { signOut } from 'next-auth/react';

export default function ExitConfirm() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        setOpen(false);
        signOut()
    };

    return (
        <>
            <IconButton color="inherit" onClick={() => handleClickOpen()}>
                <ExitToApp>
                    <NotificationsIcon />
                </ExitToApp>
            </IconButton>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Deseja sair?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleConfirm} autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}