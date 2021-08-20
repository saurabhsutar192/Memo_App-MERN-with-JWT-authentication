import React, { useEffect, useState } from "react";
import styles from "../styles/create.module.css";

function CreateArea(prop) {
  let [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let author = JSON.parse(localStorage.getItem("profile"))?.id;
    if (!prop.note.some((arr) => arr.text === input)) {
      if (input) {
        prop.addItem(input, author);
      } else {
        window.alert("Enter Text");
      }
    } else {
      window.alert("Duplicate Entries Found!");
    }
    setInput("");
  }

  useEffect(() => {
    prop.getInput(setInput);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.createArea}>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="ip"
          name="text"
          type="text"
          id="text"
          placeholder="add Memo"
          autoComplete="off"
        />

        <button className="addButton" type="submit">
          +
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
