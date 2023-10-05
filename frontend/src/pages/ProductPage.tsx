import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdMutation } from "../redux/api/productApi";
import Alert from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/userHook";
import { CartCanvas } from "../components/CartCanvas";
import { Rating } from "../components/Rating";
import {
  decreaseQtyCart,
  increaseQtyCart,
  setCart,
  unSetCart,
} from "../redux/features/productSlice";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { productType } from "../shared/interfaces/product";
import {
  CommentComponent,
  CommentPaginator,
} from "../components/comment/CommentComponent";
import CreateComment from "../components/comment/CreateComment";

export const ProductPage = () => {
  const { id } = useParams();
  const [getProductById, { isLoading, isError, error, isSuccess }] =
    useGetProductByIdMutation();
  const { product } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  let content;
  const {
    cart: { products },
  } = useAppSelector((state) => state.product);
  const [like, setLike] = useState<boolean>(false);
  const [qty, setQty] = useState<number | undefined>(1);
  const dispatch = useAppDispatch();

  const cartHandler = (id: number) => {
    setLike(!like);
    !like ? dispatch(setCart({ id })) : dispatch(unSetCart({ id }));
  };
  const increaseQty = (id: number) => {
    dispatch(increaseQtyCart({ id }));
  };
  const decreaseQty = (id: number) => {
    dispatch(decreaseQtyCart({ id }));
  };
  let productFromCart: (productType & { qty: number }) | undefined;

  useEffect(() => {
    setLike(products.some((p) => (p.id == product?.id ? true : false)));
    setQty(
      products.find((p) => p.id == Number(id))
        ? products.find((p) => p.id == Number(id))?.qty
        : 1
    );
    productFromCart = products.find((p) => p.id == Number(id));
  }, [products, product]);

  if (isLoading)
    content = (
      <div style={{ width: "100%", height: "100%" }}>
        <Spinner />
      </div>
    );
  if (isError) {
    content = (
      <Alert message={error.data.message as string} className="danger" />
    );
  }
  if (isSuccess && product) {
    content = (
      <div>
        <CartCanvas />
        <div className="row my-3 g-3">
          <div className="col-8">
            <h1>{product?.name}</h1>
            <div className="d-flex justify-content-between align-items-center my-2">
              <Rating rating={product.rating} />
              <div>
                {!like ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => cartHandler(product.id)}
                  >
                    Add to CART
                  </button>
                ) : (
                  <span className="d-flex justify-content-between align-items-center my-1">
                    <BsPlusCircle
                      size={32}
                      onClick={() => increaseQty(product.id)}
                      color="orange"
                    />

                    <span className="mx-1">{qty}</span>

                    <AiOutlineMinusCircle
                      size={36}
                      color="orange"
                      onClick={() => decreaseQty(product.id)}
                    />
                  </span>
                )}
              </div>
            </div>
            <p className="my-2">{product.description}</p>
            <h3>Categories</h3>
            {product.categories.map((c, index) => (
              <Link
                to={`/categories/${c.id}?name=${c.name}`}
                type="button"
                key={index}
                className="btn btn-outline-primary mx-1"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="col-4">
            <img
              src={`http://127.0.0.1:8000/${product?.image}`}
              style={{ objectFit: "cover", width: "100%" }}
              alt=""
            />
          </div>
        </div>
        {user && <CreateComment />}

        {product.comments.length > 0 && id && (
          <div className="mb-5">
            <CommentComponent comments={product.comments} />
            {product.meta.total_page > 1 && (
              <CommentPaginator meta={product.meta} productId={id} />
            )}
          </div>
        )}
      </div>
    );
  }
  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  return <div className="container">{content}</div>;
};
