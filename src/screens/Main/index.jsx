import PostItem from "../../components/PostItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postSlice } from "../../store/slice";
import { api } from "../../store/api";

import "./style.css";

const Main = () => {
  const dispatch = useDispatch();
  const { data: posts, error, isLoading } = api.useGetPostsQuery();

  useEffect(() => {
    if (posts) {
      dispatch(postSlice.actions.setPosts(posts));
    }
  }, [posts, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="main-container">
      <h2 className="main-header">Blog Posts</h2>
      <ul className="main-list">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
