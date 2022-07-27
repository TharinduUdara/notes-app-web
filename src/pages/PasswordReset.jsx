import { Button, Card, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

const PasswordReset = () => {
  
  const [setConfirmPassword] = useState("");

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
          variant="h3"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 600 }}
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
          disabled={
            !password ||  hasPasswordError
          }
          onClick={handleOnChangeConfirmPassword}
          sx={{
            minWidth: "400px",
          }}
          variant="contained"
        >
          Update
        </Button>
      </Card>
    </Container>
  );
};

export default PasswordReset;