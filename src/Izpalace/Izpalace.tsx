import React, { useMemo } from "react";
import { IzpalaceProps } from "./Izpalace.type";
import classNames from "classnames";
import "./Izpalace.css";
import { Izstar } from "../Izstar";
import { t } from "iztro/lib/i18n";

export const Izpalace = ({ index, horoscope, ...palace }: IzpalaceProps) => {
  const horoscopeNames = useMemo(() => {
    const horoscopeNames = [];

    if (horoscope?.decadal.index === index) {
      horoscopeNames.push(
        `${horoscope.decadal.name}(${horoscope.decadal.heavenlyStem})`
      );
    }

    if (horoscope?.yearly.index === index) {
      horoscopeNames.push(
        `${horoscope.yearly.name}(${horoscope.yearly.heavenlyStem})`
      );
    }

    if (horoscope?.monthly.index === index) {
      horoscopeNames.push(
        `${horoscope.monthly.name}(${horoscope.monthly.heavenlyStem})`
      );
    }

    if (horoscope?.daily.index === index) {
      horoscopeNames.push(
        `${horoscope.daily.name}(${horoscope.daily.heavenlyStem})`
      );
    }

    if (horoscope?.hourly.index === index) {
      horoscopeNames.push(
        `${horoscope.hourly.name}(${horoscope.hourly.heavenlyStem})`
      );
    }

    if (horoscope?.age.index === index) {
      horoscopeNames.push(horoscope.age.name);
    }

    return horoscopeNames;
  }, [horoscope]);

  return (
    <div
      className={classNames("iztro-palace")}
      style={{ gridArea: `g${index}` }}
    >
      <div className={classNames("iztro-palace-major")}>
        {palace.majorStars.map((star) => (
          <Izstar key={star.name} {...star} />
        ))}
      </div>
      <div className={classNames("iztro-palace-minor")}>
        {palace.minorStars.map((star) => (
          <Izstar key={star.name} {...star} />
        ))}
      </div>
      <div className={classNames("iztro-palace-adj")}>
        <div>
          {palace.adjectiveStars.slice(5).map((star) => (
            <Izstar key={star.name} {...star} />
          ))}
        </div>
        <div>
          {palace.adjectiveStars.slice(0, 5).map((star) => (
            <Izstar key={star.name} {...star} />
          ))}
        </div>
      </div>
      <div className={classNames("iztro-palace-horo-star")}>
        <div className={classNames("stars")}>
          {horoscope?.decadal?.stars &&
            horoscope?.decadal?.stars[index].map((star) => (
              <Izstar key={star.name} {...star} />
            ))}
        </div>
        <div className={classNames("stars")}>
          {horoscope?.yearly?.stars &&
            horoscope?.yearly?.stars[index].map((star) => (
              <Izstar key={star.name} {...star} />
            ))}
        </div>
      </div>
      <div className={classNames("iztro-palace-fate")}>
        {horoscopeNames?.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className={classNames("iztro-palace-footer")}>
        <div>
          <div className={classNames("iztro-palace-lft24")}>
            <div>{palace.changsheng12}</div>
            <div>{palace.boshi12}</div>
          </div>
          <div className={classNames("iztro-palace-name")}>
            {palace.name}
            {palace.isBodyPalace && (
              <span className={classNames("iztro-palace-name-body")}>
                ·{t("bodyPalace")}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className={classNames("iztro-palace-scope")}>
            <div className={classNames("iztro-palace-scope-age")}>
              {palace.ages.join(" ")}
            </div>
            <div className={classNames("iztro-palace-scope-decadal")}>
              {palace.decadal.range.join(" - ")}
            </div>
          </div>
          {/* <div className={classNames("iztro-palace-dynamic-name")}>
            <span>{horoscope?.decadal.palaceNames[index]}</span>
            <span>{horoscope?.yearly.palaceNames[index]}</span>
            <span>{horoscope?.monthly.palaceNames[index]}</span>
            <span>{horoscope?.daily.palaceNames[index]}</span>
            <span>{horoscope?.hourly.palaceNames[index]}</span>
          </div> */}
        </div>
        <div>
          <div className={classNames("iztro-palace-rgt24")}>
            <div>{palace.suiqian12}</div>
            <div>{palace.jiangqian12}</div>
          </div>

          <div className={classNames("iztro-palace-gz")}>
            {palace.heavenlyStem}
            {palace.earthlyBranch}
          </div>
        </div>
      </div>
    </div>
  );
};
