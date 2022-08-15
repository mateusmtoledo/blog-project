function PostOverview({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
    </div>
  );
}

export default PostOverview;
