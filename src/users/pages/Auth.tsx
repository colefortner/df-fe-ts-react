import React, { useEffect, useState } from "react";

const Auth: React.FC = () => {
  const [loginMode, setLoginMode] = useState(false);
  const [preview, setPreview] = useState<any | null>();
  const [file, setFile] = useState<File>();
  const [formState, setFormState] = useState({
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
    if (event.target.files && event.target.files.length === 1) {
      let pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const changeModeHandler = () => {
    setLoginMode(!loginMode);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [name]: value,
      };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (loginMode) {
      fetch("http://localhost:5050/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      if (file) {
        const formData = new FormData();
        formData.append("id", "1");
        formData.append("username", formState.username);
        formData.append("email", formState.email);
        formData.append("password", formState.password);
        formData.append("image", file);
        console.log(file);
        console.log(formData);

        fetch("http://localhost:5050/users", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    }

    setFormState({
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
              value={formState.username}
              required
            />
          </div>
        )}
        {!loginMode && (
          <div>
            <label htmlFor="image">Upload Avatar</label>
            <input
              id="image"
              type="file"
              multiple={false}
              accept=".jpg,.png,.jpeg"
              name="image"
              onChange={avatarChangeHandler}
              ref={filePickerRef}
              // value={formState.image}
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
            value={formState.email}
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
            value={formState.password}
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
              value={formState.confirmPassword}
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
