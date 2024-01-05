import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import OrdersPage from "./pages/OrdersPage";
import ManagementPage from "./pages/ManagementPage";
import GenQrPage from "./pages/GenQrPage";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import UserContextProvider from "./context/userContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <UserContextProvider>
        <ToastContainer/>
          <Nav />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/mgt" element={<ManagementPage />} />
            <Route path="/genqr" element={<GenQrPage />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
