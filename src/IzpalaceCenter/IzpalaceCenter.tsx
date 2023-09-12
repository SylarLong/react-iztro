import classNames from "classnames";
import React from "react";
import "./IzpalaceCenter.css";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";

type IzpalaceCenterProps = {
  astrolabe?: FunctionalAstrolabe;
};

export const IzpalaceCenter = ({ astrolabe }: IzpalaceCenterProps) => {
  return (
    <div className={classNames("iztro-center-palace")}>
      <ul>
        <li>四柱：{astrolabe?.chineseDate}</li>
        <li>阳历：{astrolabe?.solarDate}</li>
        <li>农历：{astrolabe?.lunarDate}</li>
        <li>
          时辰：{astrolabe?.time}({astrolabe?.timeRange})
        </li>
        <li>生肖：{astrolabe?.zodiac}</li>
        <li>星座：{astrolabe?.sign}</li>
        <li>命主：{astrolabe?.soul}</li>
        <li>身主：{astrolabe?.body}</li>
        <li>命宫：{astrolabe?.earthlyBranchOfSoulPalace}</li>
        <li>身宫：{astrolabe?.earthlyBranchOfBodyPalace}</li>
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
