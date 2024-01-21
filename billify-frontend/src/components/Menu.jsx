import { Link } from "react-router-dom";
import { config } from "../config";

const Menu = (props) => {
  return (
    <div
      style={{
        // backgroundColor: "#f0f0f0", // Replace with your desired color code
        // minHeight: "100vh", // Ensure the body covers the full height of the viewport
        margin: 0, // Reset default body margin
        padding: 0, // Reset default body padding
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand ms-2 ms-md-3">
            {config.brand}
          </Link>
        </div>
      </nav>
      {props.children}
    </div>
  );
};

export default Menu;
