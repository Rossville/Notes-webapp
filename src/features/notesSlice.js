import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, onSnapshot, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../components/Config/firebase";

const NotesCollection = collection(db, "Notes");

export const setNotes = createAction("notes/setNotes");

export function fetchNotesfirestore(dispatch) {
  try {
    onSnapshot(NotesCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(setNotes(data));
    });
  } catch (err) {
    console.error("Error fetching notes:", err.message);
  }
}

export const AddNotesFirestore = createAsyncThunk(
  "notes/AddNoteToFirestore",
  async (note, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(NotesCollection, note);
      return { id: docRef.id, ...note };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const UpdateNotesFirestore = createAsyncThunk(
  "notes/UpdateNotesFirestore",
  async ({ id, note }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "Notes", id);
      const updatePayload = Object.fromEntries(
        Object.entries({
          title: note?.title,
          description: note?.description,
          pinned: note?.pinned,
          tag: note?.tag,
        }).filter(([_, value]) => value !== undefined)
      );
      await updateDoc(docRef,updatePayload);
      return { id, note };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const DeleteNotesFirestore = createAsyncThunk(
  "notes/DeleteNotesFirestore",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "Notes", id);
      await deleteDoc(docRef);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  notesList: [],
  displayNoteModal: false,
  loading: false,
  error: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openNoteModal: (state) => {
      state.displayNoteModal = !state.displayNoteModal;
    },
    closeNoteModal: (state) => {
      state.displayNoteModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNotes, (state, action) => {
        state.notesList = action.payload;
      })
      .addCase(AddNotesFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddNotesFirestore.fulfilled, (state, action) => {
        state.notesList.push(action.payload);
        state.loading = false;
      })
      .addCase(AddNotesFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UpdateNotesFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateNotesFirestore.fulfilled, (state, action) => {
        const { id, note } = action.payload;
        const index = state.notesList.findIndex((note) => note.id === id);
        if (index !== -1) state.notesList[index] = { ...state.notesList[index], ...note };
        state.loading = false;
      })
      .addCase(UpdateNotesFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteNotesFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteNotesFirestore.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.notesList = state.notesList.filter((note) => note.id !== id);
        state.loading = false;
      })
      .addCase(DeleteNotesFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openNoteModal, closeNoteModal } = notesSlice.actions;

export default notesSlice.reducer;