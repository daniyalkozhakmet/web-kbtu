import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useGetProductsMutation } from "../redux/api/productApi";
import { Spinner } from "../components/Spinner";
import Alert from "../components/Alert";
import { useAppSelector } from "../hooks/userHook";
import { ProductCard } from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { CartCanvas } from "../components/CartCanvas";

export const Home = () => {
  const [getProducts, { isLoading, isError, error, isSuccess }] =
    useGetProductsMutation();
  const { products, meta } = useAppSelector((state) => state.product);
  useEffect(() => {
    getProducts("");
  }, []);
  let content;
  if (isLoading)
    content = (
      <div style={{ width: "100%", height: "100%" }}>
        <Spinner />
      </div>
    );
  if (isError) content = <Alert message={error as string} className="danger" />;
  if (isSuccess)
    content = (
      <>
        <div className="row g-2">
          {products?.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {meta && <Pagination meta={meta} />}
      </>
    );
  return (
    <div className="container">
      <CartCanvas />
      <h1 className="my-4">Products</h1>
      <div className="">{content}</div>
    </div>
  );
};
