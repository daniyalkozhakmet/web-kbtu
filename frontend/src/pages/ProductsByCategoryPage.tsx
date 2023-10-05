import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductsByCategoryMutation } from "../redux/api/productApi";
import { Spinner } from "../components/Spinner";
import Alert from "../components/Alert";
import { useAppSelector } from "../hooks/userHook";
import { ProductCard } from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { CartCanvas } from "../components/CartCanvas";

export const ProductByCategoryPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  let name = searchParams.get("name");
  console.log(name);
  const [getProductsByCategory, { isLoading, isSuccess, isError, error }] =
    useGetProductsByCategoryMutation();
  const { products, meta, categories } = useAppSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (id) getProductsByCategory({ id: Number(id) });
  }, [id]);
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
        <h1 className="my-4">{name}</h1>
        <div className="row g-2">
          {products?.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {meta && (
          <Pagination
            meta={meta}
            paginateWhat="productByCategory"
            categoryId={id}
          />
        )}
      </>
    );
  return (
    <div className="container">
      <CartCanvas />

      <div className="">{content}</div>
    </div>
  );
};
