import React, { useState } from "react";

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5050/comments", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>{comment}</div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            placeholder="comment"
            name="comment"
            onChange={changeHandler}
            // value={comment}
          />
        </div>
        <button type="submit">Submit Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
