import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { MdPushPin,MdOutlinePushPin } from 'react-icons/md';
import Button from '../Utilities/Button';
import { UpdateNotesFirestore, closeNoteModal } from '../../features/notesSlice';


function EditNote(props) {
    const {title,description,pinned,id} = props;
    const [displayTagList, setDisplayTagList] = useState(false);
    const dispatch = useDispatch();
    const [NoteData, setNoteData] = useState({
        title,
        description,
        tag: [],
        pinned,
    });
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
        setNoteData((prevData) => ({
        ...prevData,
        description: desc,
        }));
    }
    function editNotes() {
        dispatch(UpdateNotesFirestore({id,note:NoteData}))
        dispatch(closeNoteModal())
    }
    // function addTag(noteTag){
    //   setNoteData(prevData => ({
    //   ...prevData,
    //   tag: [...prevData.tag,noteTag]
    //   }))
    //   console.log(NoteData.tag)
    // }
  return (
    <>
      <div onClick={(e)=>e.stopPropagation()} className={`w-11/12 md:w-1/2 bg-white p-2 rounded-xl`}>
        {/*EditNote Header*/}
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
        {/*EditNote Body*/}
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
              <Button onClick={editNotes}>Done</Button>
            ) : (
              <Button onClick={() => dispatch(closeNoteModal())}>Close</Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditNote