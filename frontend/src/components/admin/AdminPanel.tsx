import React from "react";
import { Link } from "react-router-dom";

export const AdminPanel = () => {
  return (
    <>
      <ul className="nav nav-tabs container" id="myTab" role="tablist">
        <li className="nav-item">
          <Link
            className="nav-link active"
            id="home-tab"
            data-toggle="tab"
            to="/admin/users"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            id="profile-tab"
            data-toggle="tab"
            to="/admin/products"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            id="contact-tab"
            data-toggle="tab"
            to="/admin/orders"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </>
  );
};
