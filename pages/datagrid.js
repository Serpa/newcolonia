import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, CircularProgress } from '@mui/material';
import Docx from '../components/docxGenerate/Docx'
import Dashboard from './index';
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]"
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';




export default function DatagridPescadores() {

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);// loading não ta funcionando
  const router = useRouter();

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
    { field: 'vencimento', headerName: 'Vencimento', flex: 1 },
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
            <EditIcon/>
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