import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import {
  useLazyVerifyEmailQuery,
  useRegisterMutation,
} from "../redux/api/authApi";
import { useAppSelector } from "../hooks/userHook";
type userType = {
  email: string;
  password: string;
  password_confirmation: string;
  firstName: string;
  lastName: string;
};
export const RegisterPage = () => {
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const { user: userState } = useAppSelector((state) => state.user);
  const [
    verifyEmail,
    {
      data: dataEmail,
      isLoading: isLoadingEmail,
      error: errorEmail,
      isError: isErrorEmail,
      isSuccess: isSuccessEmail,
    },
  ] = useLazyVerifyEmailQuery();
  const navigate = useNavigate();
  const [user, setUser] = useState<userType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    password_confirmation: "",
  });
  let [errorMessages, setErrorMessages] = useState<string[]>([]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(user);

    setUser({
      email: "",
      password: "",
      password_confirmation: "",
      firstName: "",
      lastName: "",
    });
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
        if (error.data.errors.firstName) {
          setErrorMessages((prev) => [...prev, error.data.errors.firstName[0]]);
        }
        if (error.data.errors.lastName) {
          setErrorMessages((prev) => [...prev, error.data.errors.lastName[0]]);
        }
      }
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      if (userState?.verified == false) {
        console.log("Not verified", !userState?.verified);
        verifyEmail("");
        // localStorage.removeItem("us ser");
        // localStorage.removeItem("token");
        // dispatch(logout());

        alert("We send verification link to your email, please verify");
      } else {
        navigate("/");
      }
    }
  }, [isSuccess]);
  return (
    <div className="container w-75 my-4">
      <h1>Register</h1>
      {errorMessages.length > 0 &&
        errorMessages.map((err, index) => (
          <Alert className="danger" key={index} message={err} />
        ))}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">First name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter first name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail2">Last name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter first name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail3">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail3"
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
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword2">Confirm password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Confirm password"
            value={user.password_confirmation}
            onChange={(e) =>
              setUser({ ...user, password_confirmation: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary my-2 mr-2">
          Sign up
        </button>
        <span className="mx-1">
          Don't you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
