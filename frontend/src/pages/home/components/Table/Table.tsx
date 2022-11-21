import React, { useCallback, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { ITransaction } from '../../../../shared/interface';

interface IProps {
  transaction: ITransaction[] | undefined;
}

export const TableHome: React.FC<IProps> = ({ transaction }) => {

  const createRows = useCallback((
    date: string,
    acountDebited: number,
    acountCredited: number,
    value: string,
  ) => {
    return { date, acountDebited, acountCredited, value };
  }, [])

  const rows = useMemo(() => {
    if (transaction) {
      const row = transaction.map((item) => {
        return createRows(item.createdAt, item.debitedAccountId, item.creditedAccountId, item.value)
      })
      return row
    }
    return []
  }, [transaction])

  return (
    <TableContainer color='primary' style={{ marginTop: '20px', backgroundColor: '#4c9cec' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Data transação </TableCell>
            <TableCell align="right">Conta debitada</TableCell>
            <TableCell align="right">Conta creditada</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.acountDebited}</TableCell>
              <TableCell align="right">{row.acountCredited}</TableCell>
              <TableCell align="right">{`R$${row.value}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableHome;