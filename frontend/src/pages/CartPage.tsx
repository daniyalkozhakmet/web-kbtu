import React from "react";
import { CartCanvas } from "../components/CartCanvas";
import { useAppDispatch, useAppSelector } from "../hooks/userHook";
import Alert from "../components/Alert";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import {
  decreaseQtyCart,
  increaseQtyCart,
} from "../redux/features/productSlice";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const {
    cart: { products, totalPrice, totalQty, totalSum },
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const increaseQty = (id: number) => {
    dispatch(increaseQtyCart({ id }));
  };
  const decreaseQty = (id: number) => {
    dispatch(decreaseQtyCart({ id }));
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-2">My CART</h1>
        <h3>Total: {totalPrice}$</h3>
      </div>

      {products.length == 0 ? (
        <Alert className="warning" message="Your cart is empty" />
      ) : (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    {product.price} * {product.qty} ={" "}
                    {(product.price * product.qty).toFixed(2)}
                  </td>
                  <td>
                    {" "}
                    <img
                      src={`http://127.0.0.1:8000/${product.image}`}
                      height={50}
                      width={80}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <BsPlusCircle
                      size={22}
                      color="orange"
                      onClick={() => increaseQty(product.id)}
                    />
                    <span className="mx-1">{product.qty}</span>
                    <AiOutlineMinusCircle
                      size={24}
                      color="orange"
                      onClick={() => decreaseQty(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end my-4">
            <Link to="/checkout" className="btn btn-primary">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}

      <CartCanvas />
    </div>
  );
};
