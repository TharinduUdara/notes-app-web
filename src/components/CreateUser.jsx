import {
  Button,
  Container,
  Dialog,
  TextField,
  Typography,
  Fab,
  DialogContent,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  IconButton,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const numberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/;

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [allUsers, setAllUsers] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const [email, setEmail] = useState("");
  const [hasEmailError, setEmailError] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");
  const [hasMobileError, setHasMobileError] = useState(false);

  const [snackBarData, setSnackbarData] = useState(null);

  const getAllUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:3200/users")
      .then((response) => {
        setAllUsers(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setSnackbarData({
          variant: "error",
          message: "Oops! Something went wrong.",
        });
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleOnOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChangeDob = (change) => {
    setDob(change);
  };

  const handleOnChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleOnChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleOnChangeMobile = (event) => {
    setMobileNumber(event.target.value);
    // validate Number
    if (numberRegex.test(event.target.value)) {
      setHasMobileError(false);
    } else {
      
    }
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

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobileNumber('');
    setDob('');
  };

  const onSubmit = () => {
    setLoading(true);
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dob,
      mobile: mobileNumber,
    };
    if (editingUser) {
      axios
        .put("http://localhost:3200/users/" + editingUser._id, body)
        .then(() => {
          setSnackbarData({
            variant: "success",
            message: "User updated successfully.",
          });
          getAllUsers();
          setOpen(false);
          clearFields();
          setEditingUser(null);
        })
        .catch(() => {
          setSnackbarData({
            variant: "error",
            message: "Oops! Something went wrong.",
          });
        });
    } else {
      axios
        .post("http://localhost:3200/users", body)
        .then((response) => {
          setSnackbarData({
            variant: "success",
            message: "User created successfully.",
          });
          getAllUsers();
          clearFields();
          setOpen(false);
        })
        .catch(() => {
          setSnackbarData({
            variant: "error",
            message: "Oops! Something went wrong.",
          });
        });
    }
  };

  const handleOnDelete = (id) => {
    setLoading(true);

    const url = "http://localhost:3200/users/" + id;
    axios
      .delete(url)
      .then(() => {
        setSnackbarData({
          variant: "success",
          message: "User deleted successfully.",
        });
        getAllUsers();
      })
      .catch(() => {
        setSnackbarData({
          variant: "error",
          message: "Oops! Something went wrong.",
        });
      });
  };

  const handleOnEdit = (user) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobileNumber(user.mobile);
    setDob(user.dateOfBirth);
    setEditingUser(user);
    setOpen(true);
  };

  const renderUsers = () => {
    return allUsers.map((user) => {
      return (
        <ListItem
          secondaryAction={
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleOnEdit(user);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleOnDelete(user._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.firstName + " " + user.lastName}
            secondary={user.email}
          />
        </ListItem>
      );
    });
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
      <Backdrop open={loading} sx={{
        zIndex: 999
      }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card
        sx={{
          p: 3,
          minWidth: "600px",
          height: "70vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h4">Users</Typography>
        <List>{renderUsers()}</List>
      </Card>

      <Fab
        onClick={handleOnOpen}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Create User
          </Typography>

          <TextField
            onChange={handleOnChangeFirstName}
            value={firstName}
            sx={{
              width: "100%",
              mb: 2,
            }}
            label="First Name"
            variant="outlined"
          />

          <TextField
            onChange={handleOnChangeLastName}
            value={lastName}
            sx={{
              width: "100%",
              mb: 2,
            }}
            label="Last Name"
            variant="outlined"
          />
          <TextField
            error={hasEmailError}
            value={email}
            onChange={handleOnChangeEmail}
            sx={{
              width: "100%",
              mb: 2,
            }}
            label="Email"
            variant="outlined"
          />

          <TextField
            error={hasMobileError}
            value={mobileNumber}
            onChange={handleOnChangeMobile}
            sx={{
              width: "100%",
              mb: 2,
            }}
            label="Mobile Number"
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
                  width: "100%",
                  mb: 2,
                }}
              />
            )}
          />

          <Button
            disabled={
              !email ||
              hasEmailError ||
              hasMobileError ||
              !firstName ||
              !dob ||
              !lastName ||
              !mobileNumber
            }
            onClick={onSubmit}
            sx={{
              width: "100%",
            }}
            variant="contained"
          >
            {editingUser ? "Update" : "Create"}
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackBarData ? true : false}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        autoHideDuration={5000}
        variant="filled"
        onClose={() => {
          setSnackbarData(null);
        }}
      >
        <Alert
          severity={snackBarData ? snackBarData.variant : "info"}
          sx={{ width: "100%" }}
        >
          {snackBarData ? snackBarData.message : ""}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUser;
