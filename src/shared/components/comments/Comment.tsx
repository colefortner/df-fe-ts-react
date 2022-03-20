import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TiDelete, TiEdit } from "react-icons/ti";

import CommentForm from "./ComentForm";
import Rating from "../UIElements/Rating";

import { AuthContext } from "../../context/auth-context";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  commentUserId: string;
  userAvatar: string;
  username: string;
  review: string;
  rating: number;
  businessId: string | undefined;
  commentDate: Date;
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

const CommentListItem = styled.div`
  display: inline-flex;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const Avatar = styled.img``;

const Comment: React.FC<CommentProps> = (props) => {
  const auth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const doneEditing = (value: boolean) => {
    setIsEditing(value);
  };

  const deleteHandler = () => {
    fetch(`http://localhost:5050/comments/${props.businessId}/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    props.deleteComment(props.id);
  };

  const editModeHandler = () => {
    setIsEditing(!isEditing);
  };

  const commie = props.commentDate;

  return (
    <div style={{ marginBottom: "30px" }}>
      {isEditing === true ? (
        <>
          <CommentForm
            businessId={props.businessId}
            reviewComment={props.review}
            commentId={props.id}
            isEditing={isEditing}
            doneEditing={doneEditing}
            addComment={props.addComment}
            editComment={props.editComment}
            deleteComment={props.deleteComment}
          />
          <button onClick={editModeHandler}>Cancel edit</button>
        </>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            <Avatar
              src={`http://localhost:5050/${props.userAvatar}`}
              // src="https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif"
              alt="User"
              style={{ width: 75, height: 75, borderRadius: "100px" }}
            />
            <div style={{ marginLeft: "20px", marginTop: "-10px" }}>
              <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                {props.username}
              </p>
              <Rating rating={props.rating} />
              <p>{new Date(props.commentDate).toLocaleDateString()}</p>
            </div>
          </div>
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              color: "hsla(254, 19%, 14%, 0.815)",
              maxWidth: "800px",
            }}
          >
            {props.review}
            {/* Comment Number: {props.id} Comment: {props.review} */}
          </p>
        </div>
      )}
      {auth.userId === props.commentUserId && !isEditing && (
        <div style={{ float: "right", marginTop: "-52px" }}>
          <button
            onClick={editModeHandler}
            style={{ all: "unset", color: "navy-blue", fontSize: "30px" }}
          >
            <TiEdit />
          </button>
          <button
            onClick={deleteHandler}
            style={{ all: "unset", color: "red", fontSize: "30px" }}
          >
            <TiDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
