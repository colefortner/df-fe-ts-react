import React, { useState, useEffect, useContext } from "react";

import CommentsList from "./CommentsList";
import { AuthContext } from "../../context/auth-context";
import CommentForm from "./ComentForm";

interface CommentsProps {
  businessId: string | undefined;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const auth = useContext(AuthContext);
  const [commentsData, setCommentsData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/comments/${props.businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentsData(data.comments);
        console.log(data);
      });
  }, []);

  const addComment = (
    commentId: string,
    userId: string,
    comment: string,
    rating: number,
    avatar: string | null,
    username: string | null,
    commentDate: Date
  ) => {
    let something = {
      commentId,
      userId,
      comment,
      rating,
      avatar,
      username,
      commentDate,
    };
    setCommentsData([...commentsData, something]);
  };

  const deleteComment = (commentId: string) => {
    console.log("COMMENTIS", commentId);
    setCommentsData((prevState) => {
      const comments = prevState.filter((comment) => comment._id !== commentId);
      return comments;
    });
  };

  const hasCommented = commentsData.some(
    (comment) => comment.userId === auth.userId
  );

  console.log(commentsData);

  return (
    <>
      <CommentsList
        businessId={props.businessId}
        comments={commentsData}
        addComment={addComment}
        deleteComment={deleteComment}
      />
      {hasCommented === false && auth.isLoggedIn && (
        <CommentForm
          businessId={props.businessId}
          reviewComment=""
          commentId=""
          isEditing={null}
          doneEditing={() => {}}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      )}
    </>
  );
};

export default Comments;
