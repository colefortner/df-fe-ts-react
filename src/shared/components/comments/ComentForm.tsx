import React, { useState, useContext } from "react";
import { TiDelete, TiEdit, TiInputChecked } from "react-icons/ti";

import { AuthContext } from "../../context/auth-context";
import RatingForm from "./RatingForm";

interface CommentFormProps {
  businessId: string | undefined;
  reviewComment: string;
  commentId: string;
  isEditing: boolean | null;
  doneEditing: (value: boolean) => void;
  editModeHandler: () => void;
  addComment: (
    commentId: string,
    userId: string,
    comment: string,
    review: number,
    avatar: string | null,
    username: string | null,
    commentDate: Date
  ) => void;
  editComment: (
    commentId: string,
    comment: string,
    review: number | undefined
  ) => void;
  deleteComment: (id: string) => void;
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
      props.addComment(
        props.commentId,
        auth.userId,
        comment,
        review,
        auth.avatar,
        auth.username,
        new Date()
      );
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
    props.editComment(props.commentId, comment, review);
  };

  return (
    <>
      <div style={{ display: "flex", marginLeft: "-100px" }}>
        <img
          src={`http://localhost:5050/${auth.avatar}`}
          // src="https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif"
          alt="User"
          style={{ width: 75, height: 75, borderRadius: "100px" }}
        />

        <form onSubmit={props.isEditing ? editHandler : submitHandler}>
          <div style={{ marginLeft: "20px", marginTop: "-10px" }}>
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              {auth.username}
            </p>
            <RatingForm childCallback={childCallback} />
          </div>
          {/* <div>{comment}</div> */}
          <div style={{ marginTop: "20px", marginLeft: "-80px" }}>
            <label htmlFor="comment">Comment</label>
            <br></br>
            <input
              type="text"
              id="comment"
              placeholder="comment"
              name="comment"
              size={65}
              onChange={changeHandler}
              value={comment}
              style={{
                fontSize: "20px",
                color: "hsla(254, 19%, 14%, 0.815)",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              float: "left",
              marginTop: "8px",
              fontSize: "15px",
              width: "100px",
              marginLeft: "-80px",
            }}
          >
            {props.isEditing ? "Submit Edit" : "Submit"}
          </button>
          {props.isEditing && (
            <button
              onClick={props.editModeHandler}
              style={{
                marginTop: "8px",
                fontSize: "15px",
                marginLeft: "5px",
                width: "100px",
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CommentForm;
