import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, ptBR } from '@mui/x-data-grid';
import { Button, CircularProgress, Grid, Paper } from '@mui/material'
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns'

import BasicModal from '../components/BasicModal';
import moment from 'moment';



export default function DatagridPescadores() {

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);// loading não ta funcionando
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue({ doc: value });
  };

  useEffect(() => {
    fetch("/api/pescadores")
      .then((data) => data.json())
      .then((data) => setTableData(data))
    setLoading(false)
  }, [])

  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 1 },
    { field: 'celular', headerName: 'Celular', flex: 1 },
    { field: 'endereco', headerName: 'Endereço', flex: 1 },
    { field: 'cidade', headerName: 'Cidade', flex: 1 },
    {
      field: 'vencimento', type: 'date', headerName: 'Vencimento',
      renderCell: (cellValues) => {
        return (
          moment(cellValues.row.vencimento, "DD/MM/YYYY").format("DD/MM/YYYY")
        );
      }, flex: 1
    },
    { field: 'nascimento', headerName: 'Nascimento', flex: 1 },
    {
      field: "Alterar",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="warning"
            onClick={() => router.push(`/edit/${cellValues.id}`)}
          >
            <EditIcon />
          </Button>
        );
      }, flex: 1
    },
    {
      field: "Documentos",
      renderCell: (cellValues) => {
        return (
          <BasicModal pescador={cellValues.row} />
        );
      }, flex: 1
    }
  ]

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
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              sx={{
                ".highlight": {
                  bgcolor: "#fcd4d4",
                  "&:hover": {
                    bgcolor: "#e2e6fd",
                  },
                },
              }}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: CircularProgress,
              }}
              rows={tableData}
              columns={columns}
              allowColumnResizing={true}
              rowsPerPageOptions={[5, 10, 20, 100]}
              loading={loading}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              getRowClassName={(params) => {
                // let vencimento = moment().format("DD/MM/YYYY"); return "highlight"
                new Date().toDateString() > new Date(moment(params.row.vencimento).format("YYYY/MM/DD")).toDateString() ? "highlight" : ""
                // if (dayjs().isAfter(dayjs(params.row.vencimento)))
                // console.log(dayjs().isAfter(dayjs(,"DD/MM/YYYY")))
                // dayjs(vencimento.format("YYYY/MM/DDDD")).isBefore(now.format("YYYY/MM/DDDD"))? console.log('sim', params.row.vencimento) : console.log('não', params.row.vencimento);
                // dayjs(params.row.vencimento).isBefore(dayjs())? console.log('sim', params.row.vencimento) : console.log('não', params.row.vencimento);
              }}
            />
          </div>
        </Paper>
      </Grid>

    </Dashboard>
  );
}
