import React from "react";
import "./App.css";
import { StateProvider } from "./ContextAPI/StateProvider";
import reducer, { initialState } from "./ContextAPI/reducer";

import Editor from "./Editor";

const App = () => {
  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={reducer}>
        <Editor />
      </StateProvider>
    </div>
  );
};

export default App;
