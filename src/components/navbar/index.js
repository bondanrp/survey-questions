import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <Container sx={{ height: "100%" }}>
        <div className="navbar__links">
          <NavLink
            className={({ isActive }) => (isActive ? "-active" : "")}
            to="/create"
          >
            CREATE
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "-active" : "")}
            to="/list"
          >
            LIST
          </NavLink>
        </div>
      </Container>
    </div>
  );
}
