import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, CircularProgress } from '@mui/material';
import Docx from '../components/docxGenerate/Docx'
import Dashboard from './dashboard';



export default function DatagridPescadores() {

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);// loading não ta funcionando

  useEffect(() => {
    fetch("/api/pescadores")
      .then((data) => data.json())
      .then((data) => setTableData(data))
      setLoading(false)
  }, [])

  const columns = [
    { field: 'ficha', headerName: 'Ficha' },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 1 },
    { field: 'celular', headerName: 'Celular', flex: 1 },
    { field: 'endereco', headerName: 'Endereço', flex: 1 },
    { field: 'cidade', headerName: 'Cidade', flex: 1 },
    { field: 'vencimento', headerName: 'Vencimento', flex: 1 },
    { field: 'nascimento', headerName: 'Nascimento', flex: 1 },
    {
      field: "Alterar",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="warning"
            onClick={() => console.log(cellValues)}
          >
            Alterar
          </Button>
        );
      }, flex: 1
    },
    {
      field: "Documentos",
      renderCell: (cellValues) => {
        return (
          <Docx
            variant="contained"
            color="primary"
            dados={cellValues.row}

          >
            Documentos
          </Docx>
        );
      }, flex: 1
    }
  ]

  return (
    <Dashboard>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: CircularProgress,
          }}
          rows={tableData}
          columns={columns}
          allowColumnResizing={true}
          rowsPerPageOptions={[5, 10, 20, 100]}
          loading={loading}
        />
      </div>
    </Dashboard>
  );
}