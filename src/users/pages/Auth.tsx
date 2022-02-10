import React, { useEffect, useState } from "react";

const Auth: React.FC = () => {
  const [loginMode, setLoginMode] = useState(false);
  const [preview, setPreview] = useState<any | null>();
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const filePickerRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const avatarChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    let pickedFile = event.target.files[0];
    setFile(pickedFile);
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
      data = { ...formData, avatar: file };
    }

    console.log(data);

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setPreview(null);
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
              onChange={avatarChangeHandler}
              ref={filePickerRef}
              required
            />
            <div>{preview && <img src={preview} alt="avatar preview" />}</div>
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
