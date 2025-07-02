import { useState } from "react";
import { Portbox } from "./portbox";
import { Divider } from "@mui/material";
import { IPEntry } from "../App";

export default function IPList(props: {
  ports: IPEntry[];
  filterValue: String;
  onChangePort: Function;
  onDeletePort: Function;
}) {
  return props.ports
    .filter((port: any) => port.name.includes(props.filterValue))
    .map((port: any, idx: Number) => {
      console.log(port);
      return (
        <>
          <Portbox
            key={port.id}
            ip={port}
            onChange={props.onChangePort}
            onDelete={props.onDeletePort}></Portbox>
          <Divider></Divider>
        </>
      );
    });
}
