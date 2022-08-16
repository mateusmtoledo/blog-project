import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

function Post() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const { postId } = params;

  useEffect(() => {
    async function getPost() {
      try {
        const response = await api.get(`/posts/${postId}`);
        setPost(response.data);
      } catch(err) {
        console.log(err.message);
      }
    }

    getPost();
  }, [postId]);

  return (
    <div>
      {
        post
        ? <>
            <h3>{post.title}</h3>
            {
              post.text.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            }
            <p>Posted by <strong>{post.author.firstName}</strong></p>
            <p>{new Date(post.date).toLocaleString('en-US')}</p>
          </>
        : <p>Post not found</p>
      }
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Post;
