import React, { useState, useContext } from "react";

import CommentForm from "./ComentForm";
import { AuthContext } from "../../context/auth-context";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  commentUserId: string;
  review: string;
  businessId: string | undefined;
  addComment: (
    commentId: string,
    userId: string,
    comment: string,
    review: number
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
            deleteComment={props.deleteComment}
          />
          <button onClick={editModeHandler}>Cancel edit</button>
        </>
      ) : (
        <h2>
          Comment Number: {props.id} Comment: {props.review}
        </h2>
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
