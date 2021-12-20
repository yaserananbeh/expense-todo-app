import React from "react";
import { Link } from "react-router-dom";
import '../style/Nav.css'

function Nav() {
  return (
    <div className="nav-container">
      <ul>
        <li>
          <Link to="/">To-Do App</Link>
        </li>
        <li>
          <Link to="/expense">Expense App</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
