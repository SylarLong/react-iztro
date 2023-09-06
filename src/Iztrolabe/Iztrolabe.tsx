import React from "react";
import { useIztro } from "../hooks";
import { Izpalace } from "../Izpalace/Izpalace";
import { IztrolabeProps } from "./Iztrolabe.type";
import styled from "styled-components";
import { IzpalaceCenter } from "../IzpalaceCenter";
import { vars } from "../config/var";

const StyledIztrolabe = styled.div<Pick<IztrolabeProps, "width" | "height">>`
  display: grid;
  position: relative;
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "100%"};
  grid-gap: ${vars.gridGap};
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "g3 g4 g5 g6"
    "g2 ct ct g7"
    "g1 ct ct g8"
    "g0 g11 g10 g9";
`;

export const Iztrolabe: React.FC<IztrolabeProps> = (props) => {
  const { astrolabe } = useIztro({
    birthday: props.birthday,
    birthTime: props.birthTime,
    gender: props.gender,
    birthdayType: props.birthdayType,
    fixLeap: props.fixLeap,
    isLeapMonth: props.isLeapMonth,
  });

  console.log(astrolabe);

  return (
    <StyledIztrolabe>
      {astrolabe?.palaces.map((palace, index) => (
        <Izpalace key={palace.earthlyBranch} index={index} {...palace} />
      ))}
      <IzpalaceCenter />
    </StyledIztrolabe>
  );
};
