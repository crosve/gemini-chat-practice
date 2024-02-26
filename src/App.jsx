import { useState } from "react";

function App() {
  const [error, setError] = useState(false);
  const [value, setvalue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const supirseOperstaions = [
    "when is Christmas",
    "what is the capital of Nigeria",
    "what is the capital of Nigeria",
    "how do you make a cake",
  ];

  const surpise = () => {
    const randomValue =
      supirseOperstaions[Math.floor(Math.random() * supirseOperstaions.length)];
    setvalue(randomValue);
  };

  const getResponse = async () => {
    if (!value || value === "") return setError("Please enter a value");
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value, history: chatHistory }),
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setChatHistory([
        ...chatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);

      setvalue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="suprise" onClick={surpise} disabled={!chatHistory}>
          Suprise me
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="when is christmas"
          onChange={(e) => setvalue(e.target.value)}
        />

        {!error ? <button onClick={getResponse}>Ask me</button> : <p></p>}
        {/* <button>Clear</button> */}
      </div>
      {error && <p>{error}</p>}
      <div className="search-results">
        {chatHistory.map((chat, index) => {
          return (
            <div key={index}>
              <p className="answer">
                {chat.role} : {chat.parts}
              </p>
            </div>
          );
        })}
        <div key={"key"}>
          <p className="answer"></p>
        </div>
      </div>
    </div>
  );
}

export default App;
