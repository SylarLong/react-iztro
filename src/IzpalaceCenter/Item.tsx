import React from "react";
import { ReactNode } from "react";
import classNames from "classnames";
import "./IzpalaceCenter.css";

export type ItemProps = {
  title: ReactNode;
  content: ReactNode;
};

export const Item = ({ title, content }: ItemProps) => {
  return (
    <li className={classNames("iztro-palace-center-item")}>
      <label>{title}</label>
      <span>{content}</span>
    </li>
  );
};
