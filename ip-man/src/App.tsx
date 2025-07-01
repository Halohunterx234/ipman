import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Divider from "@mui/material/Divider";

//Helper

// Components
import { Portbox } from "./components/portbox";
import { AddIP, FormIP } from "./components/addIP";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  // Tools States
  const [searchValue, setSearchValue] = useState("");

  //IP Data States
  type IPEntry = {
    name: String;
    ip: String;
  };
  const [ip_arr, setIPArr] = useState<IPEntry[]>([]);

  //New IP State
  const [addingIP, setAddingIP] = useState(false);
  const [newIP, setNewIP] = useState<IPEntry>({
    name: "",
    ip: "",
  });

  //add new ip!
  function addNewIP() {
    setIPArr((previous) => [...previous, newIP]);
    setNewIP({
      name: "",
      ip: "",
    });
    console.log(ip_arr);
  }

  //editing ips
  //reducer handlers
  // function handleEditIP(newIP) {
  //   dispatch({
  //     type: "editIP",
  //     edit: newIP,
  //   })
  // }
  // function handleDeleteIP(id) {
  //   dispatch({
  //     type: "deleteIP",
  //     id: id,
  //   })
  // }

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
            <br></br>
            <text className="port-ip">127.43.54.65::65565</text>
          </div>
          <div className="right">
            <text className="status">Status: OPEN</text>
            <br></br>
            <text className="date">Since 2 hours ago</text>
          </div>
          <div className="statusIconBlock">
            <img src="./open.png" className="statusIcon" alt="Opened" />
          </div>
        </div>
        <Divider className="divider"></Divider>
        <div className="port-box">
          <div className="left">
            <text className="port-name">My Second Port</text>
            <br></br>
            <text className="port-ip">127.43.54.65::65565</text>
          </div>
          <div className="right">
            <text className="status">Status: CLOSED</text>
            <br></br>
            <text className="date">Since 2 hours ago</text>
          </div>
          <div className="statusIconBlock">
            <img src="./closed.png" className="statusIcon" alt="Closed" />
          </div>
        </div>
        <Divider className="divider"></Divider>
        {/* map current array to portboxes */}
        {/* {ip_arr.filter(i => i.name.includes(searchValue)).map((i) => <Portbox name={i.name} ip={i.ip} status={"LOADING"} date={"???"} />)} */}
        {ip_arr.filter(ip_entry => ip_entry.name.includes(searchValue)).map((ip_entry, idx) => {
          return (
            <div className="Portbox">
              <Portbox
                name={ip_entry.name}
                ip={ip_entry.ip}
                status={"LOADING"}
                date={"???"}></Portbox>
                <Divider className="divider"></Divider>
            </div>
          )
        }
        )}
      </div>



      <AddIP
        state={addingIP}
        setState={setAddingIP}
        onAdd={() => {
          setAddingIP(!addingIP);
        }}
        toSubmit={addNewIP}
        currentNewIP={newIP}
        setNewIP={setNewIP}></AddIP>

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
