import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector((state) => state.postSlice.posts);

  const post = posts.find((p) => p.id === postId);

  const goBack = () => {
    navigate(-1);
  };

  if (!post) {
    return (
      <div className="post-not-found">
        <h1>Post not found =(</h1>
        <button onClick={goBack} className="go-back">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <button onClick={goBack} className="go-back">
        Go Back
      </button>
      <h1 className="post-title">{post.title}</h1>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="post-image" />
      )}
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default PostDetail;
