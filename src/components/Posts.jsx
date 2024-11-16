import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/PostAPI";
import Form from "./Form";
import "../App.css";

function Posts() {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpateDataApi] = useState({});
  async function getPostData() {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  }
  useEffect(() => {
    getPostData();
  }, []);

  // Delete Post
  async function handleDeletePost(id) {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post: ", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdatePost(curEle) {
    console.log(curEle);
    setUpateDataApi(curEle);
  }
  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpateDataApi={setUpateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curEle) => {
            const { id, body, title } = curEle;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(curEle)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

export default Posts;
