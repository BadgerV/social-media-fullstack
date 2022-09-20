import Post from "../post/Post";
import Share from "../shared/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => {
          return <Post id={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
