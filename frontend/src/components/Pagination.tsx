import React from "react";
import { metaType } from "../shared/interfaces/product";
import {
  useGetProductsByCategoryMutation,
  useGetProductsMutation,
} from "../redux/api/productApi";

const Pagination = ({
  meta,
  paginateWhat,
  categoryId,
}: {
  meta: metaType;
  paginateWhat: string;
  categoryId?: string;
}) => {
  const [getProducts] = useGetProductsMutation();
  const [getProductsByCategory] = useGetProductsByCategoryMutation();
  return (
    <nav
      aria-label="..."
      className="my-4 d-flex justify-content-center align-items-center"
    >
      <ul className="pagination">
        {Array(meta.last_page)
          .fill(0)
          .map((link, index) => (
            <li
              className={`page-item ${
                meta.current_page == index + 1 && "active"
              }`}
              key={index}
              onClick={() =>
                paginateWhat == "products"
                  ? getProducts(index + 1)
                  : getProductsByCategory({
                      id: Number(categoryId ? categoryId : 1),
                      page: index + 1,
                    })
              }
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
