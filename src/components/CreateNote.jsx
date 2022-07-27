import {
  TextField,
  Container,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItem,
  Box,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  List,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteIcon from "@mui/icons-material/Note";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CreateNote = () => {
  const [open, setOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [snackBarData, setSnackbarData] = useState(null);

  const handleOnCloseView = () => {
    setViewingNote(null);
  };

  const getAllNotes = () => {
    setLoading(true);
    axios
      .get("http://localhost:3200/notes")
      .then((response) => {
        setAllNotes(response.data.data);
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
    getAllNotes();
  }, []);

  const handleOnOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleOnChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
  };
  const onSubmit = () => {
    setLoading(true);
    const body = {
      title: title,
      description: description,
    };

    if (editingNotes) {
      axios
        .put("http://localhost:3200/notes/" + editingNotes._id, body)
        .then(() => {
          setSnackbarData({
            variant: "success",
            message: "User updated successfully.",
          });
          getAllNotes();
          setOpen(false);
          clearFields();
          setEditingNotes(null);
        })
        .catch(() => {
          setSnackbarData({
            variant: "error",
            message: "Oops! Something went wrong.",
          });
        });
    } else {
      axios
        .post("http://localhost:3200/notes", body)
        .then((response) => {
          setSnackbarData({
            variant: "success",
            message: "Note created successfully.",
          });
          getAllNotes();
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

    const url = "http://localhost:3200/notes/" + id;
    axios
      .delete(url)
      .then(() => {
        setSnackbarData({
          variant: "success",
          message: "successfully.",
        });
        getAllNotes();
      })
      .catch(() => {
        setSnackbarData({
          variant: "error",
          message: "Oops! Something went wrong.",
        });
      });
  };

  const handleOnEdit = (notes) => {
    setTitle(notes.title);
    setDescription(notes.description);
    setOpen(true);
  };

  const handleOnView = (notes) => {
    setViewingNote(notes);
  };

  const renderNotes = () => {
    return allNotes.map((notes) => {
      return (
        <ListItem
          key={notes._id}
          secondaryAction={
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleOnView(notes);
                }}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleOnEdit(notes);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleOnDelete(notes._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <NoteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={notes.title} />
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
      <Backdrop
        open={loading}
        sx={{
          zIndex: 999,
        }}
      >
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
        <Typography variant="h4">Notes</Typography>
        <List>{renderNotes()}</List>
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
        <DialogTitle>Create Note</DialogTitle>
        <DialogContent>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          ></Typography>

          <TextField
            onChange={handleOnChangeTitle}
            value={title}
            sx={{
              width: "100%",
              mb: 2,
            }}
            label="Title"
            variant="outlined"
          />
          <TextField
            onChange={handleOnChangeDescription}
            value={description}
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            sx={{
              width: "100%",
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button
            disabled={!title || !description}
            onClick={onSubmit}
            sx={{
              width: "100%",
            }}
            variant="contained"
          >
            {editingNotes ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewingNote ? true : false} onClose={handleOnCloseView}>
        <DialogTitle>{viewingNote ? viewingNote.title : ""}</DialogTitle>
        <DialogContent sx={{ minHeight: "40vh", width: "400px" }}>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{
              wordBreak: "break-word",
            }}
          >
            {viewingNote ? viewingNote.description : ""}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleOnCloseView} variant="contained">
            Close
          </Button>
        </DialogActions>
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

export default CreateNote;
