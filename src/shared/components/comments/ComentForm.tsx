import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import RatingForm from "./RatingForm";

interface CommentFormProps {
  businessId: string | undefined;
  reviewComment: string;
  commentId: string;
  isEditing: boolean | null;
  doneEditing: (value: boolean) => void;
  addComment: (
    commentId: string,
    userId: string,
    comment: string,
    review: number
  ) => void;
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [comment, setComment] = useState<string>(props.reviewComment);
  const [review, setReview] = useState<undefined | number>();
  const auth = useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const childCallback = (value: undefined | number) => {
    setReview(value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:5050/comments/${props.businessId}`, {
      method: "POST",
      body: JSON.stringify({
        userId: auth.userId,
        comment: comment,
        rating: review,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    if (review && auth.userId) {
      props.addComment(props.commentId, auth.userId, comment, review);
    }
  };

  const editHandler = (event: React.FormEvent) => {
    event?.preventDefault();
    fetch(
      `http://localhost:5050/comments/${props.businessId}/${props.commentId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          comment: comment,
          rating: review,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    props.doneEditing(false);
  };

  return (
    <>
      <form onSubmit={props.isEditing ? editHandler : submitHandler}>
        <div>{comment}</div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            placeholder="comment"
            name="comment"
            onChange={changeHandler}
            value={comment}
          />
        </div>
        <RatingForm childCallback={childCallback} />
        <button type="submit">
          {props.isEditing ? "Submit Edit" : "Submit Comment"}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
