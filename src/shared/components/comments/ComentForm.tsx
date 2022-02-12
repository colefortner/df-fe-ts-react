import React, { useState } from "react";

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <>
      <form>
        <div>{comment}</div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            placeholder="comment"
            name="comment"
            onChange={changeHandler}
            value={comment}
          />
        </div>
      </form>
    </>
  );
};

export default CommentForm;
