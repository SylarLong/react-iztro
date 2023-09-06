import React from "react";
import styled from "styled-components";
import { vars } from "../config/var";
import { IzpalaceProps } from "./Izpalace.type";

type CommonStyle = {
  align?: string;
};

const StyledIzpalace = styled.div<Pick<IzpalaceProps, "index">>`
  grid-area: ${(props) => `g${props.index}`};
  border: 1px solid #000;
  padding: ${vars.gridGap};
  display: grid;
  text-transform: capitalize;
  grid-template-rows: auto auto 22px 30px 20px;
  grid-template-columns: 0.8fr 1.4fr 0.8fr;
  grid-template-areas:
    "major minor adj"
    "horo  minor adj"
    "fate  fate fate"
    "lft24 sope rgt24"
    "name dname gz";
  transition: all 0.25s ease-in-out;
  grid-auto-flow: column;
`;

const Area = styled.div<{ area: string } & CommonStyle>`
  grid-area: ${({ area }) => area};
  text-align: {align ?? left};
`;

const DecorativeStar = styled.div`
  font-size: ${vars.smallFontSize};
`;

const PalaceName = styled.div`
  font-size: ${vars.normalFontSize};
`;

const GzName = styled.div`
  font-size: ${vars.normalFontSize};
`;

const AdjWrapper = styled.div`
  color: #8c8c8c;
  font-size: ${vars.smallFontSize};
  grid-area: other;
  display: inline-flex;
  justify-self: flex-end;
  gap: ${vars.gridGap};
`;

export const Izpalace = ({ index, ...palace }: IzpalaceProps) => {
  return (
    <StyledIzpalace index={index}>
      <Area area="major">
        {palace.majorStars.map((star) => (
          <div key={star.name}>{star.name}</div>
        ))}
      </Area>
      <Area area="minor" align="center">
        {palace.minorStars.map((star) => (
          <div key={star.name}>{star.name}</div>
        ))}
      </Area>
      <Area area="adj" align="right">
        <AdjWrapper>
          <div>
            {palace.adjectiveStars.slice(5).map((star) => (
              <div key={star.name}>{star.name}</div>
            ))}
          </div>
          <div>
            {palace.adjectiveStars.slice(0, 5).map((star) => (
              <div key={star.name}>{star.name}</div>
            ))}
          </div>
        </AdjWrapper>
      </Area>
      <Area area="lft24">
        <DecorativeStar>{palace.changsheng12}</DecorativeStar>
        <DecorativeStar>{palace.boshi12}</DecorativeStar>
      </Area>
      <Area area="rgt24" align="right">
        <DecorativeStar>{palace.suiqian12}</DecorativeStar>
        <DecorativeStar>{palace.jiangqian12}</DecorativeStar>
      </Area>
      <Area area="name">
        <PalaceName>{palace.name}</PalaceName>
      </Area>
      <Area area="gz" align="right">
        <GzName>
          {palace.heavenlyStem}
          {palace.earthlyBranch}
        </GzName>
      </Area>
    </StyledIzpalace>
  );
};
