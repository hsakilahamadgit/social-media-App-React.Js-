import { createContext, useReducer } from "react";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = (userId, postTitle, postBody, reactin, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reaction: reactin,
        userId: userId,
        tags: tags,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "2",
    title: "Engineering",
    body: "Engineers like to solve problems. If there are no problems handily available, they will create their own problems...  ",
    reaction: 150,
    userId: "user-12",
    tags: ["#engineering", "#Graduating", "#Unbelievable", "#Enjoying"],
  },
  {
    id: "1",
    title: "Going to Hyderabad",
    body: "Hi Friends, i am gong to Hyderabad for vacation.Hope to enjoy a lot. Please out",
    reaction: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass h bhai",
    body: "4 sal k mehnat k bad pass ho gaye hard to believe  ",
    reaction: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable", "Enjoying"],
  },
];
export default PostListProvider;
