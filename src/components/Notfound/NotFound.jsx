import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as NotFoundImage } from "../../assets/images/not-found.svg";

function NotFound() {
  return (
    <div className="not__found__container">
      <NotFoundImage />
      <p>Oops. The page you were looking for doesn’t exist</p>
      <Link to={"/"}>Take me back to the home page</Link>
    </div>
  );
}
export default NotFound;
