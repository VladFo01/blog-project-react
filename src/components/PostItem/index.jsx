import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <li className="main-list-item">
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <Link to={`/posts/${post.id}`} className="main-link">
        Read more
      </Link>
    </li>
  );
};

export default PostItem;
