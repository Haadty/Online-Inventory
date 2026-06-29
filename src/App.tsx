import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Products from "./pages/products/products";
import Users from "./pages/users/users";
import Transactions from "./pages/transactions/transactions";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <Transactions />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
