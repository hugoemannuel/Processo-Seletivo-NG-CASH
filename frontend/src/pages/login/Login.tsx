import React, { useCallback, useContext, useState } from "react";
import './index.css'
import toastr from 'toastr'
import logo from '../../images/logo.jpg'
import { Box, InputLabel, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserService } from "../../services/userApi/UserService";
import UserContext from "../../context/UserContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginUser = useCallback(async (name: string, password: string) => {
    try {
      const data = await UserService.loginUser(name, password);
      setUser({ name, token: data })
      navigate('/home')
      toastr.success('Logado')
    } catch (error: any) {
      console.log('***erro', error.message)
      toastr.error('Nome de usuario o senha incorreto')
    }
  }, [])

  return (
    <Box style={{ marginLeft: '10%' }}>
      <form className="form_container">
        <Box style={{ height: '50px' }}>
          <img style={{ width: '40%' }}
            src={logo} />
        </Box>
        <Box className="box_container_input">
          <InputLabel>
            <TextField
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="digite seu nome de usuario" />
          </InputLabel>
          <InputLabel style={{ paddingTop: '20px' }}>
            <TextField
              className="input"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="digite sua senha" />
          </InputLabel>
        </Box>
        <Box className="box_container_button">
          <Button
            className="button"
            onClick={() => handleLoginUser(name, password)}
            variant="contained">Entrar</Button>
          <Button
            style={{ marginLeft: '15px' }}
            className="button"
            onClick={() => navigate('/register')}
            variant="contained">Cadastrar</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Login;