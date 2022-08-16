import { Link } from "react-router-dom";

function PostOverview({ post }) {
  return (
    <div>
      <Link to={`/${post._id}`}>
        <h3>{post.title}</h3>
      </Link>
      {
        post.text.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))
      }
    </div>
  );
}

export default PostOverview;
