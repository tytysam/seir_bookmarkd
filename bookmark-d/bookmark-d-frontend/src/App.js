// ==========================
//       DEPENDENCIES
// ==========================
import { useState, useEffect, useRef } from "react";
import "./App.css";
import CreateForm from "./CreateForm.js";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [token, setToken] = useState("");
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const registerNewUsernameInput = useRef(null);
  const registerNewPasswordInput = useRef(null);

  // ==========================
  //     DATABASE | READ
  // ==========================
  const fetchBookmarks = async () => {
    try {
      const response = await fetch("http://localhost:3000/bookmarks");
      const data = await response.json();
      setBookmarks(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //     DATABASE | DELETE
  // ==========================
  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      const filteredBookmarks = bookmarks.filter(
        (bookmark) => bookmark._id !== data._id
      );
      setBookmarks(filteredBookmarks);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //      USER | REGISTER
  // ==========================
  const registerNewUser = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      username: registerNewUsernameInput.current.value,
      password: registerNewPasswordInput.current.value,
    });
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //        USER | LOGIN
  // ==========================
  const loginUser = async (event) => {
    event.preventDefault();
    const body = JSON.stringify({
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    });
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const data = await response.json();
      window.localStorage.setItem("token", `Bearer ${data.token}`);
      setToken(`Bearer ${data.token}`);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  //        USE-EFFECT
  // ==========================
  useEffect(() => {
    fetchBookmarks();
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  // ==========================
  //          RETURN
  // ==========================

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bookmarks</h1>
        <CreateForm setBookmarks={setBookmarks} bookmarks={bookmarks} />
        <br />
        <ul>
          {bookmarks.map((bookmark) => {
            return (
              <li key={bookmark._id} className="indiv-bookmark">
                <a href={bookmark.url} target="_blank">
                  {bookmark.title}
                </a>
                <br />
                <button
                  onClick={(event) => {
                    deleteBookmark(bookmark._id);
                  }}
                >
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
