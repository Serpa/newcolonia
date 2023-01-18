import { Button, TextField } from '@mui/material'
import { useSnackbar, withSnackbar } from 'notistack';
import Dashboard from '../index';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react"

export default function Cadastro() {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sucessMSG = () => {
    enqueueSnackbar('Pescador cadastrado com sucesso!', { variant: 'success' });
  };

  const errorMSG = () => {
    enqueueSnackbar('Erro ao cadastrar!', { variant: 'error' });
  };

  let documents = [];
  const onChangeFile = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      documents.push(event.target.files[i]);
    }
  }

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
      } else {
        errorMSG()
      }

    }).catch((response) => { console.log(response) });
  };

  return (
    <Dashboard>
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
    </Dashboard>
  )
}
