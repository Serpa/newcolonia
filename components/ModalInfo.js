import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalInfo() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button type="button" variant="contained" color='inherit' style={{ width: "300px" }} onClick={handleClickOpen('paper')} >Guia de Uso</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle id="scroll-dialog-title">Guia de Adição de novo Documento</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        Para preencher um documento com os dados do pescador é simples, você deve substituir no documento o que você quer que preencha com alguma das opções abaixo:
                        <ul>
                            <li><b>&#123;ficha&#125;</b> - Número da Ficha do Pescador</li>
                            <li><b>&#123;nome&#125;</b> - Nome do Pescador</li>
                            <li><b>&#123;endereco&#125;</b> - Endereço do Pescador</li>
                            <li><b>&#123;numero&#125;</b> - Número do Endereço do Pescador</li>
                            <li><b>&#123;bairro&#125;</b> - Bairro do Pescador</li>
                            <li><b>&#123;cidade&#125;</b> - Cidade do Pescador</li>
                            <li><b>&#123;estado&#125;</b> - Estado do Pescador</li>
                            <li><b>&#123;cep&#125;</b> - CEP do Pescador</li>
                            <li><b>&#123;celular&#125;</b> - Celular do Pescador</li>
                            <li><b>&#123;telefone&#125;</b> - Telefone do Pescador</li>
                            <li><b>&#123;tel_recado&#125;</b> - Telefone para recado do Pescador</li>
                            <li><b>&#123;cpf&#125;</b> - CPF do Pescador</li>
                            <li><b>&#123;rg&#125;</b> - RG do Pescador</li>
                            <li><b>&#123;orgao_emissor&#125;</b> - Orgão Emissor do RG do Pescador</li>
                            <li><b>&#123;emissao_rg&#125;</b> - Data de Emissão do RG Pescador</li>
                            <li><b>&#123;rgp&#125;</b> - RGP do Pescador</li>
                            <li><b>&#123;data_rgp&#125;</b> - Data do RGP do Pescador</li>
                            <li><b>&#123;pis&#125;</b> - PIS do Pescador</li>
                            <li><b>&#123;cei&#125;</b> - CEI do Pescador</li>
                            <li><b>&#123;cnh&#125;</b> - CNH do Pescador</li>
                            <li><b>&#123;emissao_cnh&#125;</b> - Emissor CNH do Pescador</li>
                            <li><b>&#123;email&#125;</b> - E-mail do Pescador</li>
                            <li><b>&#123;vencimento&#125;</b> - Vencimento do Pescador</li>
                            <li><b>&#123;filiacao&#125;</b> - Data de Filiaçã do Pescador</li>
                            <li><b>&#123;nascimento&#125;</b> - Data de Nascimento do Pescador</li>
                            <li><b>&#123;local_nascimento&#125;</b> - Local de nascimento do Pescador</li>
                            <li><b>&#123;pai&#125;</b> - Nome do Pai do Pescador</li>
                            <li><b>&#123;mae&#125;</b> - Nome da Mãe do Pescador</li>
                            <li><b>&#123;titulo_eleitor&#125;</b> - Titulo de Eleitor do Pescador</li>
                            <li><b>&#123;carteira_trabalho&#125;</b> - Carteira de Trabalho do Pescador</li>
                            <li><b>&#123;capataz&#125;</b> - Capataz do Pescador</li>
                            <li><b>&#123;profissao&#125;</b> - Profissão do Pescador</li>
                            <li><b>&#123;estado_civil&#125;</b> - Estado Civil do Pescador</li>
                            <li><b>&#123;capataz&#125;</b> - Capataz do Pescador</li>
                            <li><b>&#123;profissao&#125;</b> - Profissão do Pescador</li>
                        </ul>
                        Para Informações da Colônia:
                        <ul>
                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;nome&#125;</b> <b>&#123;/nome_colonia&#125;</b> - Nome da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;colonia&#125;</b> <b>&#123;/nome_colonia&#125;</b> - Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;cidade_sede&#125;</b> <b>&#123;/nome_colonia&#125;</b> - Cidade Sede da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;estado_sede&#125;</b> <b>&#123;/nome_colonia&#125;</b> - Estado Sede da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;razao_social&#125;</b> <b>&#123;/nome_colonia&#125;</b> - Razão Social da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;cnpj&#125;</b> <b>&#123;/nome_colonia&#125;</b> - CNPJ da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;sede&#125;</b> <b>&#123;/nome_colonia&#125;</b> -  Endereço Sede da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;presidente&#125;</b> <b>&#123;/nome_colonia&#125;</b> -  Nome do Presidente da Colonia
                            </li>

                            <li>
                                <b>&#123;#nome_colonia&#125;</b> <b>&#123;cpf_presidente&#125;</b> <b>&#123;/nome_colonia&#125;</b> -  CPF do Presidente da Colonia
                            </li>
                        </ul>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}