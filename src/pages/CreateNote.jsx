import {
  TextField,
  Card,
  Container,
  Button,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

const CreateNote = () => {
  const handleOnClickNew = () => {
    // TODO: open a popup
    console.log("hello");
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
      <Fab color="primary" aria-label="add" sx={{
        position: 'fixed',
        bottom: 20,
        right: 20
      }}>
        <AddIcon />
      </Fab>
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
          Create Note
        </Typography>
        <TextField
          sx={{
            minWidth: "400px",
            mb: 2,
          }}
          label="Title"
          variant="outlined"
        />
        <TextField label="Multiline" multiline rows={4} variant="outlined" />

        <Button
          sx={{
            minWidth: "400px",
            mt: 2,
          }}
          variant="contained"
        >
          Create
        </Button>
      </Card>
    </Container>
  );
};

export default CreateNote;
