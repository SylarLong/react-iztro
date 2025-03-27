import React, { cloneElement, useEffect, useState } from "react";
import { IzstarInfoProps } from "./IzstarInfo.type";
import { Popover } from "react-tiny-popover";
import { useIzstarInfo } from "./useIzstarInfo";
import classNames from "classnames";
import "./IzstarInfo.css";

export const IzstarInfo = ({ star, children }: IzstarInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const starInfo = useIzstarInfo({ name: star.name });

  useEffect(() => {
    if (star.name === "紫微") {
      setIsPopoverOpen(true);
    }
  }, []);

  return (
    <Popover
      containerClassName="iztro-astrolabe-theme-default iztro-star-info"
      isOpen={isPopoverOpen}
      positions={["right", "bottom", "top", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={() => (
        <div
          style={{
            width: "400px",
            height: "600px",
            backgroundColor: "white",
            border: "1px solid black",
            overflow: "auto",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className={classNames("iztro-star", "star-info-name")}>
              {starInfo?.name}
            </div>
            <div
              style={{
                marginLeft: "6px",
                fontSize: "13px",
              }}
            >
              <span>{starInfo?.yinYang}</span>·
              <span>{starInfo?.fiveElement}</span>
            </div>
          </div>
          <ul className="star-info-basic">
            <li>
              <label>化气：</label>
              <span>{starInfo?.transformation}</span>
            </li>

            <li>斗分：{starInfo?.galaxy}</li>
            <li>五行色：{starInfo?.elementColor}</li>
            <li>能量色：{starInfo?.energyColor}</li>
            <li>职业：{starInfo?.occupation}</li>
            <li>职务：{starInfo?.position}</li>
            <li>别号：{starInfo?.alias}</li>
          </ul>
          <div>
            {starInfo?.characteristics.map((c, index) => (
              <div key={index}>
                <span>{c}</span>
                <br />
              </div>
            ))}
          </div>
        </div>
      )}
      children={cloneElement(children, {
        onClick: () => setIsPopoverOpen(!isPopoverOpen),
        style: {
          cursor: "pointer",
        },
      })}
    />
  );
};
