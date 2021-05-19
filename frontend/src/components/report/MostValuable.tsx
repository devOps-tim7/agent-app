import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { Column, useTable } from 'react-table';
import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';

const MostValuable = () => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total Price',
        accessor: 'sum',
        Cell: (row) =>
          row.value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
      },
    ],
    []
  );

  const [mostValuable, setMostValuable] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/report/mostValuable');
      setMostValuable(response.data);
    };
    getData();
  }, []);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: mostValuable,
  });

  return (
    <Container maxWidth='lg'>
      <Paper>
        <Typography variant='h6' style={{ textAlign: 'center', paddingTop: 10 }}>
          Most earnings per product
        </Typography>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default MostValuable;
