import { useState, useEffect } from "react";
import { PostData, updateData } from "../api/PostAPI";

function Form({ data, setData, updateDataApi, setUpateDataApi }) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // Get the updated data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function addPostData() {
    const res = await PostData(addData);
    console.log(res.data);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  }

  async function updatePostData() {
    const res = await updateData(updateDataApi.id, addData);
    console.log(res);
    if (res.status === 200) {
      setData((prev) => {
        return prev.map((curEle) => {
          return curEle.id === res.data.id ? res.data : curEle;
        });
      });
      setAddData({ title: "", body: "" });
      setUpateDataApi({});
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}

export default Form;
