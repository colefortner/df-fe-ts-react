import React, { useState, useEffect, useContext } from "react";

import CommentsList from "./CommentsList";
import { AuthContext } from "../../context/auth-context";
import CommentForm from "./ComentForm";

interface CommentsProps {
  businessId: string | undefined;
  getRatingUpdate: (avg: number, length: number) => void;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const auth = useContext(AuthContext);
  const [commentsData, setCommentsData] = useState<any[]>([]);

  const ratingsLength = commentsData.length;
  const ratingsSum = commentsData.reduce(
    (result, comment) => result + comment.rating,
    0
  );
  // toFixed() converts the result to at string for some reason
  const ratingAvg = ratingsSum / ratingsLength;

  props.getRatingUpdate(ratingAvg, ratingsLength);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/comments/${props.businessId}`
        );
        const data = await res.json();
        setCommentsData(data.comments);
        // console.log(data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
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

  const editComment = (
    commentId: string,
    commentedit: string,
    review: number | undefined
  ) => {
    setCommentsData((prevState) => {
      const comments = prevState.map((comment) => {
        console.log(comment._id);
        if (comment._id === commentId) {
          console.log(comment);
          return {
            ...comment,
            comment: commentedit,
            rating: review,
          };
        } else {
          return comment;
        }
      });
      return comments;
    });
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
        editComment={editComment}
        deleteComment={deleteComment}
      />
      {hasCommented === false && auth.isLoggedIn && (
        <div>
          <CommentForm
            businessId={props.businessId}
            reviewComment=""
            commentId=""
            isEditing={null}
            doneEditing={() => {}}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            editModeHandler={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Comments;
