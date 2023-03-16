import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as NotFoundImage } from "../../assets/images/not-found.svg";

function NotFound() {
  return (
    <div className="not__found__container">
      <p>Oops!! We can't find that page.</p>
      <NotFoundImage />
      <Link to={"/"}> -go back to the home page-</Link>
    </div>
  );
}
export default NotFound;
