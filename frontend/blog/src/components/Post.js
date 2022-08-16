import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
            <p>{post.text}</p>
            <p>Posted by <strong>{post.author.firstName}</strong></p>
            <p>{new Date(post.date).toLocaleString('en-US')}</p>
          </>
        : <p>Post not found</p>
      }
    </div>
  );
}

export default Post;
