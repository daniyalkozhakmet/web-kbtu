import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import Alert from "../components/Alert";
type userType = {
  email: string;
  password: string;
};
export const LoginPage = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const [user, setUser] = useState<userType>({
    email: "",
    password: "",
  });
  let [errorMessages, setErrorMessages] = useState<string[]>([]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user);
    setUser({ email: "", password: "" });
  };

  let content = null;
  if (isError && error) {
    if (!error.data.errors) {
      content = <Alert className="danger" message={error.data.message} />;
    } else if (error.data.errors.email) {
      content = (
        <Alert className="danger" message={error.data.errors.email[0]} />
      );
      if (error.data.errors.password) {
        content = (
          <Alert className="danger" message={error.data.errors.password[0]} />
        );
      }
    }
  }
  //collecting error messages
  useEffect(() => {
    setErrorMessages([]);
    if (isError && error) {
      if (!error.data.errors) {
        setErrorMessages((prev) => [...prev, error.data.message as string]);
      }
      if (error.data.errors) {
        if (error.data.errors.email) {
          setErrorMessages((prev) => [...prev, error.data.errors.email[0]]);
        }
        if (error.data.errors.password) {
          setErrorMessages((prev) => [...prev, error.data.errors.password[0]]);
        }
      }
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);
  return (
    <div className="container w-75 my-4">
      <h1>Login</h1>
      {errorMessages.length > 0 &&
        errorMessages.map((err, index) => (
          <Alert className="danger" key={index} message={err} />
        ))}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2 mr-2">
          Sign in
        </button>
        <span className="mx-1">
          Already have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};
