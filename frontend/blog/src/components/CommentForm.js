import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";

function CommentForm({ postId }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  async function submitComment(event) {
    event.preventDefault();
    try {
      await api.post(`/posts/${postId}/comments`, {
        text,
      });
      window.location.reload(); 
    } catch(err) {
      setError(err.response.data.msg || err.message);
    }
  }

  return (
    <div>
      <h5>Comment on this post</h5>
      {
        user
        ? <>
            <form onSubmit={submitComment}>
              <p>
                <label htmlFor="text">Text:</label>
                <textarea
                  id="text"
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}>
                </textarea>
              </p>
              <button>Submit</button>
            </form>
            {
              error
              ? <p>{error}</p>
              : null
            }
          </>
        : <p>You must <Link to="/login">Login</Link> to comment</p>
      }
    </div>
  );
}

export default CommentForm;
