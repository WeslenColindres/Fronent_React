import * as React from 'react';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableHead  from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import { Order, Producto } from '../../../type/type';
import { HeadCellProducto } from '../../../interfaces/Interfaces';

interface EnhancedTableHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Producto,
  ) => void;
  rowCount: number;
  headCells: readonly HeadCellProducto[];
}

export default function ProductoTableHead({
  order,
  orderBy,
  onRequestSort,
  rowCount,
  headCells,
}: EnhancedTableHeadProps) {
  
  const createSortHandler =
    (property: keyof Producto) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
