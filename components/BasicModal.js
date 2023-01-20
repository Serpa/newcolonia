import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useSWR from 'swr'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { generateDocument } from './docxGenerate/Docx';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDoc = (doc) => {
    console.log(props.pescador);
    generateDocument(props.pescador, doc);
    setOpen(false);
  }

  const fetcher = url => fetch(url).then(r => r.json())
  const { data: documentos, error } = useSWR(`/api/documentos/`, fetcher)
  if (error)
    return (
      <div>
        <h1>404</h1>
        <p>Falha ao carregar...</p>
      </div>
    );

  if (!documentos)
    return (
      <CircularProgress style={{ display: 'flex', alignSelf: 'center' }} />
    )
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}><FilePresentIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.pescador.nome}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {documentos.map((doc) => {
              return (
                <Button key={doc.id} fullWidth variant="text" color='success' endIcon={<FileDownloadIcon />} onClick={() => handleDoc(doc)}>
                  {doc.nomeDocumento}
                </Button>
              )
            })}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}