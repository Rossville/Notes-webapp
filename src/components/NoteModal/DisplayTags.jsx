import React from 'react';
import { useSelector } from 'react-redux';

function DisplayTags() {
  const tags = useSelector((state) => state.notes.notesList);
  return (
    <div className="space-x-3">
      {tags.map((note) =>
        note.tag.length > 0 &&
        note.tag.map((tag) => (
          <span className="rounded-md px-2 bg-red-200" key={tag}>{tag}</span>
        ))
      )}
    </div>
  );
}

export default DisplayTags;
