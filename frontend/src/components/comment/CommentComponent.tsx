import React from "react";
import { CommentType } from "../../shared/interfaces/product";
import { Rating } from "../Rating";
import { useGetProductByIdMutation } from "../../redux/api/productApi";

export const CommentComponent = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className="mb-5">
      <h3>Comments</h3>
      {comments.map((com, index) => (
        <div key={index} className="p-2 my-2 card">
          <h5>{com.user}</h5>
          <Rating rating={com.rating} />
          <p className=" my-1">{com.body}</p>
        </div>
      ))}
    </div>
  );
};

export const CommentPaginator = ({
  meta,
  productId,
}: {
  meta: { total_page: number; current_page: number };
  productId: string;
}) => {
  const [getProductById] = useGetProductByIdMutation();
  return (
    <>
      <nav
        aria-label="..."
        className="my-4 d-flex justify-content-center align-items-center"
      >
        <ul className="pagination">
          {Array(meta.total_page)
            .fill(0)
            .map((link, index) => (
              <li
                role="button"
                className={`page-item ${
                  meta.current_page == index + 1 && "active"
                }`}
                key={index}
                onClick={() =>
                  getProductById({ id: productId, page: index + 1 })
                }
              >
                <a className="page-link">{index + 1}</a>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};
