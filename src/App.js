import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import PasswordReset from "./pages/PasswordReset";
import Protected from "./components/Protected";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
