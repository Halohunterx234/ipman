import { useState, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

//Helper

//Pre-built Components
import Divider from "@mui/material/Divider";

// Components
import { Portbox } from "./components/portbox";
import IPList from "./components/IPList";
import { AddIP, FormIP } from "./components/addIP";

type IPEntry = {
  name: string;
  ip: string;
  date: string;
  state: string;
  id: number;
};

export type { IPEntry };

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  // Tools States
  const [searchValue, setSearchValue] = useState("");

  //IP Data States
  const [ip_arr, setIPArr] = useState<IPEntry[]>([]);

  //New IP State
  const [addingIP, setAddingIP] = useState(false);

  // IP Port Reducer Logic
  const [ports, dispatch] = useReducer(portsReducer, initialPorts);

  function handleAddPort(data: IPEntry) {
    nextId++;
    dispatch({
      type: "added",
      id: nextId,
      data: data,
    });
  }

  function handleChangePort(data: IPEntry) {
    console.log("handling changed port, ", data);
    dispatch({
      type: "changed",
      data: data,
    });
  }
  function handleDeletePort(id: Number) {
    dispatch({
      type: "deleted",
      id: id,
    });
  }

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
        <IPList
          ports={ports}
          onChangePort={handleChangePort}
          onDeletePort={handleDeletePort}
          filterValue={searchValue}></IPList>
      </div>

      <AddIP onAddPort={handleAddPort}></AddIP>
    </main>
  );
}

// Port Reducer
function portsReducer(ports: any, action: any) {
  switch (action.type) {
    case "added": {
      const newIP: IPEntry = {
        ...action.data,
        date: "???",
        state: "LOADING",
        id: action.id,
      };
      return [...ports, newIP];
    }
    case "changed": {
      return ports.map((p: IPEntry) => {
        if (p.id === action.data.id) {
          console.log("here", {
            ...p,
            name: action.data.name,
            ip: action.data.ip,
          });
          return {
            ...p,
            name: action.data.name,
            ip: action.data.ip,
          };
        } else {
          return p;
        }
      });
    }
    case "deleted": {
      return ports.filter((p: IPEntry) => p.id !== action.id);
    }
    default: {
      throw Error("Unknown action" + action.type);
    }
  }
}

let nextId = 1;
const initialPorts = [
  { id: 0, name: "My fourth port", ip: "1234", date: "???", state: "LOADING" },
];

export default App;
