import React, { cloneElement, useState } from "react";
import { IzstarInfoProps } from "./IzstarInfo.type";
import { Popover } from "react-tiny-popover";

export const IzstarInfo = ({ star, children }: IzstarInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["right", "bottom", "top", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={({ position, nudgedLeft, nudgedTop }) => (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <div>name: {star.name}</div>
          <div>type: {star.type}</div>
        </div>
      )}
      children={cloneElement(children, {
        onClick: () => setIsPopoverOpen(!isPopoverOpen),
      })}
    />
  );
};
