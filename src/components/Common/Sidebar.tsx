import { makeStyles } from '@material-ui/core';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));
const activeStyle = {
  color: '#40a9ff',
};
export function Sidebar() {
  const classess = useStyle();

  return (
    <div className={classess.root}>
      <List aria-label="main mailbox folders" component="nav">
        <NavLink
          className={classess.link}
          style={({ isActive }) =>
            isActive
              ? activeStyle
              : {
                  color: 'inherit',
                  textDecoration: 'none',
                }
          }
          to="/admin/dashboard"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          className={classess.link}
          style={({ isActive }) =>
            isActive
              ? activeStyle
              : {
                  color: 'inherit',
                  textDecoration: 'none',
                }
          }
          to="/admin/students"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
