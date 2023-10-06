import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Layout } from "./components/Layout";
import { ProductByCategoryPage } from "./pages/ProductsByCategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { useLazyGetProductsQuery } from "./redux/api/productApi";

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
