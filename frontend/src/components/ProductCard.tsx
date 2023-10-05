import React, { useEffect, useState } from "react";
import { productType } from "../shared/interfaces/product";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../hooks/userHook";
import { setCart, unSetCart } from "../redux/features/productSlice";
import { Link } from "react-router-dom";
import { Rating } from "./Rating";

export const ProductCard = ({ product }: { product: productType }) => {
  const {
    cart: { products },
  } = useAppSelector((state) => state.product);
  const [like, setLike] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const addToCartHandler = (id: number) => {
    setLike(!like);
    !like ? dispatch(setCart({ id })) : dispatch(unSetCart({ id }));
  };
  useEffect(() => {
    setLike(products.some((p) => (p.id == product.id ? true : false)));
  }, [products, product]);
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={`http://127.0.0.1:8000/${product.image}`}
        height={200}
        style={{ objectFit: "cover" }}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        {/* <p className="card-text">{product.description.substring(0, 50)}</p> */}
        <div className="d-flex justify-content-between align-items-center my-1">
          <Rating rating={product.rating} />
          <span onClick={() => addToCartHandler(product.id)}>
            {like ? (
              <AiFillHeart color="red" size={20} />
            ) : (
              <AiOutlineHeart size={20} />
            )}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/products/${product.id}`} className="btn btn-primary">
            View
          </Link>
          <span className="bg-warning text-black p-1 rounded">
            {product.price} $
          </span>
        </div>
      </div>
    </div>
  );
};
