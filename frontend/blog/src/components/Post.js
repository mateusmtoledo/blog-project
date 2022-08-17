import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

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
            <p>Posted by <strong>{post.author.fullName}</strong></p>
            <p>{new Date(post.date).toLocaleString('en-US')}</p>
            {
              post.text.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            }

            <div>
              {
                post.comments.length
                ? <>
                  <h4>Comments</h4>
                  {
                    post.comments.map((comment) =>
                      <Comment key={comment._id} comment={comment} />
                    )
                  }
                  </>
                : <p>No comments in this post.</p>
              }
            </div>
            
            <CommentForm postId={postId} />
          </>
        : <p>Post not found</p>
      }
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Post;
