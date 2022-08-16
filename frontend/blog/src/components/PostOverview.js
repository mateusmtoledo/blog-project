import { Link } from "react-router-dom";

function PostOverview({ post }) {
  return (
    <div>
      <Link to={`/${post._id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.text}</p>
    </div>
  );
}

export default PostOverview;
