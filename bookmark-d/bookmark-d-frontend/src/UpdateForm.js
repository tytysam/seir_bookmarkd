import { useRef } from "react";

export default (props) => {
  const updateTitleInput = useRef(null);
  const updateURLInput = useRef(null);

  // ==========================
  //     DATABASE | UPDATE
  // ==========================
  const updateBookmark = async (event) => {
    event.preventDefault();

    const title = updateTitleInput.current.value;
    const url = updateURLInput.current.value;

    const body = JSON.stringify({
      title,
      url,
    });
    event.currentTarget.reset();
    try {
      const response = await fetch(
        `http://localhost:3000/bookmarks/${props.bookmark._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      const data = await response.json();
      const filteredBookmarks = props.bookmarks.filter(
        (bookmark) => bookmark._id !== data._id
      );

      props.setBookmarks([...filteredBookmarks, data]);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //          RETURN
  // ==========================
  return (
    <form onSubmit={updateBookmark}>
      <input type="text" ref={updateTitleInput} placeholder="bookmark title" />
      <input type="text" ref={updateURLInput} placeholder="bookmark url" />
      <input type="submit" value="Update Bookmark" />
    </form>
  );
};
