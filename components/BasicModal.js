import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useSWR from 'swr'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import FileSaver from 'file-saver';
import moment from 'moment';

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
    setOpen(false);
  }

  const generateDocument = async (documento, data) => {
    let hoje = moment().format("DD/MM/YYYY");
    let pescador = { ...data, data: hoje }
    try {
      const response = await fetch(documento.urlDocumento);
      const buffer = await response.arrayBuffer();
      const zip = new PizZip(buffer);
      const doc = new docxtemplater().loadZip(zip);
      doc.setData(pescador);
      doc.render();
      const output = doc.getZip().generate({ type: 'blob' });
      FileSaver.saveAs(output, documento.nomeDocumento + '.docx');
    } catch (error) {
      console.error(error);
    }
  };

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
                <Button key={doc.id} fullWidth variant="text" color='success' endIcon={<FileDownloadIcon />} onClick={() => generateDocument(doc, props.pescador)}>
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