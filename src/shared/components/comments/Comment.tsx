import React from "react";

interface CommentProps {
  // key: number;
  key: string;
  id: string;
  review: string;
}

const Comment: React.FC<CommentProps> = (props) => {
  return (
    <li>
      <h2>
        Comment Number: {props.id} Comment: {props.review}
      </h2>
    </li>
  );
};

export default Comment;
