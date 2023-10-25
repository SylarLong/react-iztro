import React, { useMemo } from "react";
import { IzpalaceProps } from "./Izpalace.type";
import classNames from "classnames";
import "./Izpalace.css";
import { Izstar } from "../Izstar";
import { t } from "iztro/lib/i18n";
import { fixIndex } from "iztro/lib/utils";
import { HoroscopeItem, Scope } from "iztro/lib/data/types";

export type HoroscopeForPalace = {
  scope: Scope;
  show: boolean;
} & Partial<HoroscopeItem>;

export const Izpalace = ({
  index,
  focusedIndex,
  onFocused,
  horoscope,
  showDecadalScope = false,
  showYearlyScope = false,
  showMonthlyScope = false,
  showDailyScope = false,
  showHourlyScope = false,
  toggleScope,
  ...palace
}: IzpalaceProps) => {
  const horoscopeNames = useMemo<HoroscopeForPalace[]>(() => {
    const horoscopeNames = [];

    if (horoscope?.decadal.index === index) {
      horoscopeNames.push({
        ...horoscope.decadal,
        scope: "decadal" as Scope,
        show: showDecadalScope,
      });
    }

    if (horoscope?.yearly.index === index) {
      horoscopeNames.push({
        ...horoscope.yearly,
        scope: "yearly" as Scope,
        show: showYearlyScope,
      });
    }

    if (horoscope?.monthly.index === index) {
      horoscopeNames.push({
        ...horoscope.monthly,
        scope: "monthly" as Scope,
        show: showMonthlyScope,
      });
    }

    if (horoscope?.daily.index === index) {
      horoscopeNames.push({
        ...horoscope.daily,
        scope: "daily" as Scope,
        show: showDailyScope,
      });
    }

    if (horoscope?.hourly.index === index) {
      horoscopeNames.push({
        ...horoscope.hourly,
        scope: "hourly" as Scope,
        show: showHourlyScope,
      });
    }

    if (horoscope?.age.index === index) {
      horoscopeNames.push({
        name: horoscope.age.name,
        heavenlyStem: undefined,
        scope: "age" as Scope,
        show: false,
      });
    }

    return horoscopeNames;
  }, [
    horoscope,
    showDecadalScope,
    showYearlyScope,
    showMonthlyScope,
    showDailyScope,
    showHourlyScope,
  ]);

  const horoscopeMutagens = useMemo(() => {
    if (!horoscope) {
      return [];
    }

    return [
      {
        mutagen: horoscope.decadal.mutagen,
        scope: "decadal" as Scope,
        show: showDecadalScope,
      },
      {
        mutagen: horoscope.yearly.mutagen,
        scope: "yearly" as Scope,
        show: showYearlyScope,
      },
      {
        mutagen: horoscope.monthly.mutagen,
        scope: "monthly" as Scope,
        show: showMonthlyScope,
      },
      {
        mutagen: horoscope.daily.mutagen,
        scope: "daily" as Scope,
        show: showDailyScope,
      },
      {
        mutagen: horoscope.hourly.mutagen,
        scope: "hourly" as Scope,
        show: showHourlyScope,
      },
    ];
  }, [
    horoscope,
    showDecadalScope,
    showYearlyScope,
    showMonthlyScope,
    showDailyScope,
    showHourlyScope,
  ]);

  return (
    <div
      className={classNames("iztro-palace", {
        "focused-palace": focusedIndex === index,
        "opposite-palace":
          focusedIndex != undefined && index === fixIndex(focusedIndex + 6),
        "surrounded-palace":
          focusedIndex != undefined &&
          (index === fixIndex(focusedIndex + 4) ||
            index === fixIndex(focusedIndex - 4)),
      })}
      style={{ gridArea: `g${index}` }}
      onMouseEnter={() => onFocused?.(index)}
      onMouseLeave={() => onFocused?.(undefined)}
    >
      <div className={classNames("iztro-palace-major")}>
        {palace.majorStars.map((star) => (
          <Izstar
            key={star.name}
            horoscopeMutagens={horoscopeMutagens}
            {...star}
          />
        ))}
      </div>
      <div className={classNames("iztro-palace-minor")}>
        {palace.minorStars.map((star) => (
          <Izstar
            key={star.name}
            horoscopeMutagens={horoscopeMutagens}
            {...star}
          />
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
          <span
            key={item.name}
            className={classNames({
              [`iztro-palace-${item.scope}-active`]: item.show,
            })}
            onClick={
              item.scope ? () => toggleScope?.(item.scope as Scope) : undefined
            }
          >
            {item.name}
            {item.heavenlyStem && `(${item.heavenlyStem})`}
          </span>
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
          <div className={classNames("iztro-palace-dynamic-name")}>
            {showDecadalScope && (
              <span className="iztro-palace-dynamic-name-decadal">
                {horoscope?.decadal.palaceNames[index]}
              </span>
            )}
            {showYearlyScope && (
              <span className="iztro-palace-dynamic-name-yearly">
                {horoscope?.yearly.palaceNames[index]}
              </span>
            )}
            {showMonthlyScope && (
              <span className="iztro-palace-dynamic-name-monthly">
                {horoscope?.monthly.palaceNames[index]}
              </span>
            )}
            {showDailyScope && (
              <span className="iztro-palace-dynamic-name-daily">
                {horoscope?.daily.palaceNames[index]}
              </span>
            )}
            {showHourlyScope && (
              <span className="iztro-palace-dynamic-name-hourly">
                {horoscope?.hourly.palaceNames[index]}
              </span>
            )}
          </div>
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
