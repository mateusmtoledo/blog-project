import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Header() {
  const {user, logout} = useContext(UserContext);

  return (
    <header>
      <Link to="/"><h1>blog app</h1></Link>
      {
        user
        ? <div>
            <p>Welcome, {user.firstName}</p>
            <button type="button" onClick={logout}>Log out</button>
          </div>
        : <div>
            <Link to="/sign-up">Sign up</Link>
            <Link to="/login">Log in</Link>
          </div>
      }
    </header>
  );
}

export default Header;
