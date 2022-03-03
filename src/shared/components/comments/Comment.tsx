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
  const [editMode, setEditMode] = useState(false);

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
    setEditMode(!editMode);
    // }

    // if (editMode === true) {
    //   editHandler();
    // }
  };

  return (
    <li>
      <h2>
        Comment Number: {props.id} Comment: {props.review}
      </h2>
      <button onClick={deleteHandler}>Delete</button>
      {editMode === true && <CommentForm businessId={props.businessId} />}
      {auth.userId === props.commentUserId && (
        <button onClick={editModeHandler}>Edit</button>
      )}
    </li>
  );
};

export default Comment;
