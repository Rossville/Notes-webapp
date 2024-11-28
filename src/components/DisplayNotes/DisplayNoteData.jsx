import React, { useState } from "react";
import { MdPushPin,MdOutlinePushPin } from "react-icons/md";
import EditNote from "../EditNotes/EditNote";
import { DeleteNotesFirestore } from "../../features/notesSlice";
import { useDispatch } from "react-redux";
import Button from "../Utilities/Button";

function DisplayNoteData(props) {
  const {title,description,pinned,tag,id} = props;
  const dispatch = useDispatch();
  const [pinHover,setPinHover] = useState({
    displayPinOnMouseOver : false,
    divClicked : false
  })

  function ClickNoteToEdit(){
    setPinHover(prevData => ({
      ...prevData,
      divClicked : !prevData.divClicked
    }))
  }

  function deletebtn(){
    dispatch(DeleteNotesFirestore(id));
  }

  return (
    <div className="noteDataStylesContainer">
        <div onClick={ClickNoteToEdit}
        id="noteData"
        className={`space-y-2 p-2 border-2 notesDataStyles border-gray-400 rounded-lg`}
        onMouseEnter={()=>setPinHover({...pinHover,displayPinOnMouseOver: true})}
        onMouseLeave={()=>setPinHover({...pinHover,displayPinOnMouseOver: false})}
      >
        {pinHover.divClicked && <div className="displayContainer">
          <EditNote title={title} description={description} pinned={pinned} tag={tag} id={id}/>
        </div>}
        <div className="flex justify-between">
          <div className="font-semibold text-xl">{title}</div>
          <div>
            {!pinned?(<MdOutlinePushPin
              className={`w-6 h-6 text-gray-400`}
            />):(
              <MdPushPin className={`w-6 h-6 text-gray-600`}/>
            )}
          </div>
        </div>
        {/* <div className="NoteDataBody">
          {description.map((note) => (
            <div>{note + "\n"}</div>
          ))}
        </div> */}
        <div>{description}</div>
        <div className="delBtnstyles">
          <Button className='bg-gray-400 hover:bg-black text-white rounded-full px-1' onClick={(e) => deletebtn(e)}>
            <span className="material-symbols-outlined font-bold text-sm">close</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DisplayNoteData;
