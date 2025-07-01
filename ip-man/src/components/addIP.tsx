import React, { useState } from "react";
import "../styles/addIPBox.css";
import { IPEntry } from "../App";

function AddIP(props: { onAddPort: Function }) {
  const [addingIP, setAddingIP] = useState(false);

  const [addIP, setAddIP] = useState<IPEntry>({
    name: "",
    ip: "",
    date: "",
    state: "",
    id: 0,
  });
  if (addingIP) {
    return (
      <div className="addIP">
        <FormIP
          currentNewIP={addIP}
          setNewIP={setAddIP}
          todo={() => {
            props.onAddPort(addIP);
            setAddingIP(!addingIP);
          }}
          toCancel={() => {
            setAddingIP(!addingIP);
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="addIP">
        <button
          className="addPort"
          onClick={() => {
            setAddingIP(true);
          }}>
          <img className="addIcon" title="addIcon" src="./plus.svg"></img>
        </button>
      </div>
    );
  }
}

// Emptied Form version of a portbox
function FormIP(props: {
  currentNewIP: IPEntry;
  setNewIP: Function;
  todo: Function;
  toCancel: Function;
}) {
  return (
    <div className="formIP">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.todo();
        }}>
        <input
          title="ipName"
          className="ipName"
          placeholder="Enter Port Name..."
          onChange={(e) => {
            props.setNewIP({
              ...props.currentNewIP,
              name: e.currentTarget.value,
            });
          }}></input>
        <input
          title="ipPort"
          className="ipPort"
          placeholder="Enter IP:Port..."
          onChange={(e) => {
            props.setNewIP({
              ...props.currentNewIP,
              ip: e.currentTarget.value,
            });
          }}></input>
        <div className="buttons">
          <button className="confirmAddIP" type="submit">
            <img
              className="confirmIcon"
              title="confirmIcon"
              src="./confirm.svg"
            />
          </button>
          <button
            className="declineAddIP"
            onClick={() => {
              props.toCancel();
            }}>
            <img
              className="declineIcon"
              title="declineIcon"
              src="./decline.svg"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export { AddIP, FormIP };
