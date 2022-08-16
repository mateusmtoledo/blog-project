import { Link } from "react-router-dom";

function PostOverview({ post }) {
  return (
    <div>
      <Link to={`/${post._id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>Posted by <strong>{post.author.fullName}</strong></p>
      <p>{new Date(post.date).toLocaleString('en-US')}</p>
      {
        post.text.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))
      }
    </div>
  );
}

export default PostOverview;
