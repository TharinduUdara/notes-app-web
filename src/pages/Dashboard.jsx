import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import CreateUser from "../components/CreateUser";
import CreateNote from "../components/CreateNote";

const Dashboard = () => {
  const [accountType, setAccountType] = useState("USER");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    console.log(decoded);
    setAccountType(decoded.accountType);
  }, []);

  return (
    <Box>
      <Header />
      {accountType === "ADMIN" ? <CreateUser /> : <CreateNote />}
    </Box>
  );
};

export default Dashboard;
