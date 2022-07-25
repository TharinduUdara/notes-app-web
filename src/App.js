import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Header from "./components/Header";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="create-note" element={<CreateNote />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
