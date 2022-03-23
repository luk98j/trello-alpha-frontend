import './App.css';
import React, { useState, useEffect } from "react";
import API from './API.js';

function App() {
  const [hello, setHello] = useState(null);
  useEffect(() => {
    API.getHello().then(
      (response)=>{
          console.log(response);
          setHello(response.data);
      }
  ).catch(
      (error)=>{
      }

  )
  },[hello])
  return (
    <div className="App">
      {hello}
    </div>
  );
}

export default App;
