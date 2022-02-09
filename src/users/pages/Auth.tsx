import React, { useState, useRef } from "react";

const Auth: React.FC = () => {
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = React.useRef<HTMLInputElement>(null);

  const [loginMode, setLoginMode] = useState(false);

  const changeModeHandler = () => {
    setLoginMode(!loginMode);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    let data;
    if (loginMode) {
      data = { email, password };
    } else {
      const username = usernameInputRef.current!.value;
      const confirmPassword = confirmPasswordInputRef.current!.value;

      data = { username, email, password, confirmPassword };
    }
    console.log(data);
  };

  return (
    <>
      <h2>{loginMode ? "Login" : "Signup"}</h2>
      {/* <form onSubmit={formSubmitHandler}> */}
      <form onSubmit={submitHandler}>
        {!loginMode && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              ref={usernameInputRef}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            ref={emailInputRef}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={passwordInputRef}
            required
          />
        </div>
        {!loginMode && (
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="confirm password"
              ref={confirmPasswordInputRef}
              required
            />
          </div>
        )}
        <button type="submit">{loginMode ? "Login" : "Signup"}</button>
      </form>
      <button onClick={changeModeHandler}>
        Switch to {!loginMode ? "Login" : "Signup"}
      </button>
    </>
  );
};

export default Auth;
