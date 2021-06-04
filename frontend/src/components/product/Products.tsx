import { SyntheticEvent, useMemo } from 'react';
import { Column, useTable } from 'react-table';

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';

interface RowData {
  id: string;
}

const Products = () => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'In stock',
        accessor: 'inStock',
      },
    ],
    []
  );

  const { data, destroy } = useProducts();

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleDelete = async (_e: SyntheticEvent, id: string) => {
    await destroy(id);
  };

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          const { id } = row.original as RowData;
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
              })}
              <TableCell>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ marginRight: 16 }}
                  component={Link}
                  to={`/products/${id}`}>
                  Edit
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={(e: SyntheticEvent) => handleDelete(e, id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Products;
