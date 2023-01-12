import React, { useState } from "react";
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { Typography, TextField, Button, Stepper, Step, StepLabel } from "@mui/material";
import Dashboard from './index'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]"


function getSteps() {
  return [
    "Dados Pescador",
    "Informações de Contato",
    "Documentos",
    "Dados de entrada",
  ];
}
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="ficha"
        render={({ field }) => (
          <TextField
            type="number"
            id="ficha"
            label="Ficha"
            variant="outlined"
            placeholder="Digite o número da ficha"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="nome"
        render={({ field }) => (
          <TextField
            id="nome"
            label="Nome"
            variant="outlined"
            placeholder="Digite o nome"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="nascimento"
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            id="nascimento"
            label="Data de Nascimento"
            variant="outlined"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="local_nascimento"
        render={({ field }) => (
          <TextField
            id="local_nascimento"
            label="Local de Nascimento"
            variant="outlined"
            placeholder="Digite o local de nascimento"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="observacao"
        render={({ field }) => (
          <TextField
            id="observacao"
            label="Observação"
            variant="outlined"
            placeholder="Digite a observação"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="endereco"
        render={({ field }) => (
          <TextField
            id="endereco"
            label="Endereço"
            variant="outlined"
            placeholder="Digite o endereço"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="bairro"
        render={({ field }) => (
          <TextField
            id="bairro"
            label="Bairro"
            variant="outlined"
            placeholder="Digite o bairro"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="cidade"
        render={({ field }) => (
          <TextField
            id="cidade"
            label="Cidade"
            variant="outlined"
            placeholder="Digite o cidade"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="estado"
        render={({ field }) => (
          <TextField
            id="estado"
            label="Estado"
            variant="outlined"
            placeholder="Digite o estado"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="cep"
        render={({ field }) => (
          <TextField
            id="cep"
            label="CEP"
            variant="outlined"
            placeholder="Digite o CEP"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="filiacao"
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            id="filiacao"
            label="Filiação"
            variant="outlined"
            placeholder="Digite a data de filiação"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="profissao"
        render={({ field }) => (
          <TextField
            id="profissao"
            label="Profissão"
            variant="outlined"
            placeholder="Digite a profissão"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="estado_civil"
        render={({ field }) => (
          <TextField
            id="estado_civil"
            label="Estado Civil"
            variant="outlined"
            placeholder="Digite o estado civil"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />



    </>
  );
};

const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="celular"
        render={({ field }) => (
          <TextField
            id="celular"
            label="Celular"
            variant="outlined"
            placeholder="Digite o celular"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="telefone"
        render={({ field }) => (
          <TextField
            id="telefone"
            label="Telefone"
            variant="outlined"
            placeholder="Digite o telefone"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="tel_recado"
        render={({ field }) => (
          <TextField
            id="tel_recado"
            label="Telefone para Recados"
            variant="outlined"
            placeholder="Digite o telefone"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            type="email"
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Digite o email"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="capataz"
        render={({ field }) => (
          <TextField
            id="capataz"
            label="Capataz"
            variant="outlined"
            placeholder="Digite o nome do capataz"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};

const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="cpf"
        render={({ field }) => (
          <TextField
            id="cpf"
            label="CPF"
            variant="outlined"
            placeholder="Digite o CPF"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="rg"
        render={({ field }) => (
          <TextField
            id="rg"
            label="RG"
            variant="outlined"
            placeholder="Digite o RG"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="orgao_emissor"
        render={({ field }) => (
          <TextField
            id="orgao_emissor"
            label="Orgão Emissor"
            variant="outlined"
            placeholder="Digite o Orgão Emissor"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="emissao_rg"
        render={({ field }) => (
          <TextField
            id="emissao_rg"
            label="Data de emissão RG"
            variant="outlined"
            placeholder="Digite a data de emissão do RG"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="pai"
        render={({ field }) => (
          <TextField
            id="pai"
            label="Nome do Pai"
            variant="outlined"
            placeholder="Digite o nome do pai"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="mae"
        render={({ field }) => (
          <TextField
            id="mae"
            label="Nome da Mãe"
            variant="outlined"
            placeholder="Digite o nome da mãe"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="rgp"
        render={({ field }) => (
          <TextField
            id="rgp"
            label="RGP"
            variant="outlined"
            placeholder="Digite o RGP"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="data_rgp"
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            id="data_rgp"
            label="Data RGP"
            variant="outlined"
            placeholder="Digite a data do RGP"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="pis"
        render={({ field }) => (
          <TextField
            id="pis"
            label="PIS"
            variant="outlined"
            placeholder="Digite o PIS"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="cei"
        render={({ field }) => (
          <TextField
            id="cei"
            label="CEI"
            variant="outlined"
            placeholder="Digite o CEI"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="cnh"
        render={({ field }) => (
          <TextField
            id="cnh"
            label="CNH"
            variant="outlined"
            placeholder="Digite o CNH"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="emissao_cnh"
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            id="emissao_cnh"
            label="Emissão CNH"
            variant="outlined"
            placeholder="Digite a emissão do CNH"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="titulo_eleitor"
        render={({ field }) => (
          <TextField
            id="titulo_eleitor"
            label="Título de Eleitor"
            variant="outlined"
            placeholder="Digite o título de eleitor"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="carteira_trabalho"
        render={({ field }) => (
          <TextField
            id="carteira_trabalho"
            label="Carteira de Trabalho"
            variant="outlined"
            placeholder="Digite a Carteira de Trabalho"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};

const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="codigo_caepf"
        render={({ field }) => (
          <TextField
            id="codigo_caepf"
            label="Código CAEPF"
            variant="outlined"
            placeholder="Digite o código CAEPF"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="senha_caepf"
        render={({ field }) => (
          <TextField
            type="password"
            id="senha_caepf"
            label="Senha CAEPF"
            variant="outlined"
            placeholder="Digite a senha CAEPF"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const methods = useForm({
    defaultValues: {
      ficha: "",
      nome: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      celular: "",
      telefone: "",
      tel_recado: "",
      cpf: "",
      rg: "",
      orgao_emissor: "",
      rgp: "",
      pis: "",
      cei: "",
      cnh: "",
      emissao_cnh: "",
      email: "",
      filiacao: "",
      nascimento: "",
      local_nascimento: "",
      observacao: "",
      emissao_rg: "",
      pai: "",
      mae: "",
      data_rgp: "",
      titulo_eleitor: "",
      carteira_trabalho: "",
      capataz: "",
      profissao: "",
      estado_civil: "",
      codigo_caepf: "",
      senha_caepf: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return null;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    // console.log(data);
    if (activeStep == steps.length - 1) {
      // fetch("/api/cadastro_pescador", {
      //   method: 'POST',
      //   body: { data },
      // })
      //   .then((data) => data.json())
      //   .then((res) => {
      //     console.log(res);
      //     setActiveStep(activeStep + 1);
      //   });
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Dashboard>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Voltar
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  disabled
                >
                  skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Salvar" : "Próximo"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </Dashboard>
  );
};

export default LinaerStepper;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}