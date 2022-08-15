import { useEffect, useState } from "react";
import api from '../api';
import PostOverview from "./PostOverview";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await api.get('/posts');
      setPosts(response.data);
    };
    getPosts();
  }, []);

  return (
    <div>
      {
        posts
        ? posts.map((post) => (
          <PostOverview key={post._id} post={post} />
        ))
        : <p>No posts found.</p>
      }
    </div>
  );
}

export default Posts;
