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
import { Column, useExpanded, useTable } from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const BestSelling = () => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total Quantity',
        accessor: 'sum',
        Cell: (row) => `${row.value} pcs.`,
      },
    ],
    []
  );

  const [bestSelling, setBestSelling] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/report/bestSelling');
      setBestSelling(response.data);
    };
    getData();
  }, []);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: bestSelling,
  });

  return (
    <Container maxWidth='lg'>
      <Paper>
        <Typography variant='h6' style={{ textAlign: 'center', paddingTop: 10 }}>
          Best selling products
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

export default BestSelling;
