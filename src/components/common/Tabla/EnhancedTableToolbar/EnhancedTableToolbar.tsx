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

export default function EnhancedTableToolbar() {
  const [searchText, setSearchText] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            Productos
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <OutlinedInput
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
    </Toolbar>
  );
}
