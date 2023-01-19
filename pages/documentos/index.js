import { Button, Grid, Paper, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import Dashboard from '../../components/Dashboard';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react"
import { DataGrid, GridToolbar, ptBR } from '@mui/x-data-grid';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import moment from 'moment';

const fetcher = url => fetch(url).then(r => r.json())

export default function Cadastro() {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset } = useForm();
  const [tableDate, setTableData] = useState([]);
  const { data: documentos, error } = useSWR(`/api/documentos/`, fetcher)
  const router = useRouter();

  useEffect(() => {
    if (documentos) {
      setTableData(documentos)
    }
  }, [documentos])

  const columns = [
    { field: 'nomeDocumento', headerName: 'Nome', flex: 1 },
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
    { field: 'dataCriacao', headerName: 'Data de cadastro',renderCell: (cellValues) => {
      return (
        moment(cellValues.row.dataCriacao, "YYYY-MM-DD").format("DD/MM/YYYY")
      );
    },flex: 1 },
  ]

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sucessMSG = () => {
    enqueueSnackbar('Documento cadastrado com sucesso!', { variant: 'success' });
  };

  const errorMSG = () => {
    enqueueSnackbar('Erro ao cadastrar!', { variant: 'error' });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('nomeDocumento', data.nomeDocumento);
    fetch("/api/upload", {
      method: 'POST',
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
    }).then((response) => {
      if (response.status === 200) {
        sucessMSG()
        console.log(response);
      } else {
        errorMSG()
      }

    }).catch((response) => { console.log(response) });
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
          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              type="text"
              id="nomeDocumento"
              max="99999"
              label="Nome Documento"
              variant="outlined"
              placeholder="Digite o nome do Documento"
              margin="normal"
              fullWidth
              required
              {...register("nomeDocumento", { required: true })}
            />

            <Button variant="contained" component="label">
              Upload
              <input hidden accept=".doc, .docx" type="file" {...register('file')} />
            </Button>

            <div style={{ display: "flex", margin: "5px", justifyContent: "center", alignItems: "center", padding: "10px" }}>
              <Button type="submit" variant="contained" style={{ width: "300px" }}>Cadastrar</Button>
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
