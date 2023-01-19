import { Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import Dashboard from '../../components/Dashboard';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import moment from 'moment';

const fetcher = url => fetch(url).then(r => r.json())

export default function Cadastro() {
  const { data: session, status } = useSession()
  const { register, handleSubmit, reset, setValue } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter()
  const { idPescador } = router.query
  const { data: pescador, error } = useSWR(idPescador ? `/api/pescadores/${idPescador}` : null, fetcher)

  useEffect(() => {
    if (pescador === null) {
      router.push("/datagrid")
    }
  }, [pescador,router])


  const sucessMSG = () => {
    enqueueSnackbar('Cadastrado atualizado com sucesso!', { variant: 'success' });
  };

  const errorMSG = () => {
    enqueueSnackbar('Erro ao alterar!', { variant: 'error' });
  };

  const invalidId = () => {
    enqueueSnackbar('Cadastro não encontrado!', { variant: 'error' });
  };


  const convertDate = (date) => {
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD")
  }

  const onSubmit = data => {
    fetch("/api/pescadores/update", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((response) => {
        if (response.status === 200) {
          sucessMSG()
          router.push('/datagrid')
        } else {
          errorMSG()
        }

      })
      .catch((response) => { console.log(response) });
  };

  if (error)
    return (
      <div>
        <h1>404</h1>
        <p>Loading failed...</p>
      </div>
    );

  if (!pescador)
    return (
      <Dashboard>
        <CircularProgress style={{ display: 'flex', alignSelf: 'center' }} />
      </Dashboard>
    );
  if (pescador) {
    setValue('ficha', pescador?.ficha);
    setValue('nome', pescador?.nome);
    setValue('endereco', pescador?.endereco);
    setValue('numero', pescador?.numero);
    setValue('bairro', pescador?.bairro);
    setValue('cidade', pescador?.cidade);
    setValue('estado', pescador?.estado);
    setValue('cep', pescador?.cep);
    setValue('celular', pescador?.celular);
    setValue('telefone', pescador?.telefone);
    setValue('tel_recado', pescador?.tel_recado);
    setValue('rg', pescador?.rg);
    setValue('cpf', pescador?.cpf);
    setValue('orgao_emissor', pescador?.orgao_emissor);
    setValue('rgp', pescador?.rgp);
    setValue('pis', pescador?.pis);
    setValue('cei', pescador?.cei);
    setValue('cnh', pescador?.cnh);
    setValue('emissao_cnh', convertDate(pescador?.emissao_cnh));
    setValue('email', pescador?.email);
    setValue('vencimento', convertDate(pescador?.vencimento));
    setValue('filiacao', convertDate(pescador?.filiacao));
    setValue('nascimento', convertDate(pescador?.nascimento));
    setValue('local_nascimento', pescador?.local_nascimento);
    setValue('observacao', pescador?.observacao);
    setValue('emissao_rg', convertDate(pescador?.emissao_rg));
    setValue('pai', pescador?.pai);
    setValue('mae', pescador?.mae);
    setValue('data_rgp', convertDate(pescador?.data_rgp));
    setValue('titulo_eleitor', pescador?.titulo_eleitor);
    setValue('carteira_trabalho', pescador?.carteira_trabalho);
    setValue('capataz', pescador?.capataz);
    setValue('profissao', pescador?.profissao);
    setValue('estado_civil', pescador?.estado_civil);
    setValue('id', pescador?.id);
  }

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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o local de nascimento"
              fullWidth
              margin="normal"
              {...register("local_nascimento")}
            />

            <TextField
              id="observacao"
              label="Observação"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite a observação"
              fullWidth
              margin="normal"
              {...register("observacao")}
            />

            <TextField
              id="endereco"
              label="Endereço"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o endereço"
              fullWidth
              margin="normal"
              {...register("endereco")}
            />

            <TextField
              id="numero"
              label="Número"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o número"
              fullWidth
              margin="normal"
              {...register("numero")}
            />

            <TextField
              id="bairro"
              label="Bairro"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o bairro"
              fullWidth
              margin="normal"
              {...register("bairro")}
            />

            <TextField
              id="cidade"
              label="Cidade"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o cidade"
              fullWidth
              margin="normal"
              {...register("cidade")}
            />

            <TextField
              id="estado"
              label="Estado"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o estado"
              fullWidth
              margin="normal"
              {...register("estado")}
            />

            <TextField
              id="cep"
              label="CEP"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite a profissão"
              fullWidth
              margin="normal"
              {...register("profissao")}
            />

            <TextField
              id="estado_civil"
              label="Estado Civil"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o estado civil"
              fullWidth
              margin="normal"
              {...register("estado_civil")}
            />

            <TextField
              id="celular"
              label="Celular"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o celular"
              fullWidth
              margin="normal"
              {...register("celular")}
            />

            <TextField
              id="tel_recado"
              label="Telefone para Recados"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o email"
              fullWidth
              margin="normal"
              {...register("email")}
            />

            <TextField
              id="capataz"
              label="Capataz"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o nome do capataz"
              fullWidth
              margin="normal"
              {...register("capataz")}
            />


            <TextField
              id="cpf"
              label="CPF"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o RG"
              fullWidth
              margin="normal"
              {...register("rg")}
            />

            <TextField
              id="orgao_emissor"
              label="Orgão Emissor"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o Orgão Emissor"
              fullWidth
              margin="normal"
              {...register("orgao_emissor")}
            />

            <TextField
              id="emissao_rg"
              type="date"
              label="Data de emissão RG"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite a data de emissão do RG"
              fullWidth
              margin="normal"
              {...register("emissao_rg")}
            />

            <TextField
              id="pai"
              label="Nome do Pai"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o nome do pai"
              fullWidth
              margin="normal"
              {...register("pai")}
            />

            <TextField
              id="mae"
              label="Nome da Mãe"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o nome da mãe"
              fullWidth
              margin="normal"
              {...register("mae")}
            />

            <TextField
              id="rgp"
              label="RGP"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o PIS"
              fullWidth
              margin="normal"
              {...register("pis")}
            />

            <TextField
              id="cei"
              label="CEI"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o CEI"
              fullWidth
              margin="normal"
              {...register("cei")}
            />

            <TextField
              id="cnh"
              label="CNH"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite o título de eleitor"
              fullWidth
              margin="normal"
              {...register("titulo_eleitor")}
            />

            <TextField
              id="carteira_trabalho"
              label="Carteira de Trabalho"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite a Carteira de Trabalho"
              fullWidth
              margin="normal"
              {...register("carteira_trabalho")}
            />

            <TextField
              id="codigo_caepf"
              label="Código CAEPF"
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              placeholder="Digite a senha CAEPF"
              fullWidth
              margin="normal"
              {...register("senha_caepf")}
            />

            <div style={{ display: "flex", margin: "5px", justifyContent: "center", alignItems: "center", padding: "10px" }}>
              <Button type="submit" variant="contained" style={{ width: "300px" }}>Salvar</Button>
            </div>
          </form>

        </Paper>
      </Grid>
    </Dashboard>
  )
}
