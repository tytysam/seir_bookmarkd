import { useRef } from "react";

export default (props) => {
  const titleInput = useRef(null);
  const urlInput = useRef(null);

  // ==========================
  //     DATABASE | CREATE
  // ==========================

  const createNewBookmark = async (event) => {
    event.preventDefault();

    const title = titleInput.current.value;
    const url = `http://www.${urlInput.current.value}`;

    const body = JSON.stringify({
      title,
      url,
    });
    event.currentTarget.reset();
    try {
      const response = await fetch("http://localhost:3000/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      props.setBookmarks([...props.bookmarks, data]);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //          RETURN
  // ==========================

  return (
    <form onSubmit={createNewBookmark}>
      <input type="text" ref={titleInput} placeholder="ie, Reddit" />
      <input type="text" ref={urlInput} placeholder="ie, reddit.com" />
      <input type="submit" value="Add Bookmark" />
    </form>
  );
};
