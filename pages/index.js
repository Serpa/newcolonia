import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DocumentDialog from '../components/DocumentDialog'
import AttachFileIcon from '@mui/icons-material/AttachFile';



export default function DatagridPescadores() {

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);// loading não ta funcionando
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    console.log(value);
    setSelectedValue(value);
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
            <EditIcon />
          </Button>
        );
      }, flex: 1
    },
    {
      field: "Documentos",
      renderCell: (cellValues) => {
        return (
          <>
            <Button variant="outlined" onClick={handleClickOpen}>
              <AttachFileIcon />
            </Button>
            <DocumentDialog
              pescador={cellValues.row}
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose} />
          </>
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
        </Paper>
      </Grid>

    </Dashboard>
  );
}

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(context.req, context.res, authOptions)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }