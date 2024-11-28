import React from "react";
import { useSelector } from "react-redux";
import styles from "./DisplayNotes.module.css";
import DisplayNoteHeadingType from "./DisplayNoteHeadingType";
import DisplayNoteData from "./DisplayNoteData";

function DisplayNotes() {
  const allNotes = useSelector((state) => state.notes.notesList);
  const getUniqueNotes = (notes) => {
    const uniqueNotes = [];
    const seenIds = new Set();
    for (const note of notes) {
      if (!seenIds.has(note.id)) {
        seenIds.add(note.id);
        uniqueNotes.push(note);
      }
    }
    return uniqueNotes;
  };

  const pinnedNotes = getUniqueNotes(allNotes.filter((note) => note.pinned));
  const otherNotes = getUniqueNotes(allNotes.filter((note) => !note.pinned));


  return (
    <div className="space-y-10 px-4 py-2">
      <div className="space-y-3">
        {pinnedNotes.length > 0 && (
          <DisplayNoteHeadingType>Pinned</DisplayNoteHeadingType>
        )}
        <div className={styles.GridLayout}>
          {pinnedNotes.map((note) => (
            <DisplayNoteData
              key={note.id}
              title={note.title}
              description={note.description}
              pinned={note.pinned}
              id={note.id}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {otherNotes.length > 0 && (
          <DisplayNoteHeadingType>Others</DisplayNoteHeadingType>
        )}
        <div className={styles.GridLayout}>
          {otherNotes.map((note) => (
            <DisplayNoteData
              key={note.id}
              title={note.title}
              description={note.description}
              pinned={note.pinned}
              id={note.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayNotes;
