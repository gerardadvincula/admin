import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  console.log("errorPage");
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        textAlign: "center",
        fontSize: "200px",
        margin: "0",
      }}
    >
      Page Not Found
      <br />
      <Link to="/" style={{ fontSize: "50px" }}>
        Back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
