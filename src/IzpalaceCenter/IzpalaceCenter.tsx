import classNames from "classnames";
import React, { useMemo } from "react";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { Item, ItemProps } from "./Item";
import "./IzpalaceCenter.css";
import { Line } from "./Line";
import { fixEarthlyBranchIndex } from "iztro/lib/utils";
import { Scope } from "iztro/lib/data/types";

type IzpalaceCenterProps = {
  astrolabe?: FunctionalAstrolabe;
  arrowIndex?: number;
  arrowScope?: Scope;
};

export const IzpalaceCenter = ({
  astrolabe,
  arrowIndex,
  arrowScope,
}: IzpalaceCenterProps) => {
  const records: ItemProps[] = useMemo(
    () => [
      {
        title: "四柱：",
        content: astrolabe?.chineseDate,
      },
      {
        title: "阳历：",
        content: astrolabe?.solarDate,
      },
      {
        title: "农历：",
        content: astrolabe?.lunarDate,
      },
      {
        title: "时辰：",
        content: `${astrolabe?.time}(${astrolabe?.timeRange})`,
      },
      {
        title: "生肖：",
        content: astrolabe?.zodiac,
      },
      {
        title: "星座：",
        content: astrolabe?.sign,
      },
      {
        title: "命主：",
        content: astrolabe?.soul,
      },
      {
        title: "身主：",
        content: astrolabe?.body,
      },
      {
        title: "命宫：",
        content: astrolabe?.earthlyBranchOfSoulPalace,
      },
      {
        title: "身宫：",
        content: astrolabe?.earthlyBranchOfBodyPalace,
      },
    ],
    [astrolabe]
  );

  return (
    <div className={classNames("iztro-center-palace")}>
      {astrolabe?.earthlyBranchOfSoulPalace && (
        <Line
          scope={arrowScope}
          index={
            arrowIndex ??
            fixEarthlyBranchIndex(astrolabe.earthlyBranchOfSoulPalace)
          }
        />
      )}

      <ul>
        {records.map((rec, idx) => (
          <Item key={idx} {...rec} />
        ))}
      </ul>
      <a
        className="iztro-copyright"
        href="https://github.com/sylarlong/iztro"
        target="_blank"
      >
        <i>
          Powered by <code>iztro</code>
        </i>
      </a>
    </div>
  );
};
