import React, { useEffect, useState } from "react";
import { CreateCommentType } from "../../shared/interfaces/product";
import { useCreateCommentMutation } from "../../redux/api/productApi";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const { id } = useParams();
  const [createComment, { isLoading, isError, error, isSuccess }] =
    useCreateCommentMutation();
  const [comment, setComment] = useState<CreateCommentType>({
    body: "",
    rating: 0,
  });
  const submitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (id) {
      createComment({ ...comment, product_id: id });
      setComment({ body: "", rating: 0 });
    }
    console.log(comment);
  };
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error]);
  return (
    <div className="my-2">
      <h3>Leave a comment</h3>
      <form>
        <div className="form-group my-1">
          <label htmlFor="exampleFormControlSelect1">Rate</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) =>
              setComment({ ...comment, rating: Number(e.target.value) })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group my-1">
          <label htmlFor="exampleFormControlTextarea1">Comment</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            value={comment.body}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary my-1"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
