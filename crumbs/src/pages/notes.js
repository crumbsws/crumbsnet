import DefaultBar from "../components/navigation/defaultbar.js";
import EditorWrapper from "../components/editorWrapper.js"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSideBarVisible } from "../redux/reducers/interface.js";
import { store } from "../redux/store.js";

function Notes() {

  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
useEffect(() => { //continue from here + do some magic in direct messages + post only pins
  localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);

useEffect(() => {
  store.dispatch(setSideBarVisible());

return () => {
  store.dispatch(setSideBarVisible()); 
}}
, []);


    return (
      <>
      <DefaultBar></DefaultBar>
        <EditorWrapper>
        <div className="editor-container">
        <h1 className="editor"  contentEditable="true"  aria-multiline="true" aria-label="Enter your text here" placeholder="New Note"></h1>
        <div className="editor" contentEditable="true"  aria-multiline="true" aria-label="Enter your text here" placeholder="Graph a decay algorithm, study polynomials.">
        </div>
        </div>
        </EditorWrapper>
        </>
  );
};

export default Notes;
