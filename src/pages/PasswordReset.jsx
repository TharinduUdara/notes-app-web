import { Button, Card, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PasswordReset = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");
  const [hasPasswordError, setPasswordError] = useState(false);

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);

    if (event.target.value.length > 6) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleOnChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOnSubmit = () => {
    if (password === confirmPassword) {
      const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
      const body = {
        password: password,
        _id: decoded.id
      };
      axios
        .post("http://localhost:3200/auth/reset", body)
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch(() => {
          // snackbar something went wrong
        });
    } else {
      // snackbar passwords are not equal
    }
  };

  return (
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
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Reset Password
        </Typography>

        <TextField
          error={hasPasswordError}
          onChange={handleOnChangePassword}
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="Password"
          variant="outlined"
        />
        <TextField
          onChange={handleOnChangeConfirmPassword}
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="Confirm Password"
          variant="outlined"
        />

        <Button
          disabled={!password || hasPasswordError}
          onClick={handleOnSubmit}
          sx={{
            minWidth: "400px",
          }}
          variant="contained"
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default PasswordReset;
