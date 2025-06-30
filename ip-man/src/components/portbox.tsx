import React from "react";
import "../styles/portbox.css";

function Portbox(props: {
  name: String;
  ip: String;
  status: String;
  date: String;
}) {
  return (
    <div className="port-box">
      <div className="left">
        <text className="port-name">{props.name}</text>
        <br></br>
        <text className="port-ip">{props.ip}</text>
      </div>
      <div className="right">
        <text className="status">Status: {props.status}</text>
        <br></br>
        <text className="date">{props.date}</text>
      </div>
      <div className="statusIconBlock">
        <img src="./loading.png" className="statusIcon" alt="Loading" />
      </div>
    </div>
  );
}

export { Portbox };
