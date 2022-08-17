import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Posts from './components/Posts';
import Login from './components/Login';
import Post from './components/Post';
import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Posts />} />
          <Route path=':postId' element={<Post />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
