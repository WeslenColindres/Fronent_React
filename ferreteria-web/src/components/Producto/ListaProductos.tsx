import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import { Order, Producto } from "../../type/type";
import {
  stableSort,
  getComparator,
} from "../common/Tabla/tableUtils/tableUtils";
import { ProductoTableProps } from "../../interfaces/Interfaces";
import ProductoTableHead from "./ProductoTableHead/ProductoTableHead";
import { headCellsProductos } from "../../../utils/hheaderCelld/headerCell";

import { Link } from "react-router-dom";
import { useDetalleProducto } from "../../contexts/DetalleProductoContext";
import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar";

export default function ListaProductos({ data }: ProductoTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Producto>("ID_Producto");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { setProducto } = useDetalleProducto();

  const [searchText, setSearchText] = React.useState("");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Producto
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    Producto: Producto,
    id: number
  ) => {
    setProducto((prev) => (prev = Producto));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  const filteredData = searchText
    ? visibleRows.filter((producto) =>
        producto.Nombre_Producto.toLowerCase().includes(
          searchText.toLowerCase()
        )
      )
    : visibleRows;

  const handleSearchTextChange = (text: string) => {
    setSearchText((prev) => (prev = text));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onSearchTextChange={handleSearchTextChange} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <ProductoTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headCells={headCellsProductos}
            />
            <TableBody>
              {filteredData.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.ID_Producto}
                    onClick={(event) =>
                      handleClick(event, row, row.ID_Producto)
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Link
                        to={`/dashboard/Producto/detalles/${row.ID_Producto}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {row.Nombre_Producto}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.Descripción}</TableCell>
                    <TableCell align="right">{row.Precio_Unitario}</TableCell>
                    <TableCell align="right">{row.Cantidad_Stock}</TableCell>
                    <TableCell align="right">{row.ID_Categoria}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
