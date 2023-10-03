import React from "react";
import { metaType } from "../shared/interfaces/product";
import { useGetProductsMutation } from "../redux/api/productApi";

const Pagination = ({ meta }: { meta: metaType }) => {
  const [getProducts] = useGetProductsMutation();
  return (
    <nav
      aria-label="..."
      className="my-4 d-flex justify-content-center align-items-center"
    >
      <ul className="pagination">
        {meta.links.map((link, index) => (
          <li
            className={`page-item ${
              meta.current_page == index + 1 && "active"
            }`}
            key={index}
            onClick={() => getProducts(index + 1)}
          >
            <a className="page-link" href="#">
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
