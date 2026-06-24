import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/login";
import Products from "./pages/Products/products";
import Users from "./pages/Users/users";
import Admins from "./pages/Admins/admins";
import Transactions from "./pages/Transactions/transactions";
import History from "./pages/History/history";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/history" element={<History />} />

        </Routes>
    );
}

export default App;