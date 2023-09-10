import React from "react";
import { useIztro } from "../hooks";
import { Izpalace } from "../Izpalace/Izpalace";
import { IztrolabeProps } from "./Iztrolabe.type";
import { IzpalaceCenter } from "../IzpalaceCenter";
import classNames from "classnames";
import "./Iztrolabe.css";
import "../theme/default.css";

export const Iztrolabe: React.FC<IztrolabeProps> = (props) => {
  const { astrolabe, horoscope } = useIztro({
    birthday: props.birthday,
    birthTime: props.birthTime,
    gender: props.gender,
    birthdayType: props.birthdayType,
    fixLeap: props.fixLeap,
    isLeapMonth: props.isLeapMonth,
  });

  console.log(astrolabe, horoscope);

  return (
    <div
      className={classNames("iztro-astrolabe", "iztro-astrolabe-theme-default")}
    >
      {astrolabe?.palaces.map((palace, index) => {
        return (
          <Izpalace
            key={palace.earthlyBranch}
            index={index}
            horoscope={horoscope}
            {...palace}
          />
        );
      })}
      <IzpalaceCenter />
    </div>
  );
};
