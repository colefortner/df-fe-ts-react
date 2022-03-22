import React, { useState, useContext } from "react";
import styled from "styled-components";
import { unstable_batchedUpdates } from "react-dom";
import { TiDelete, TiEdit, TiInputChecked, TiCancel } from "react-icons/ti";

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
  let business = "Pinellas";
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ maxHeight: "75px" }}>
          <img
            src={`http://localhost:5050/${auth.avatar}`}
            // src="https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif"
            alt="User"
            style={{ width: 75, height: 75, borderRadius: "100px" }}
          />
        </div>
        <form onSubmit={props.isEditing ? editHandler : submitHandler}>
          <div style={{ marginLeft: "20px", marginTop: "-10px" }}>
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              {auth.username}
            </p>
            <RatingForm childCallback={childCallback} />
            <p>Some message or data</p>
          </div>
          {/* <div>{comment}</div> */}
          <div style={{ marginTop: "10px", marginLeft: "-75px" }}>
            <input
              type="text"
              id="comment"
              placeholder={`Tell us what you thought!`}
              name="comment"
              size={65}
              onChange={changeHandler}
              value={comment}
              style={{
                all: "unset",
                border: "1px solid hsla(254, 19%, 14%, 0.815)",
                fontSize: "20px",
                marginTop: "4px",
                color: "hsla(254, 19%, 14%, 0.815)",
                width: "90%",
                marginLeft: "-5px",
                borderRadius: "5px",
                paddingLeft: "4px",
                marginBottom: "5px",
              }}
            />
          </div>
          <div style={{ marginLeft: "-75px" }}>
            <button
              type="submit"
              style={{
                border: "none",
                fontSize: "30px",
                color: "green",
              }}
            >
              <TiInputChecked />
              {/* {props.isEditing ? "Submit Edit" : "Submit"} */}
            </button>
            {props.isEditing && (
              <button
                onClick={props.editModeHandler}
                style={{
                  border: "none",
                  fontSize: "30px",
                  color: "red",
                }}
              >
                {/* Cancel Edit */}
                <TiCancel />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
