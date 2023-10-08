import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/userHook";
import { useLogoutMutation } from "../redux/api/authApi";
import { BsCart2 } from "react-icons/bs";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch=useAppDispatch()
  const {
    cart: { totalQty },
  } = useAppSelector((state) => state.product);
  const [logout, { isLoading, isError, error, isSuccess }] =
    useLogoutMutation();
  const logoutHandler = () => {
    logout("");
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [isLoading]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Alo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="w-25"></div>
          <form className="form-inline my-2 my-lg-0 d-flex w-75">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user ? user.firstName : "Login"}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {user ? (
                  <>
                    <button className="dropdown-item" onClick={logoutHandler}>
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </li>
            <li>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "black",
                  borderRadius: "50%",
                }}
              >
                <a
                  style={{
                    left: "23%",
                    position: "relative",

                    top: "12%",
                    transform: "translate(-50%)",
                  }}
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  <BsCart2 color="white" size={21} />
                </a>
                <span
                  style={{
                    bottom: "5%",
                    right: "-90%",
                    position: "relative",
                    background: "red",
                    color: "white",
                    display: "block",
                    borderRadius: "50%",
                    height: "20px",
                    width: "20px",
                    textAlign: "center",
                    transform: "translate(-50%)",
                  }}
                >
                  {totalQty}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
