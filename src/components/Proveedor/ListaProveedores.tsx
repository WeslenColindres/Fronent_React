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
import { Order, Proveedor } from "../../type/type";
import {
  stableSort,
  getComparator,
} from "../common/Tabla/tableUtils/tableUtils";
import { ProveedorTableProps } from "../../interfaces/Interfaces";

import { headCellsProveedor } from "../../../utils/hheaderCelld/headerCell";
import { Link } from "react-router-dom";
import ProveedorTableHead from "./ProveedorTableHead/ProveedorTableHead";
import { useDetalleProveedor } from "../../contexts/DetalleProveedorContext";
import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar";

export default function ListaProveedores({ data }: ProveedorTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Proveedor>("ID_Proveedor");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { setProveedor } = useDetalleProveedor();
  const [searchText, setSearchText] = React.useState("");
  
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Proveedor
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    Proveedor: Proveedor,
    id: number
  ) => {
    setProveedor((prev) => (prev = Proveedor));
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
    ? visibleRows.filter((Proveedor) =>
        Proveedor.Nombre_Proveedor.toLowerCase().includes(
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
            <ProveedorTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              headCells={headCellsProveedor}
            />
            <TableBody>
              {filteredData.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.ID_Proveedor}
                    onClick={(event) =>
                      handleClick(event, row, row.ID_Proveedor)
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Link
                        to={`/dashboard/Proveedor/detalles/${row.ID_Proveedor}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {row.Nombre_Proveedor}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.Contacto}</TableCell>
                    <TableCell align="right">{row.Teléfono}</TableCell>
                    <TableCell align="right">{row.Dirección}</TableCell>
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
