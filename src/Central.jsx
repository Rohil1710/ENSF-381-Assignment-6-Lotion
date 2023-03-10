import React, {  useState } from "react";
import { formatDate, formatTime } from "./extra";

const Main = ({ activeNote, onUpdateNote, onDeleteNote, onUpdateWithoutSave }) => {

  const onEditField = (field, value) => {
	onUpdateWithoutSave({
		...activeNote,
		  [field]: value,
		  lastModified: Date.now(),
	})
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const showCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

console.log("rendering main")

  if (!activeNote.id || activeNote.id === null) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="app-save-delete">
          <input
            type="text"
            id="title"
            style={{background: "#FFFDD0"}}
            placeholder="Note Title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
          />
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#08c", fontSize: "1rem", fontWeight: "600"}}>
          <button style={{margin: "1rem"}} onClick={() => onUpdateNote(activeNote)}>Save</button>
          <button style={{margin: "1rem"}} onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <p style={{margin: "1rem"}} onClick={showCalendar}>{formatDate(new Date())}</p>
          <p style={{margin: "1rem"}} onClick={showCalendar}>{formatTime(new Date())}</p>
          {isCalendarOpen && <input style={{fontSize: "1rem", paddingRight:"70%"}} type="datetime-local" />}
        </div>

        <textarea
          id="body"
          style={{background: "#FFFDD0"}}
          placeholder="Start note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Main;