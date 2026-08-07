import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "black", padding: "15px" }}>
      <Link
        to="/"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Student Task Manager
      </Link>

      <Link
        to="/login"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Login
      </Link>

      <Link
        to="/register"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        Register
      </Link>
    </nav>
  );
}

export default Navbar;