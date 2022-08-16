import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./components/UserContext";
import api from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      if(localStorage.getItem('token')) {
        try {
          const response = await api.get('/userdata');
          const { data } = response;
          setUser(data.user);
        } catch(err) {
          localStorage.setItem('token', '');
          console.log(err);
        }
      }
    }
    getUser();
  }, []);

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
