import React from "react";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  review: string;
}

const Comment: React.FC<CommentProps> = (props) => {
  const deleteHandler = () => {
    fetch(`http://localhost:5050/comments/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <li>
      <h2>
        Comment Number: {props.id} Comment: {props.review}
      </h2>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Comment;
