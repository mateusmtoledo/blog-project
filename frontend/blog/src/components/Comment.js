function Comment ({ comment }) {
  return (
    <div>
      <p><strong>{comment.author.fullName}</strong></p>
      <p>{new Date(comment.date).toLocaleString('en-US')}</p>
      {
        comment.text.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))
      }
    </div>
  );
}
  
export default Comment;
