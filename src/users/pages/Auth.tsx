import React, { useState } from "react";

const Auth: React.FC = () => {
  // const usernameInputRef = useRef<HTMLInputElement>(null);
  // const avatarInputRef = useRef<HTMLInputElement>(null);
  // const emailInputRef = useRef<HTMLInputElement>(null);
  // const passwordInputRef = useRef<HTMLInputElement>(null);
  // const confirmPasswordInputRef = React.useRef<HTMLInputElement>(null);

  const [loginMode, setLoginMode] = useState(false);
  // const [pickedFile, setPickedFile] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const avatarChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    // setPickedFile(event.target.files[0] );
    console.log(event.target.files[0]);
    // console.log(pickedFile);
  };

  const changeModeHandler = () => {
    setLoginMode(!loginMode);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let data;

    if (loginMode) {
      data = { email: formData.email, password: formData.password };
    } else {
      data = formData;
    }

    console.log(data);

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <h2>{loginMode ? "Login" : "Signup"}</h2>
      <form onSubmit={submitHandler}>
        {!loginMode && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              name="username"
              onChange={changeHandler}
              value={formData.username}
              required
            />
          </div>
        )}
        {!loginMode && (
          <div>
            <label htmlFor="avatar">Upload Avatar</label>
            <input
              id="avatar"
              type="file"
              multiple={false}
              accept=".jpg,.png,.jpeg"
              name="avatar"
              // placeholder="confirm password"
              onChange={avatarChangeHandler}
              // value={pickedFile.avatar}
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
            name="email"
            onChange={changeHandler}
            value={formData.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
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
              name="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
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
