import { useContext } from "react";
import { UserContext } from "./UserContext";

function Header() {
  const {user} = useContext(UserContext);
  return (
    <header>
      <h1>blog app</h1>
      {
        user
        ? <p>Welcome, {user.firstName}</p>
        : null
      }
    </header>
  );
}

export default Header;
