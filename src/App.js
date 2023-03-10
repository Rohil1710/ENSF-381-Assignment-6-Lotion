import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";
import Main from "./Central.jsx";
import Sidebar from "./NavBar.jsx";
import Top from "./Top.jsx";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState({id: null, title: "", lastModified: new Date(), body: ""});

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const onDeleteNote = (noteId) => {
	setActiveNote({})
    setNotes(notes.filter(({ id }) => id !== noteId));
  };


  const onUpdateWithoutSave = (obj) => {
	setActiveNote(obj);
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) =>  note.id === updatedNote.id ?  updatedNote : note);

    setNotes(updatedNotesArr);
  };


  function closeSideBar() {
    setIsSidebarOpen(false);
  }

  function openSideBar() {
    setIsSidebarOpen(true);
  }

  return (
    <div className="App">
      <Top 
      openSideBar={openSideBar}
      closeSideBar={closeSideBar}
      isSidebarOpen={isSidebarOpen}
      />
      {/* <div style = {{display: "flex", flexDirection: "row"}}> */}
      <div style={{ display: "flex", flexDirection: "row", width: "100%", height: '100vh' }}>
        {isSidebarOpen && (
          <div
            style={{
              width: "18vw",
              border: "5px solid lightgray",
            }}
          >
        <Sidebar
          className="sidebar"
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        </div>
        )}  
        <Main 
          formWidth={isSidebarOpen ? '70vw': '100vw'}
          activeNote={activeNote} 
          onUpdateNote={onUpdateNote}
          onDeleteNote={onDeleteNote} 
		  onUpdateWithoutSave={onUpdateWithoutSave}
        />
      </div>
    </div>
  );
}

export default App;