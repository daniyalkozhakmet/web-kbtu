import React from "react";
import { categoryType } from "../shared/interfaces/product";

const CategoryCart = ({ category }: { category: categoryType }) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={`http://127.0.0.1:8000/${category.image}`}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{category.name}</h5>
        <a href="#" className="btn btn-primary">
          Products
        </a>
      </div>
    </div>
  );
};

export default CategoryCart;
