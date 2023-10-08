import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/userHook";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import {
  decreaseQtyCart,
  increaseQtyCart,
} from "../redux/features/productSlice";
import { Link } from "react-router-dom";
export const CartCanvas = () => {
  const dispatch = useAppDispatch();
  const {
    cart: { products, totalPrice, totalSum },
  } = useAppSelector((state) => state.product);
  const increaseQty = (id: number) => {
    dispatch(increaseQtyCart({ id }));
  };
  const decreaseQty = (id: number) => {
    dispatch(decreaseQtyCart({ id }));
  };
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Cart
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Total price: {totalPrice} $</h4>
          <Link to="/cart">
            <button
              data-bs-dismiss="offcanvas"
              className="btn btn-outline-primary"
              aria-label="Close"
            >
              Go to cart
            </button>
          </Link>
        </div>

        {products.map((product) => (
          <div className="card my-1" key={product.id}>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    src={`http://127.0.0.1:8000/${product.image}`}
                    height={100}
                    width={130}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="my-1">
                  <span className="d-flex justify-content-between align-items-center my-1">
                    <BsPlusCircle
                      size={22}
                      onClick={() => increaseQty(product.id)}
                    />
                    <span className="mx-1">{product.qty}</span>
                    <AiOutlineMinusCircle
                      size={24}
                      onClick={() => decreaseQty(product.id)}
                    />
                  </span>
                  <p className="card-text bg-warning text-black p-1 rounded text-center">
                    {product.price} $
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
