import React from "react";
import "./Editor.css";
import { EditorCanvas } from "./Components/Canvas";
import { EditorPicker } from "./Components/Picker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const Editor = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <EditorCanvas />
        <EditorPicker />
      </div>
    </DndProvider>
  );
};

export default Editor;
