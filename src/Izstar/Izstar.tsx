import React from "react";
import { IzstarProps } from "./Izstar.type";
import classNames from "classnames";
import { MUTAGEN } from "iztro/lib/data";
import { MutagenKey, kot } from "iztro/lib/i18n";

export const Izstar = (props: IzstarProps) => {
  return (
    <div className={classNames("iztro-star", `iztro-star-${props.type}`)}>
      {props.name}
      <i className={classNames("iztro-star-brightness")}>{props.brightness}</i>
      {props.mutagen && (
        <span
          className={classNames(
            "iztro-star-mutagen",
            `mutagen-${MUTAGEN.indexOf(kot<MutagenKey>(props.mutagen))}`
          )}
        >
          {props.mutagen}
        </span>
      )}
    </div>
  );
};
