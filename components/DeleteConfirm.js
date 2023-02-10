import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export default function DeleteConfirm(props) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const sucessMSG = () => {
        enqueueSnackbar('Cadastrado atualizado com sucesso!', { variant: 'success' });
    };

    const errorMSG = () => {
        enqueueSnackbar('Erro ao alterar!', { variant: 'error' });
    };

    const confirmRemove = () => {
        fetch("/api/pescadores/delete", {
            method: 'POST',
            body: JSON.stringify(props.pescador),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((response) => {
                if (response.status === 200) {
                    setOpen(false);
                    sucessMSG()
                    router.push('/')
                } else {
                    errorMSG()
                    setOpen(false);
                }

            })
            .catch((response) => { console.log(response) });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="button" variant="contained" color='error' onClick={handleClickOpen} style={{ width: "300px" }}>Excluir</Button>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Deseja excluir o usuário {props.pescador.nome}?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ao confirmar a exclusão, o cadastro se tornará inativo, porem permanecerá no banco de dados.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={confirmRemove} autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}