import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { Item, ItemProps } from "./Item";
import "./IzpalaceCenter.css";
import { Line } from "./Line";
import { fixEarthlyBranchIndex } from "iztro/lib/utils";
import { Scope } from "iztro/lib/data/types";
import { IFunctionalHoroscope } from "iztro/lib/astro/FunctionalHoroscope";
import { normalizeDateStr, solar2lunar } from "lunar-lite";
import { GenderName, kot, t } from "iztro/lib/i18n";
import { CHINESE_TIME } from "iztro/lib/data";

type IzpalaceCenterProps = {
  astrolabe?: FunctionalAstrolabe;
  horoscope?: IFunctionalHoroscope;
  horoscopeDate?: string | Date;
  horoscopeHour?: number;
  arrowIndex?: number;
  arrowScope?: Scope;
  setHoroscopeDate?: React.Dispatch<
    React.SetStateAction<string | Date | undefined>
  >;
  setHoroscopeHour?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const IzpalaceCenter = ({
  astrolabe,
  horoscope,
  arrowIndex,
  arrowScope,
  horoscopeDate = new Date(),
  horoscopeHour = 0,
  setHoroscopeDate,
  setHoroscopeHour,
}: IzpalaceCenterProps) => {
  const records: ItemProps[] = useMemo(
    () => [
      {
        title: "五行局：",
        content: astrolabe?.fiveElementsClass,
      },
      {
        title: "年龄(虚岁)：",
        content: `${horoscope?.age.nominalAge} 岁`,
      },
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
    [astrolabe, horoscope]
  );

  const horoDate = useMemo(() => {
    const dateStr = horoscopeDate ?? new Date();
    const [year, month, date] = normalizeDateStr(dateStr);
    const dt = new Date(year, month - 1, date);

    return {
      solar: `${year}-${month}-${date}`,
      lunar: solar2lunar(dateStr).toString(true),
      prevDecadalDisabled: dt.setFullYear(dt.getFullYear() - 1),
    };
  }, [horoscopeDate]);

  const onHoroscopeButtonClicked = (scope: Scope, value: number) => {
    if (!astrolabe?.solarDate) {
      return true;
    }

    const [year, month, date] = normalizeDateStr(horoscopeDate);
    const dt = new Date(year, month - 1, date);
    const [birthYear, birthMonth, birthDate] = normalizeDateStr(
      astrolabe.solarDate
    );
    const birthday = new Date(birthYear, birthMonth - 1, birthDate);
    let hour = horoscopeHour;

    switch (scope) {
      case "hourly":
        hour = horoscopeHour + value;

        if (horoscopeHour + value > 11) {
          // 如果大于亥时，则加一天，时辰变为早子时
          dt.setDate(dt.getDate() + 1);
          hour = 0;
        } else if (horoscopeHour + value < 0) {
          // 如果小于早子时，则减一天，时辰变为亥时
          dt.setDate(dt.getDate() - 1);
          hour = 11;
        }
        break;
      case "daily":
        dt.setDate(dt.getDate() + value);
        break;
      case "monthly":
        dt.setMonth(dt.getMonth() + value);
        break;
      case "yearly":
      case "decadal":
        dt.setFullYear(dt.getFullYear() + value);
        break;
    }

    if (dt.getTime() >= birthday.getTime()) {
      setHoroscopeDate?.(dt);
      setHoroscopeHour?.(hour);
    }
  };

  const shouldBeDisabled = useCallback(
    (dateStr: string | Date, scope: Scope, value: number) => {
      if (!astrolabe?.solarDate) {
        return true;
      }

      const [year, month, date] = normalizeDateStr(dateStr);
      const dt = new Date(year, month - 1, date);
      const [birthYear, birthMonth, birthDate] = normalizeDateStr(
        astrolabe.solarDate
      );
      const birthday = new Date(birthYear, birthMonth - 1, birthDate);

      switch (scope) {
        case "hourly":
          if (horoscopeHour + value > 11) {
            dt.setDate(dt.getDate() + 1);
          } else if (horoscopeHour + value < 0) {
            dt.setDate(dt.getDate() - 1);
          }

          break;
        case "daily":
          dt.setDate(dt.getDate() + value);
          break;
        case "monthly":
          dt.setMonth(dt.getMonth() + value);
          break;
        case "yearly":
        case "decadal":
          dt.setFullYear(dt.getFullYear() + value);
          break;
      }

      if (dt.getTime() < birthday.getTime()) {
        return true;
      }

      return false;
    },
    [horoscopeHour, astrolabe]
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
      <h3 className="center-title">
        <span
          className={`gender gender-${kot<GenderName>(
            astrolabe?.gender ?? ""
          )}`}
        >
          {kot<GenderName>(astrolabe?.gender ?? "") === "male" ? "♂" : "♀"}
        </span>
        <span>基本信息</span>
      </h3>
      <ul className="basic-info">
        {records.map((rec, idx) => (
          <Item key={idx} {...rec} />
        ))}
      </ul>
      <h3 className="center-title">运限信息</h3>
      <ul className="basic-info">
        <Item title="农历：" content={horoDate.lunar} />
        <div className={classNames("solar-horoscope")}>
          <Item title="阳历：" content={horoDate.solar} />
          <span
            className="today"
            onClick={() => setHoroscopeDate?.(new Date())}
          >
            今
          </span>
        </div>
      </ul>
      <div className="horo-buttons">
        <span
          className={classNames("center-button", {
            disabled: shouldBeDisabled(horoDate.solar, "yearly", -10),
          })}
          onClick={() => onHoroscopeButtonClicked("yearly", -10)}
        >
          ◀限
        </span>
        <span
          className={classNames("center-button", {
            disabled: shouldBeDisabled(horoDate.solar, "yearly", -1),
          })}
          onClick={() => onHoroscopeButtonClicked("yearly", -1)}
        >
          ◀年
        </span>
        <span
          className={classNames("center-button", {
            disabled: shouldBeDisabled(horoDate.solar, "monthly", -1),
          })}
          onClick={() => onHoroscopeButtonClicked("monthly", -1)}
        >
          ◀月
        </span>
        <span
          className={classNames("center-button", {
            disabled: shouldBeDisabled(horoDate.solar, "daily", -1),
          })}
          onClick={() => onHoroscopeButtonClicked("daily", -1)}
        >
          ◀日
        </span>
        <span
          className={classNames("center-button", {
            disabled: shouldBeDisabled(horoDate.solar, "hourly", -1),
          })}
          onClick={() => onHoroscopeButtonClicked("hourly", -1)}
        >
          ◀时
        </span>
        <span className="center-horo-hour">
          {t(CHINESE_TIME[horoscopeHour])}
        </span>
        <span
          className={classNames("center-button")}
          onClick={() => onHoroscopeButtonClicked("hourly", 1)}
        >
          时▶
        </span>
        <span
          className={classNames("center-button")}
          onClick={() => onHoroscopeButtonClicked("daily", 1)}
        >
          日▶
        </span>
        <span
          className={classNames("center-button")}
          onClick={() => onHoroscopeButtonClicked("monthly", 1)}
        >
          月▶
        </span>
        <span
          className={classNames("center-button")}
          onClick={() => onHoroscopeButtonClicked("yearly", 1)}
        >
          年▶
        </span>
        <span
          className={classNames("center-button")}
          onClick={() => onHoroscopeButtonClicked("yearly", 10)}
        >
          限▶
        </span>
      </div>
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
