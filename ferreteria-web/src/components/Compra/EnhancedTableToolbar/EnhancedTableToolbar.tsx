import * as React from "react";
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import AgregarCompra from '../modal';

interface EnhancedTableToolbarProps {
  onSearchTextChange: (value: string) => void; 
}

export default function EnhancedTableToolbar({ onSearchTextChange }: EnhancedTableToolbarProps) {
  const [searchText, setSearchText] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    onSearchTextChange(newSearchText); 
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Compras
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <OutlinedInput
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchInputChange}
            sx={{
              fontSize: "18px",
              width: "100%",
              "& input": {
                padding: "10px",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Add">
            <IconButton onClick={handleOpenModal}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <AgregarCompra 
        isOpen={isModalOpen} 
        handleClose={handleCloseModal} 
      />
    </Toolbar>
  );
}
