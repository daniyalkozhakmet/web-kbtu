import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Layout } from "./components/Layout";
import { ProductByCategoryPage } from "./pages/ProductsByCategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { useLazyGetProductsQuery } from "./redux/api/productApi";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AdminProtectedRoute } from "./utils/AdminProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import { UsersPage } from "./pages/admin/UsersPage";
import { ProductsPage } from "./pages/admin/ProductsPage";
import { OrdersPage } from "./pages/admin/OrdersPage";

function App() {
  const [getProducts] = useLazyGetProductsQuery();
  useEffect(() => {
    getProducts("");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="categories/:id" element={<ProductByCategoryPage />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<UsersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
