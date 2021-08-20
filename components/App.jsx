import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Register from "./Register";
import Login from "./Login";
import { getMemos, deleteMemos, addMemos, editMemos } from "../api";

function App() {
  let [note, setNote] = useState([{ id: null, text: null }]);
  let [edited, setEdited] = useState(false);
  let [editID, setEditID] = useState(null);

  function addItem(data, ipHead) {
    window.inputEL = ipHead;
    if (!edited) {
      addMemos(data).then((res) => {
        fetchMemos();
      });
    } else {
      editMemos(data, editID).then((res) => {
        fetchMemos();
        setEdited(false);
      });
    }

    ipHead.value = "";
  }

  function del(id) {
    window.location.hash = id;
    deleteMemos(id).then((res) => {
      fetchMemos();
      // console.log(res);
    });
  }
  function edit(id) {
    window.location.hash = id;
    setEdited(true);
    setEditID(id);

    note.forEach((arr) => {
      if (id === arr.id) {
        window.inputEL.value = arr.text;
      }
    });
  }

  function fetchMemos() {
    getMemos().then((res) => {
      setNote(
        res.map((arr) => {
          return { id: arr._id, text: arr.text };
        })
      );
    });
  }

  function getInput(ipHead) {
    window.inputEL = ipHead;
  }

  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <div className="memo">
      <Header />
      {/* <CreateArea addItem={addItem} getInput={getInput} note={note} />

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
      })} */}
      <Register />
      {/* <Login /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
