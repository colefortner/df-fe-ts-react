import React from "react";
import Comment from "./Comment";
import Rating from "../UIElements/Rating";

interface CommentsListProps {
  businessId: string | undefined;
  addComment: (
    commentId: string,
    userId: string,
    comment: string,
    rating: number,
    avatar: string | null,
    username: string | null,
    commentDate: Date
  ) => void;
  editComment: (
    commentId: string,
    comment: string,
    rating: number | undefined
  ) => void;
  deleteComment: (id: string) => void;

  comments: {
    _id: string;
    userId: string;
    avatar: string;
    username: string;
    comment: string;
    rating: number;
    commentDate: Date;
  }[];
}

const CommentList: React.FC<CommentsListProps> = (props) => {
  if (props.comments === undefined) {
    return <h2>No comments yet</h2>;
  }
  return (
    <ul style={{ listStyle: "none" }}>
      {props.comments.map((comment, index) => (
        <>
          {/* <Rating rating={comment.rating} /> */}
          <Comment
            key={comment._id}
            review={comment.comment}
            id={comment._id}
            businessId={props.businessId}
            commentUserId={comment.userId}
            userAvatar={comment.avatar}
            username={comment.username}
            commentDate={comment.commentDate}
            addComment={props.addComment}
            editComment={props.editComment}
            deleteComment={props.deleteComment}
            rating={comment.rating}
          />
        </>
      ))}
    </ul>
  );
};

export default CommentList;
