import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { useSelector, useDispatch } from "react-redux";

import { getMemos, deleteMemos, addMemos, editMemos } from "./api/api";

function App() {
  let dispatch = useDispatch();
  let router = useRouter();
  let { isLoggedIn } = useSelector((state) => state);
  let [note, setNote] = useState([{ id: null, text: null }]);
  let [edited, setEdited] = useState(false);
  let [editID, setEditID] = useState(null);
  let [name, setName] = useState("");

  function addItem(data, author) {
    if (!edited) {
      addMemos(data, author).then((res) => {
        fetchMemos();
      });
    } else {
      editMemos(data, editID, author).then((res) => {
        fetchMemos();
        setEdited(false);
      });
    }
  }

  function del(id) {
    setEdited(false);
    deleteMemos(id).then((res) => {
      fetchMemos();
    });
  }
  function edit(id) {
    setEdited(true);
    setEditID(id);

    note.forEach((arr) => {
      if (id === arr.id) {
        window.input(arr.text);
      }
    });
  }

  function fetchMemos() {
    getMemos().then(({ data }) => {
      setNote(
        data.map((arr) => {
          return { id: arr._id, text: arr.text };
        })
      );
    });
  }

  function getInput(setInput) {
    window.input = setInput;
  }

  useEffect(() => {
    fetchMemos();

    if (JSON.parse(localStorage.getItem("profile"))) {
      dispatch({ type: "SET_LOGIN", payload: true });
      setName(JSON.parse(localStorage.getItem("profile")).name);
    } else {
      dispatch({ type: "SET_LOGIN", payload: false });
      router.push("/login");
    }
  }, []);

  return (
    isLoggedIn && (
      <div className="memo">
        <h1>Hi, {name}</h1>

        <CreateArea addItem={addItem} note={note} getInput={getInput} />

        {note.map((arr, ind) => {
          return (
            <Note
              key={arr.id}
              id={arr.id}
              title={arr.text}
              del={del}
              edit={edit}
            />
          );
        })}
      </div>
    )
  );
}

export default App;
