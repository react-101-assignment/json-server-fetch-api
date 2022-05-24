import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [value, setValue] = useState([]);
  const handleTakeQuery = () => {
    fetch("http://localhost:3008/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Name: text,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        setValue([...value, d]);
        setText("");
      });
  };
  const [updatePage, setUpdatePage] = useState(1);
var url=`http://localhost:3008/posts?_page=${updatePage}&_limit=5`
// console.log(url)
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setValue(d);
      });
  }, [url]);

  return (
    <div className="App">
      <input
        value={text}
        placeholder="enter query"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleTakeQuery}>Save</button>
      <div>
        {value.map(({ id, Name }) => (
          <h1 key={id}> {Name}</h1>
        ))}
      </div>
      <button
        onClick={() => {
          if (updatePage > 1) {
            setUpdatePage(updatePage - 1);
          }
        }} disabled={updatePage==1}
      >
        Previous Page
      </button>
      <button onClick={() => {

        if(updatePage<value.length){
          setUpdatePage(updatePage + 1);
          
        }

       
        
        
        }} disabled={!value.length}>Next Page</button>
     
    </div>
  );
}

export default App;
