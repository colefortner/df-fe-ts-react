import React, { useState, useEffect } from "react";

import CommentsList from "./CommentsList";

interface CommentsProps {
  businessId: string | undefined;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/comments/${props.businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentsData(data.comments);
        console.log(data);
      });
  }, []);

  return <CommentsList businessId={props.businessId} comments={commentsData} />;
};

export default Comments;
