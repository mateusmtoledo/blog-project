import { useState } from "react";
import api from "../api";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitLogin(event) {
    event.preventDefault();
    const response = await api.post('/login', {username, password});
    localStorage.setItem('token', response.data);
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
