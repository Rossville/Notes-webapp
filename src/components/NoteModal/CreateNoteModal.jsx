import React from "react";
import Button from "../Utilities/Button";
import { useState } from "react";
import { MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { useDispatch } from "react-redux";
import { closeNoteModal, AddNotesFirestore } from "../../features/notesSlice";
import DisplayTags from "./DisplayTags";

function CreateNoteModal({className}) {
  const [displayTagList, setDisplayTagList] = useState(false);
  const dispatch = useDispatch();
  const [NoteData, setNoteData] = useState({
    title: "",
    description: "",
    tag: [],
    pinned: false,
  });
  const OndisplayTagList = () => {
    setDisplayTagList(!displayTagList);
  };
  const pinNote = () => {
    setNoteData((prevData) => ({
      ...prevData,
      pinned: !prevData.pinned,
    }));
  };
  function addTitle(title) {
    setNoteData((prevData) => ({
      ...prevData,
      title: title,
    }));
  }
  function addDescription(desc) {
    //const arrDesc = desc.split('\n').filter(des => des) //if the description is truthyy only then it'll be consider an element.
    setNoteData((prevData) => ({
      ...prevData,
      description: desc,
    }));
  }
  function getNotes() {
    dispatch(AddNotesFirestore(NoteData))
    setNoteData({
      title: "",
      description: "",
      tag: [],
      pinned: false,
    });
    dispatch(closeNoteModal())
  }
  // function addTag(noteTag){
  //   console.log(noteTag+" <-- ")
  //   setNoteData(prevData => ({
  //     ...prevData,
  //     tag: [...prevData.tag,noteTag]
  //   }))
  // }
  return (
    <>
      <div onClick={(e)=> e.stopPropagation()} className={`${className} w-11/12 md:w-1/2 bg-white p-2 rounded-xl`}>
        <div className={`NoteHeader flex justify-between`}>
          <div className="border-b-2 w-full border-gray-200">
            <input
              className={`NoteInputStyles w-full px-4 py-2`}
              type="text"
              value={NoteData.title}
              placeholder="Title"
              onChange={(e) => addTitle(e.target.value)}
            />
          </div>
          <div className="">
            {!NoteData.pinned ? (
              <Button onClick={pinNote}>
                <MdOutlinePushPin className="text-gray-400 w-6 h-6" />
              </Button>
            ) : (
              <Button onClick={pinNote}>
                <MdPushPin className="text-gray-800 w-6 h-6" />
              </Button>
            )}
          </div>
        </div>
        <div className={`NoteBody`}>
          <textarea
            className="NoteInputStyles w-full h-52 px-4 py-2"
            type="text"
            value={NoteData.description}
            placeholder="Write Note"
            onChange={(e) => addDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={`NoteFooter`}>
          <div className="bg-blue-400 w-16 text-white rounded-md px-2">
            {NoteData.title.length > 0 || NoteData.description.length > 0 ? (
              <Button onClick={getNotes}>Done</Button>
            ) : (
              <Button onClick={() => dispatch(closeNoteModal())}>Close</Button>
            )}
          </div>
        </div>
        <DisplayTags/>
        {/*List of Tags*/}
        {displayTagList && (
          <div className="TagList bg-pink-400 rounded-xl w-48">
          <ul className="flex flex-col">
            <Button onClick={() => addTag("Meeting")}>
              <li className="">Meeting</li>
            </Button>
            <Button onClick={() => addTag("Todo")}>
              <li className="">Todo</li>
            </Button>
            <Button onClick={() => addTag("Recipe")}>
              <li className="bg-yellow-200">Recipe</li>
            </Button>
            <Button onClick={() => addTag("Idea")}>
              <li className="bg-yellow-800">Idea</li>
            </Button>
          </ul>
        </div>
        )}
      </div>
    </>
  );
}

export default CreateNoteModal;
