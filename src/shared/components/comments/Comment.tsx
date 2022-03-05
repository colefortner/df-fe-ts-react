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
}

const Comment: React.FC<CommentProps> = (props) => {
  const auth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    fetch(`http://localhost:5050/comments/${props.businessId}/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  // const editHandler = () => {
  //   fetch(`http://localhost:5050/comments/${props.id}`, {
  //     method: "PATCH",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  const editModeHandler = () => {
    // if (editMode === false) {
    setIsEditing(!isEditing);
    // }

    // if (editMode === true) {
    //   editHandler();
    // }
  };

  return (
    <li>
      {isEditing === true ? (
        <CommentForm businessId={props.businessId} review={props.review} />
      ) : (
        <h2>
          Comment Number: {props.id} Comment: {props.review}
        </h2>
      )}
      {auth.userId === props.commentUserId && !isEditing ? (
        <>
          <button onClick={editModeHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      ) : (
        <button onClick={editModeHandler}>Cancel edit</button>
      )}
    </li>
  );
};

export default Comment;
