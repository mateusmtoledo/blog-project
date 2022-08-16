import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./components/UserContext";
import api from "./api";

function App() {
  const [user, setUser] = useState(null);

  async function login() {
    if(localStorage.getItem('token')) {
      try {
        const response = await api.get('/userdata');
        const { data } = response;
        setUser(data.user);
      } catch(err) {
        localStorage.removeItem('token');
        console.log(err);
      }
    }
  }

  function logout() {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setUser(null);
    }
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <UserContext.Provider value={{user, login, logout}}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
