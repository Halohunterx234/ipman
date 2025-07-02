import { useState } from "react";
import { Portbox } from "./portbox";
import { Divider } from "@mui/material";

export default function IPList(props: {
  ports: any;
  filterValue: String;
  onChangePort: any;
  onDeletePort: any;
}) {

  console.log(props.ports, props.filterValue);
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
