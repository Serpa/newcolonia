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

// const generateDocument = (pescadorData, docData) => {
//   console.log('Cheguei aqui 1');
//   const pescador = { ...pescadorData, data: dataAtual };
//   fetch(docData.urlDocumento)
//   .then(
//     response => response.text() // .json(), .blob(), etc.
//   ).then(
//     text => console.log(text) // Handle here
//   );
//   loadFile(
//     ,
//     function (error, content) {
//       console.log('Cheguei aqui 3');
//       console.log('Content', docData.urlDocumento);
//       if (error) {
//         console.log(error);
//         console.log(JSON.stringify(error));
//         throw error;
//       }
//       const zip = new PizZip(content);
//       const doc = new Docxtemplater().loadZip(zip);
//       console.log('Cheguei aqui 5');
//       doc.render(pescador);
//       const blob = doc.getZip().generate({
//         type: "blob",
//         mimeType:
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       });
//       console.log('Cheguei aqui 3');
//       // Output the document using Data-URI
//       saveAs(blob, "output.docx");
//     }
//   );
// };





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
    generateDocument(doc.urlDocumento,props.pescador,);
    setOpen(false);
  }

  const generateDocument = async (url, data) => {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const zip = new PizZip(buffer);
      const doc = new docxtemplater().loadZip(zip);
      doc.setData(data);
      doc.render();
      const output = doc.getZip().generate({ type: 'blob' });
      FileSaver.saveAs(output, 'document.docx');
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