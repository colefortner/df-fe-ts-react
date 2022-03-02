import React, { useState } from "react";

import CommentForm from "./ComentForm";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  review: string;
  businessId: string;
}

const Comment: React.FC<CommentProps> = (props) => {
  const [editMode, setEditMode] = useState(false);

  const deleteHandler = () => {
    fetch(`http://localhost:5050/comments/${props.id}`, {
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
      <button onClick={editModeHandler}>Edit</button>
    </li>
  );
};

export default Comment;
