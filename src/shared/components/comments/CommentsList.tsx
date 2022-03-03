import React from "react";
import Comment from "./Comment";

interface CommentsListProps {
  businessId: string | undefined;
  comments: {
    _id: string;
    userId: string;
    comment: string;
  }[];
}

const CommentList: React.FC<CommentsListProps> = (props) => {
  if (props.comments === undefined) {
    return <h2>No comments yet</h2>;
  }
  return (
    <ul>
      {props.comments.map((comment, index) => (
        <Comment
          key={comment._id}
          review={comment.comment}
          id={comment._id}
          businessId={props.businessId}
          commentUserId={comment.userId}
        />
      ))}
    </ul>
  );
};

export default CommentList;
