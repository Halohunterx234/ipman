import React, { useState } from "react";
import { IPEntry } from "../App";

import "../styles/portbox.css";

function Portbox(props: {
  ip: IPEntry;
  onChange: Function;
  onDelete: Function;
}) {
  const [isEditing, setIsEditing] = useState(false);
  let portContent;

  console.log(props)
  if (isEditing) {
    portContent = (
      <div className="port-box-edited">
        <div className="left">
          <input
            title="port-name-edited"
            className="port-name"
            placeholder={props.ip.name}
            onChange={(e) => {
              props.onChange({
                ...props.ip,
                name: e.target.value,
              });
            }}></input>
          <br></br>
          <input
            title="port-ip-edited"
            className="port-ip"
            placeholder={props.ip.ip}
            onChange={(e) => {
              props.onChange({
                ...props.ip,
                ip: e.target.value,
              });
            }}></input>
        </div>
        <div className="right">
          <text className="status">Status: {props.ip.state}</text>
          <br></br>
          <text className="date">{props.ip.date}</text>
        </div>
        <div className="statusIconBlock">
          // <img src="./loading.png" className="statusIcon" alt="Loading" />
          //{" "}
        </div>
        <button onClick={() => {
          setIsEditing(false);
          props.onChange({
            ...props.ip
          })
        }
        }>Save</button>
      </div>
    );
  } else {
    portContent = (
      <div className="port-box">
        <div className="left">
          <text className="port-name">{props.ip.name}</text>
          <br></br>
          <text className="port-ip">{props.ip.ip}</text>
        </div>
        <div className="right">
          <text className="status">Status: {props.ip.state}</text>
          <br></br>
          <text className="date">{props.ip.date}</text>
        </div>
        <div className="statusIconBlock">
          <img src="./loading.png" className="statusIcon" alt="Loading" />
        </div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => props.onDelete(props.ip.id)}>Delete</button>
      </div>
    );
  }

  return portContent;
}

export { Portbox };
