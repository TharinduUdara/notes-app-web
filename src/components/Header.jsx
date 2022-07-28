import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  const navigate = useNavigate();

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null

    navigate("/login", { replace: true });
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          NotesApp
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {props.disableLogout ? null : (
            <Button sx={{ color: "#fff" }} onClick={handleOnLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
