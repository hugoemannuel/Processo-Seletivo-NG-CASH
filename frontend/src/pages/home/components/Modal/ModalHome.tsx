import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  InputLabel,
  TextField
} from '@mui/material';


interface IProps {
  open: boolean;
  reciveName: string;
  amount: number;
  setReciveName(value: string): void;
  setAmount(value: number): void;
  handleClose(): void;
  handleCreateTransaction(): Promise<void>;
}

const ModalHome: React.FC<IProps> = ({
  handleClose,
  open,
  amount,
  reciveName,
  setAmount,
  setReciveName,
  handleCreateTransaction,
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ada8a8',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose} >
        <Box sx={style}>
          <Typography variant="h6" component="h2" >Realizar transações</Typography>
          <form>
            <Box >
              <InputLabel>
                <TextField
                  className="input"
                  value={reciveName}
                  onChange={(e) => setReciveName(e.target.value)}
                  placeholder="pessoa que vai receber" />
              </InputLabel>
              <InputLabel style={{ paddingTop: '20px' }}>
                <TextField
                  className="input"
                  value={amount}
                  type="string"
                  inputProps={{
                    min: 1,
                    step: 1
                  }}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="digite o valor a ser transferido" />
              </InputLabel>
            </Box>
            <Box style={{
              paddingTop: '30px',
            }} >
              <Button
                className="button"
                onClick={handleClose}
                variant="contained">Cancelar</Button>
              <Button
                style={{ marginLeft: '15px' }}
                className="button"
                onClick={() => handleCreateTransaction()}
                variant="contained">Realizar</Button>
            </Box>
          </form>
        </Box >
      </Modal >
    </div >
  );
}

export default ModalHome;