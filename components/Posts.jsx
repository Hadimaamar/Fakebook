import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";
import firebase from "firebase/app";

const Posts = ({ posts }) => {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );
  if (posts) console.log("posts", posts[0].name);

  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp?.toDate().toLocaleString()}
              image={post.data().image}
              postImage={post.data().postImage?.toString()}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp?.toDate().toLocaleString()}
              image={post.image}
              postImage={post.postImage?.toString()}
            />
          ))}
    </div>
  );
};

export default Posts;
