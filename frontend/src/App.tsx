import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Layout } from "./components/Layout";
import { ProductByCategoryPage } from "./pages/ProductsByCategoryPage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="categories/:id" element={<ProductByCategoryPage />} />
        {/* <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route> */}

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
