import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import toastr from 'toastr'
import UserContext from "../../context/UserContext";
import { UserService } from "../../services/userApi/UserService";
import { ITransaction, IUserPaymen } from "../../shared/interface";
import { Box, Button, Typography } from "@mui/material";
import TableHome from "./components/Table/Table";
import ModalHome from "./components/Modal/ModalHome";

const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  const [id, setId] = useState(0)
  const [balance, setBalance] = useState('');
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [reciveName, setReciveName] = useState('');
  const [amount, setAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleGetBalance = useCallback(async () => {
    try {
      if (user) {
        const response = await UserService.getBalance(user.name, user.token)
        setBalance(response.user.balance);
        setId(Number(response.user.id))
      }
    } catch (error: any) {
      toastr.error('Nao foi possivel obter o saldo')
    }
  }, []);

  const handleCreateTransaction = useCallback(async () => {
    try {
      if (user) {
        const userPaymen: IUserPaymen = {
          username: user.name,
          balance: amount
        }
        await UserService.createTransaction(userPaymen, reciveName, user.token)
        toastr.success('Transação realizada')
      }
    } catch (error: any) {
      toastr.error('Nao foi possivel realizar transação')
    } finally {
      handleGetBalance(),
        handleGetTransaction()
    }
  }, [user, amount])

  const handleGetTransaction = useCallback(async () => {
    try {
      if (user) {
        const response = await UserService.getTransaction(id, user.token);
        setTransaction(response)
      }
    } catch (error: any) {
      toastr.error('Nao foi possivel obter o transaçoes')
    }
  }, [id])

  const handleClose = useCallback(() => {
    setAmount(0),
      setReciveName('');
    setOpenModal(false)
  }, [])

  useEffect(() => {
    handleGetBalance()
    if (id !== 0) {
      handleGetTransaction()
    }
  }, [id])

  if (!transaction.length) {
    return (
      <Box>
        <Header balance={balance} />
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          style={{ left: '90%', marginTop: '10px' }}>Nova transaçao</Button>
        <Typography>No momento nao a transações cadastradas</Typography>
        <ModalHome
          amount={amount}
          reciveName={reciveName}
          setAmount={setAmount}
          setReciveName={setReciveName}
          open={openModal}
          handleCreateTransaction={handleCreateTransaction}
          handleClose={handleClose} />
      </Box>
    )
  }

  return (
    <Box>
      <Header balance={balance} />
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        style={{ left: '90%', marginTop: '10px' }}>Nova transaçao</Button>
      {transaction.length && (
        <TableHome transaction={transaction} />
      )}
      <ModalHome
        amount={amount}
        reciveName={reciveName}
        setAmount={setAmount}
        setReciveName={setReciveName}
        open={openModal}
        handleCreateTransaction={handleCreateTransaction}
        handleClose={handleClose} />
    </Box>
  )
}

export default Home