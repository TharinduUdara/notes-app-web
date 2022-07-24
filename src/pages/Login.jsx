import { TextField, Card, Container, Button } from "@mui/material";
import React, { useState } from "react";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [hasError, setError] = useState(false);

  const [password, setPassword] = useState("");

  const handleOnLogin = () => {
    // TODO: send email and the password to the apis
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
    </Container>
  );
};

export default Login;
