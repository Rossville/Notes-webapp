import React from "react";
import Button from "../Utilities/Button";
import styles from "./CreateNoteButton.module.css";
import { useDispatch } from "react-redux";
import { openNoteModal } from "../../features/notesSlice"; 

function CreateNoteButton() {
    const dispatch = useDispatch();
  return (
    <>
      <div className={`${styles.createNote}`}>
        <Button
          className="bg-red-200 rounded-md px-4 py-2 flex space-x-2"
          onClick={() => dispatch(openNoteModal())}
        >
          <span className="material-symbols-outlined">add</span>
          <span>Create</span>
        </Button>
      </div>
      <div className={`${styles.createNote} `}>
        <Button
          className="bg-red-200 hover:bg-red-300 rounded-md px-4 py-2 space-x-2 flex"
          onClick={() => dispatch(openNoteModal())}
        >
          <span className="material-symbols-outlined">add</span>
          <span>Create</span>
        </Button>
      </div>
    </>
  );
}

export default CreateNoteButton;
