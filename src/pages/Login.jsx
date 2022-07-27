import {
  TextField,
  Card,
  Container,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [hasError, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleOnLogin = () => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3200/auth/login", body)
      .then((response) => {
        localStorage.setItem("token", response.data.data);
        const decoded = jwt_decode(response.data.data);
        if (decoded.status === true) {
          navigate("/", { replace: true });
        } else {
          navigate("/password-reset", { replace: true });
        }
      })
      .catch(() => {
        setSnackbarOpen(true);
      });
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);

    // validate email
    if (emailRegex.test(event.target.value)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box>
      <Header disableLogout={true} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            error={hasError}
            onChange={handleOnChangeEmail}
            sx={{
              minWidth: "400px",
              mb: 2,
            }}
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={handleOnChangePassword}
            sx={{
              minWidth: "400px",
              mb: 2,
            }}
            label="Password"
            variant="outlined"
          />
          <Button
            disabled={!email || !password || hasError}
            onClick={handleOnLogin}
            sx={{
              minWidth: "400px",
            }}
            variant="contained"
          >
            Login
          </Button>
        </Card>
        <Snackbar
          open={isSnackbarOpen}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          autoHideDuration={5000}
          variant="filled"
          onClose={() => {
            setSnackbarOpen(false);
          }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            Invalid credentials!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Login;
