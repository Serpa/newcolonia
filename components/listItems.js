import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import SourceIcon from '@mui/icons-material/Source';
import AddReactionIcon from '@mui/icons-material/AddReaction';


export const mainListItems = (
  <React.Fragment>

    <Link href="/" style={{
      textDecoration: 'none',
      color: 'black',
      fontSize: 30,
    }}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pescadores" />
      </ListItemButton>
    </Link>

    <Link href="/cadastro" style={{
      textDecoration: 'none',
      color: 'black',
      fontSize: 30,
    }}>
      <ListItemButton>
        <ListItemIcon>
          <AddReactionIcon />
        </ListItemIcon>
        <ListItemText primary="Cadastrar" />
      </ListItemButton>
    </Link>

    <Link href="/documentos" style={{
      textDecoration: 'none',
      color: 'black',
      fontSize: 30,
    }}>
      <ListItemButton>
        <ListItemIcon>
          <SourceIcon />
        </ListItemIcon>
        <ListItemText primary="Documentos" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
