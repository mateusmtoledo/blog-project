import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
