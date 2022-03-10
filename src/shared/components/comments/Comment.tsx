import React, { useState, useContext } from "react";

import CommentForm from "./ComentForm";
import { AuthContext } from "../../context/auth-context";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  commentUserId: string;
  userAvatar: string;
  username: string;
  review: string;
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
    <li>
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
        <>
          <h2>{props.username}</h2>
          <p>{new Date(props.commentDate).toLocaleDateString()}</p>
          <img
            src={`http://localhost:5050/${props.userAvatar}`}
            // src="https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif"
            alt="User"
            style={{ width: 75, height: 75, borderRadius: "100px" }}
          />
          <h2>
            Comment Number: {props.id} Comment: {props.review}
          </h2>
        </>
      )}
      {auth.userId === props.commentUserId && !isEditing && (
        <>
          <button onClick={editModeHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Comment;
