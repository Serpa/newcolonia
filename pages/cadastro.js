import { Button, Grid, Paper, TextField } from '@mui/material'
import { useSnackbar, withSnackbar } from 'notistack';
import Dashboard from '../components/Dashboard';
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

  const onSubmit = data => {
    fetch("/api/pescadores/cadastro", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((response) => {
        if (response.status === 200) {
          sucessMSG()
          reset();
        } else {
          errorMSG()
        }

      })
      .catch((response) => { console.log(response) });
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
              type="number"
              id="ficha"
              max="99999"
              label="Ficha"
              variant="outlined"
              placeholder="Digite o número da ficha"
              margin="normal"
              fullWidth
              required
              {...register("ficha", { required: true })}
            />

            <TextField
              id="nome"
              label="Nome"
              variant="outlined"
              placeholder="Digite o nome"
              margin="normal"
              fullWidth
              required
              {...register("nome", { required: true })}
            />

            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              id="nascimento"
              label="Data de Nascimento"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("nascimento")}
            />

            <TextField
              id="local_nascimento"
              label="Local de Nascimento"
              variant="outlined"
              placeholder="Digite o local de nascimento"
              fullWidth
              margin="normal"
              {...register("local_nascimento")}
            />

            <TextField
              id="observacao"
              label="Observação"
              variant="outlined"
              placeholder="Digite a observação"
              fullWidth
              margin="normal"
              {...register("observacao")}
            />

            <TextField
              id="endereco"
              label="Endereço"
              variant="outlined"
              placeholder="Digite o endereço"
              fullWidth
              margin="normal"
              {...register("endereco")}
            />

            <TextField
              id="numero"
              label="Número"
              variant="outlined"
              placeholder="Digite o número"
              fullWidth
              margin="normal"
              {...register("numero")}
            />

            <TextField
              id="bairro"
              label="Bairro"
              variant="outlined"
              placeholder="Digite o bairro"
              fullWidth
              margin="normal"
              {...register("bairro")}
            />

            <TextField
              id="cidade"
              label="Cidade"
              variant="outlined"
              placeholder="Digite o cidade"
              fullWidth
              margin="normal"
              {...register("cidade")}
            />

            <TextField
              id="estado"
              label="Estado"
              variant="outlined"
              placeholder="Digite o estado"
              fullWidth
              margin="normal"
              {...register("estado")}
            />

            <TextField
              id="cep"
              label="CEP"
              variant="outlined"
              placeholder="Digite o CEP"
              fullWidth
              margin="normal"
              {...register("cep")}
            />

            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              id="filiacao"
              label="Filiação"
              variant="outlined"
              placeholder="Digite a data de filiação"
              fullWidth
              margin="normal"
              {...register("filiacao")}
            />

            <TextField
              id="profissao"
              label="Profissão"
              variant="outlined"
              placeholder="Digite a profissão"
              fullWidth
              margin="normal"
              {...register("profissao")}
            />

            <TextField
              id="estado_civil"
              label="Estado Civil"
              variant="outlined"
              placeholder="Digite o estado civil"
              fullWidth
              margin="normal"
              {...register("estado_civil")}
            />

            <TextField
              id="celular"
              label="Celular"
              variant="outlined"
              placeholder="Digite o celular"
              fullWidth
              margin="normal"
              {...register("celular")}
            />

            <TextField
              id="tel_recado"
              label="Telefone para Recados"
              variant="outlined"
              placeholder="Digite o telefone"
              fullWidth
              margin="normal"
              {...register("tel_recado")}
            />

            <TextField
              type="email"
              id="email"
              label="E-mail"
              variant="outlined"
              placeholder="Digite o email"
              fullWidth
              margin="normal"
              {...register("email")}
            />

            <TextField
              id="capataz"
              label="Capataz"
              variant="outlined"
              placeholder="Digite o nome do capataz"
              fullWidth
              margin="normal"
              {...register("capataz")}
            />


            <TextField
              id="cpf"
              label="CPF"
              variant="outlined"
              placeholder="Digite o CPF"
              fullWidth
              margin="normal"
              required
              {...register("cpf")}
            />

            <TextField
              id="rg"
              label="RG"
              variant="outlined"
              placeholder="Digite o RG"
              fullWidth
              margin="normal"
              {...register("rg")}
            />

            <TextField
              id="orgao_emissor"
              label="Orgão Emissor"
              variant="outlined"
              placeholder="Digite o Orgão Emissor"
              fullWidth
              margin="normal"
              {...register("orgao_emissor")}
            />

            <TextField
              id="emissao_rg"
              label="Data de emissão RG"
              variant="outlined"
              placeholder="Digite a data de emissão do RG"
              fullWidth
              margin="normal"
              {...register("emissao_rg")}
            />

            <TextField
              id="pai"
              label="Nome do Pai"
              variant="outlined"
              placeholder="Digite o nome do pai"
              fullWidth
              margin="normal"
              {...register("pai")}
            />

            <TextField
              id="mae"
              label="Nome da Mãe"
              variant="outlined"
              placeholder="Digite o nome da mãe"
              fullWidth
              margin="normal"
              {...register("mae")}
            />

            <TextField
              id="rgp"
              label="RGP"
              variant="outlined"
              placeholder="Digite o RGP"
              fullWidth
              margin="normal"
              {...register("rgp")}
            />

            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              id="data_rgp"
              label="Data RGP"
              variant="outlined"
              placeholder="Digite a data do RGP"
              fullWidth
              margin="normal"
              {...register("data_rgp")}
            />

            <TextField
              id="pis"
              label="PIS"
              variant="outlined"
              placeholder="Digite o PIS"
              fullWidth
              margin="normal"
              {...register("pis")}
            />

            <TextField
              id="cei"
              label="CEI"
              variant="outlined"
              placeholder="Digite o CEI"
              fullWidth
              margin="normal"
              {...register("cei")}
            />

            <TextField
              id="cnh"
              label="CNH"
              variant="outlined"
              placeholder="Digite o CNH"
              fullWidth
              margin="normal"
              {...register("cnh")}
            />

            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              id="emissao_cnh"
              label="Emissão CNH"
              variant="outlined"
              placeholder="Digite a emissão do CNH"
              fullWidth
              margin="normal"
              {...register("emissao_cnh")}
            />

            <TextField
              id="titulo_eleitor"
              label="Título de Eleitor"
              variant="outlined"
              placeholder="Digite o título de eleitor"
              fullWidth
              margin="normal"
              {...register("titulo_eleitor")}
            />

            <TextField
              id="carteira_trabalho"
              label="Carteira de Trabalho"
              variant="outlined"
              placeholder="Digite a Carteira de Trabalho"
              fullWidth
              margin="normal"
              {...register("carteira_trabalho")}
            />

            <TextField
              id="codigo_caepf"
              label="Código CAEPF"
              variant="outlined"
              placeholder="Digite o código CAEPF"
              fullWidth
              margin="normal"
              {...register("codigo_caepf")}
            />

            <TextField
              type="password"
              id="senha_caepf"
              label="Senha CAEPF"
              variant="outlined"
              placeholder="Digite a senha CAEPF"
              fullWidth
              margin="normal"
              {...register("senha_caepf")}
            />

            <div style={{ display: "flex", margin: "5px", justifyContent: "center", alignItems: "center", padding: "10px" }}>
              <Button type="submit" variant="contained" style={{ width: "300px" }}>Cadastrar</Button>
            </div>
          </form>

        </Paper>
      </Grid>
    </Dashboard>
  )
}
