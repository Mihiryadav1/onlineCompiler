import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const handleSubmit = async () => {
    console.log(code)
    const payload = {
      language: "cpp",
      code,
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data, "output")
      setOutput(data.output);

    }
    catch (err) { console.log(err) }
  }
  return (
    <>
      <div className="App">
        <h1>Online Code Compiler</h1>
        <textarea name="code" cols="75" rows="35" id="" value={code} onChange={(e) => {
          setCode(e.target.value);
        }}></textarea><br />
        <button onClick={handleSubmit}>Submit</button>
        {
          output ? (<p>{output}</p>) : (<p>Compiling...</p>)
        }
      </div>
    </>
  )
}

export default App