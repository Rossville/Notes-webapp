import CreateNoteModal from './components/NoteModal/CreateNoteModal';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import CreateNoteButton from './components/Home/CreateNoteButton';
import { closeNoteModal,fetchNotesfirestore } from './features/notesSlice';
import { useEffect } from 'react';
import DisplayNotes from './components/DisplayNotes/DisplayNotes';
import Loader from './components/loader/Loader';

function App() {
  const displayNoteModal = useSelector((state) => state.notes.displayNoteModal);
  const isloading = useSelector(state => state.notes.loading)
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeNoteModal());
  };

  useEffect(() => {
    fetchNotesfirestore(dispatch);
  }, [dispatch]);
  
  return (
    <>
      {isloading?<Loader/>:(
        <div>
          <div>
            <p className='text-center font-bold text-3xl text-red-400'>Notes on wall</p>
          </div>
          <DisplayNotes/>
            {displayNoteModal && (
              <div
                className="displayContainer"
                onClick={closeModal}
              >
                  <CreateNoteModal/>
              </div>
            )}
            <CreateNoteButton />
        </div>
      )}
    </>
  );
}

export default App;
