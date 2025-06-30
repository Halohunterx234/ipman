import React from "react";
import "../styles/addIPBox.css";

function AddIP(props: {
  state: boolean;
  setState: Function;
  onAdd: Function;
  toSubmit: Function;
  currentNewIP: { name: String; ip: String };
  setNewIP: Function;
}) {
  if (props.state) {
    return (
      <div className="addIP">
        <FormIP
          currentNewIP={props.currentNewIP}
          setNewIP={props.setNewIP}
          todo={() => {
            props.toSubmit();
            props.setState(!props.state);
          }}
          toCancel={() => {
            props.setState(!props.state);
            props.setNewIP({
              name: "",
              ip: "",
            });
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
            props.onAdd();
          }}>
          <img className="addIcon" title="addIcon" src="./plus.svg"></img>
        </button>
      </div>
    );
  }
}

// Emptied Form version of a portbox
function FormIP(props: {
  currentNewIP: { name: String; ip: String };
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
