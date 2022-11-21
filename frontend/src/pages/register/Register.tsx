import React, { useCallback, useState } from "react";
import './index.css'
import toastr from 'toastr'
import logo from '../../images/logo.jpg'
import { Box, InputLabel, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { UserService } from "../../services/userApi/UserService";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginUser = useCallback(async (name: string, password: string) => {
    try {
      await UserService.createUser(name, password)
      toastr.success('Usuario cadastrado')
      navigate('/')
    } catch (error: any) {
      toastr.error('Erro ao cadastrar')
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
          <InputLabel >
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
            variant="contained">Cadastrar</Button>
          <Button
            style={{ marginLeft: '15px' }}
            className="button"
            onClick={() => navigate('/')}
            variant="contained">Voltar</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Register;