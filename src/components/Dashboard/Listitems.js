import * as React from 'react'
import { Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

export const mainListItems = (
  <React.Fragment>
    <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
              <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
              <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
    <ListItemButton>
            <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
            <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
            <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
)
