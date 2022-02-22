import React, { useState, useEffect } from "react";

import CommentsList from "./CommentsList";

const Comments: React.FC = () => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/comments")
      .then((res) => res.json())
      .then((data) => setCommentsData(data.comments));
  }, []);

  console.log(commentsData);
  return <CommentsList comments={commentsData} />;
};

export default Comments;
