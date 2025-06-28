import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Divider from '@mui/material/Divider';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <div className="toolsBar">
        <label>
          <input
            name="searchBar"
            type="string"
            placeholder="Search..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <img src="/search.png" className="search_icon" alt="Search Icon" />
        </label>
      </div>

      <Divider className="divider"></Divider>

      <div className="ports">
        <div className="port-box">
          <div className="left">
            <text className="port-name">My First Port</text>
            <text className="port-ip">127.43.54.65::65565</text>
          </div>
          <div className="right">
            <text className="status">Status: OPEN</text>
            <text className="date">Since 2 5 hours ago</text>

          </div>
        </div>
      </div>

      <Divider className="divider"></Divider>

      <div className="newPort">
        <button className="addPort">
          <img className="addIcon" title="addIcon" src="./plus.svg"></img>
        </button>
      </div>
      {/* <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}>
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p> */}
    </main>
  );
}

export default App;
