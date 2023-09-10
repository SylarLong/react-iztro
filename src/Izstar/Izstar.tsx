import React from "react";
import { IzstarProps } from "./Izstar.type";
import classNames from "classnames";

export const Izstar = (props: IzstarProps) => {
  return (
    <div className={classNames("iztro-star", `iztro-star-${props.type}`)}>
      {props.name}
      <i className={classNames("iztro-star-brightness")}>{props.brightness}</i>
    </div>
  );
};
