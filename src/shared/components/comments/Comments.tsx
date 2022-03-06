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

  const hasCommented = commentsData.some(
    (comment) => comment.userId === auth.userId
  );

  return (
    <>
      <CommentsList businessId={props.businessId} comments={commentsData} />
      {hasCommented === false && auth.isLoggedIn && (
        <CommentForm
          businessId={props.businessId}
          review=""
          commentId=""
          isEditing={null}
          doneEditing={() => {}}
        />
      )}
    </>
  );
};

export default Comments;
