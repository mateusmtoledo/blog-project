function PostOverview({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
    </div>
  );
}

export default PostOverview;
