import { Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import Dashboard from '../../components/Dashboard';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react"
import { DataGrid, GridToolbar, ptBR } from '@mui/x-data-grid';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import moment from 'moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalInfo from '../../components/ModalInfo';

const fetcher = url => fetch(url).then(r => r.json())

export default function Documentos() {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset } = useForm();
  const [tableDate, setTableData] = useState([]);
  const { data: documentos, error } = useSWR(`/api/documentos/`, fetcher, { refreshInterval: 1000 })
  const router = useRouter();

  useEffect(() => {
    if (documentos) {
      setTableData(documentos)
    }
  }, [documentos])

  const columns = [
    { field: 'nomeDocumento', headerName: 'Nome', flex: 1 },
    {
      field: 'dataCriacao', headerName: 'Data de cadastro', renderCell: (cellValues) => {
        return (
          moment(cellValues.row.dataCriacao, "YYYY-MM-DD").format("DD/MM/YYYY")
        );
      }, flex: 1
    },
    {
      field: "urlDocumento", headerName: 'Documento',
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => router.push(cellValues.value)}
          >
            Download
          </Button>
        );
      }, flex: 1
    },
    {
      field: 'Excluir', headerName: 'Excluir', renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemove(cellValues.row)}
          >
            <DeleteForeverIcon />
          </Button>
        );
      }, flex: 1
    },
  ]

  const handleRemove = data => {
    let result = confirm("Deseja excluir o documento " + data.nomeDocumento + " ?");
    if (result) {
      try {
        fetch("/api/documentos/delete", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then((response) => enqueueSnackbar('Documento excluido!', { variant: 'success' }));
      } catch (error) {
      } finally {
      }
    }
  };


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sucessMSG = () => {
    enqueueSnackbar('Documento cadastrado com sucesso!', { variant: 'success' });
  };

  const errorMSG = () => {
    enqueueSnackbar('Erro ao cadastrar!', { variant: 'error' });
  };

  const [showSpinner, setShowSpinner] = useState(false);
  const [nomeDocumento, setNomeDocumento] = useState("");
  const [docFile, setDocFile] = useState([]);
  const onChange = async (event) => {
    setShowSpinner(true);
    event.preventDefault();
    const formData = new FormData();
    const file = docFile;
    formData.append("inputFile", file);
    formData.append("nomeDocumento", nomeDocumento);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
    } catch (error) {
      errorMSG();
      setShowSpinner(false);
      formData.delete("inputFile");
      setNomeDocumento("");
    } finally {
      sucessMSG();
      setShowSpinner(false);
      formData.delete("inputFile");
      setNomeDocumento("");
    }
  };

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form >

            <TextField
              type="text"
              id="nomeDocumento"
              max="99999"
              label="Nome Documento"
              variant="outlined"
              placeholder="Digite o nome do Documento"
              margin="normal"
              value={nomeDocumento}
              onChange={(e) => setNomeDocumento(e.target.value)}
              fullWidth
              required
            />
            <input type="file" onChange={(e) => setDocFile(...docFile, e.target.files[0])} />
            <div style={{ display: "flex", margin: "5px", justifyContent: "center", alignItems: "center", padding: "10px",width:"100%" }}>
              {showSpinner ? <CircularProgress /> : <Button type="button" onClick={onChange} variant="contained" style={{ width: "300px" }}>Cadastrar</Button>}
              <div style={{ display: "flex", margin: "5px", justifyContent: "flex-end", alignItems: "center", padding: "10px", width:"50%"}}>
                <ModalInfo/>
              </div>
            </div>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              components={{
                Toolbar: GridToolbar
              }}
              rows={tableDate}
              columns={columns}
              allowColumnResizing={true}
              rowsPerPageOptions={[5, 10, 20, 100]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
        </Paper>
      </Grid>

    </Dashboard>
  )
}
