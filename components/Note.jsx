import React from "react";
import styles from "../styles/note.module.css";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function Note(props) {
  return (
    <div className={styles.note}>
      <p>{props.title}</p>

      <button
        className={styles.delButton}
        onClick={() => {
          props.del(props.id);
        }}
      >
        <HighlightOffIcon fontSize="small" />
      </button>
      <button
        className={styles.editButton}
        onClick={() => {
          props.edit(props.id);
        }}
      >
        <EditIcon fontSize="small" />
      </button>
    </div>
  );
}

export default Note;
