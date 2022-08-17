import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";


function SignUp () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function submitSignUp(event) {
    event.preventDefault();
    if(password !== confirmPassword) {
      setError('Password fields do not match');
      return;
    }
    try {
      await api.post('/sign-up', {
        firstName,
        lastName,
        username,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response ? err.response.data.msg : err.message);
    }
  }

  return (
    <>
      <form onSubmit={submitSignUp}>
        <h2>Sign up</h2>
        <p>
          <label htmlFor="firstName">First name:</label>
          <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              id="firstName"
          />
        </p>
        <p>
          <label htmlFor="lastName">Last name:</label>
          <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              id="lastName"
          />
        </p>
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
        <p>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              id="confirmPassword"
          />
        </p>
        <button>Submit</button>
      </form>
      {
        error
        ? <p>{error}</p>
        : null
      }
    </>
  );
}

export default SignUp;
