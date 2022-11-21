import React, { useCallback, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserContext from '../../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

interface IProps {
  balance?: string
}

const Header: React.FC<IProps> = ({ balance }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    setUser({
      name: '',
      token: ''
    })
    navigate('/')
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NG.CASH
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {` Valor em conta R$${balance}`}
          </Typography>
          <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header