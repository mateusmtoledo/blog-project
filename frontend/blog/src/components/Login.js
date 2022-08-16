import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  async function submitLogin(event) {
    event.preventDefault();
    const response = await api.post('/login', {username, password});
    const { data } = response;
    localStorage.setItem('token', data.token);
    setUser(data.user);
    navigate('/');
  }

  return (
    <form onSubmit={submitLogin}>
      <h2>Log In</h2>
      <p>
        <label htmlFor="username">Username:</label>
        <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            id="username"
        />
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
        />
      </p>
      <button>Submit</button>
    </form>
  );
}

export default Login;
