import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import NoMatchPage from "./components/noMatch";
import DefaultLayout from "./components/containers/default";
import CreateProduct from "./components/createProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}

export default App;