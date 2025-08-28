import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VerifyEmailPage } from "./pages/verify-email/VerifyEmailPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { LoginPage } from "./pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
