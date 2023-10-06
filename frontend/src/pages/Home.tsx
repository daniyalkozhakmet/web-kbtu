import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../redux/api/productApi";
import { Spinner } from "../components/Spinner";
import Alert from "../components/Alert";
import { useAppSelector } from "../hooks/userHook";
import { ProductCard } from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { CartCanvas } from "../components/CartCanvas";
import CategoryCart from "../components/CategoryCart";

export const Home = () => {
  const { isLoading, isError, error, isSuccess } = useGetProductsQuery("");
  const {
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
    isSuccess: isSuccessCategory,
  } = useGetCategoriesQuery("");
  const { products, meta, categories } = useAppSelector(
    (state) => state.product
  );
  let content;
  if (isLoading || isLoadingCategory)
    content = (
      <div style={{ width: "100%", height: "100%" }}>
        <Spinner />
      </div>
    );
  if (isError) content = <Alert message={error as string} className="danger" />;
  if (isErrorCategory)
    content = <Alert message={errorCategory as string} className="danger" />;
  if (isSuccess && isSuccessCategory)
    content = (
      <>
        <h1 className="my-4">Categories</h1>
        <div className="row g-3">
          {categories?.map((category, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <CategoryCart category={category} />
            </div>
          ))}
        </div>
        <h1 className="my-4">Products</h1>
        <div className="row g-2">
          {products?.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {meta && <Pagination meta={meta} paginateWhat="products" />}
      </>
    );
  return (
    <div className="container">
      <CartCanvas />

      <div className="">{content}</div>
    </div>
  );
};
