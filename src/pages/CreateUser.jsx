import { Button, Card, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const CreateUser = () => {
  const [name, setName] = useState("");
  const [setConfirmPassword] = useState("");
  const [dob, setDob] = useState(null);

  const [email, setEmail] = useState("");
  const [hasEmailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [hasPasswordError, setPasswordError] = useState(false);

  const handleOnCreateUser = () => {};

  const handleOnChangeDob = (change) => {
    setDob(change);
  };

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);

    // validate email
    if (emailRegex.test(event.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

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
          Create User
        </Typography>

        <TextField
          onChange={handleOnChangeName}
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="First Name"
          variant="outlined"
        />

        <TextField
          onChange={handleOnChangeName}
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="Last Name"
          variant="outlined"
        />
        <TextField
          error={hasEmailError}
          onChange={handleOnChangeEmail}
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="Email"
          variant="outlined"
        />

        <DatePicker
          label="Date of Birth"
          value={dob}
          onChange={handleOnChangeDob}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                minWidth: "400px",
                mb: 2,
              }}
            />
          )}
        />

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
            !email || !password || hasEmailError || hasPasswordError || !name
          }
          onClick={handleOnCreateUser}
          sx={{
            minWidth: "400px",
          }}
          variant="contained"
        >
          Create
        </Button>
      </Card>
    </Container>
  );
};

export default CreateUser;
