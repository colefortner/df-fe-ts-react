import React from "react";
import Comment from "./Comment";
import Rating from "../UIElements/Rating";

interface CommentsListProps {
  businessId: string | undefined;
  addComment: (
    commentId: string,
    userId: string,
    comment: string,
    rating: number
  ) => void;

  comments: {
    _id: string;
    userId: string;
    comment: string;
    rating: number;
  }[];
}

const CommentList: React.FC<CommentsListProps> = (props) => {
  if (props.comments === undefined) {
    return <h2>No comments yet</h2>;
  }
  return (
    <ul>
      {props.comments.map((comment, index) => (
        <>
          <Rating rating={comment.rating} />
          <Comment
            key={comment._id}
            review={comment.comment}
            id={comment._id}
            businessId={props.businessId}
            commentUserId={comment.userId}
            addComment={props.addComment}
          />
        </>
      ))}
    </ul>
  );
};

export default CommentList;
