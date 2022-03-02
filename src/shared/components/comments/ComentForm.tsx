import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

interface CommentFormProps {
  businessId: string | undefined;
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [comment, setComment] = useState<string>();
  const auth = useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:5050/comments/${props.businessId}`, {
      method: "POST",
      body: JSON.stringify({
        userId: auth.userId,
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
