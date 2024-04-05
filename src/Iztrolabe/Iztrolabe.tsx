import React, { useEffect, useMemo, useState } from "react";
import { Izpalace } from "../Izpalace/Izpalace";
import { IztrolabeProps } from "./Iztrolabe.type";
import { IzpalaceCenter } from "../IzpalaceCenter";
import classNames from "classnames";
import { useIztro } from "iztro-hook";
import "./Iztrolabe.css";
import "../theme/default.css";
import { Scope } from "iztro/lib/data/types";
import { HeavenlyStemKey } from "iztro/lib/i18n";
import { getPalaceNames } from "iztro/lib/astro";

export const Iztrolabe: React.FC<IztrolabeProps> = (props) => {
  const [taichiPoint, setTaichiPoint] = useState(-1);
  const [taichiPalaces, setTaichiPalaces] = useState<undefined | string[]>();
  const [activeHeavenlyStem, setActiveHeavenlyStem] =
    useState<HeavenlyStemKey>();
  const [hoverHeavenlyStem, setHoverHeavenlyStem] = useState<HeavenlyStemKey>();
  const [focusedIndex, setFocusedIndex] = useState<number>();
  const [showDecadal, setShowDecadal] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [showHourly, setShowShowHourly] = useState(false);
  const [horoscopeDate, setHoroscopeDate] = useState<string | Date>();
  const [horoscopeHour, setHoroscopeHour] = useState<number>();
  const { astrolabe, horoscope, setHoroscope } = useIztro({
    birthday: props.birthday,
    birthTime: props.birthTime,
    gender: props.gender,
    birthdayType: props.birthdayType,
    fixLeap: props.fixLeap,
    isLeapMonth: props.isLeapMonth,
    lang: props.lang,
    options: props.options,
  });

  const toggleShowScope = (scope: Scope) => {
    switch (scope) {
      case "decadal":
        setShowDecadal(!showDecadal);
        break;
      case "yearly":
        setShowYearly(!showYearly);
        break;
      case "monthly":
        setShowMonthly(!showMonthly);
        break;
      case "daily":
        setShowDaily(!showDaily);
        break;
      case "hourly":
        setShowShowHourly(!showHourly);
        break;
    }
  };

  const toggleActiveHeavenlyStem = (heavenlyStem: HeavenlyStemKey) => {
    if (heavenlyStem === activeHeavenlyStem) {
      setActiveHeavenlyStem(undefined);
    } else {
      setActiveHeavenlyStem(heavenlyStem);
    }
  };

  const dynamic = useMemo(() => {
    if (showHourly) {
      return {
        arrowIndex: horoscope?.hourly.index,
        arrowScope: "hourly" as Scope,
      };
    }

    if (showDaily) {
      return {
        arrowIndex: horoscope?.daily.index,
        arrowScope: "daily" as Scope,
      };
    }

    if (showMonthly) {
      return {
        arrowIndex: horoscope?.monthly.index,
        arrowScope: "monthly" as Scope,
      };
    }

    if (showYearly) {
      return {
        arrowIndex: horoscope?.yearly.index,
        arrowScope: "yearly" as Scope,
      };
    }

    if (showDecadal) {
      return {
        arrowIndex: horoscope?.decadal.index,
        arrowScope: "decadal" as Scope,
      };
    }
  }, [showDecadal, showYearly, showMonthly, showDaily, showHourly, horoscope]);

  useEffect(() => {
    setHoroscopeDate(props.horoscopeDate ?? new Date());
    setHoroscopeHour(props.horoscopeHour ?? 0);
  }, [props.horoscopeDate, props.horoscopeHour]);

  useEffect(() => {
    setHoroscope(horoscopeDate ?? new Date(), horoscopeHour);
  }, [horoscopeDate, horoscopeHour]);

  useEffect(() => {
    if (taichiPoint < 0) {
      setTaichiPalaces(undefined);
    } else {
      const palaces = getPalaceNames(taichiPoint);

      setTaichiPalaces(palaces);
    }
  }, [taichiPoint]);

  const toggleTaichiPoint = (index: number) => {
    if (taichiPoint === index) {
      setTaichiPoint(-1);
    } else {
      setTaichiPoint(index);
    }
  };

  return (
    <div
      className={classNames("iztro-astrolabe", "iztro-astrolabe-theme-default")}
    >
      {astrolabe?.palaces.map((palace) => {
        return (
          <Izpalace
            key={palace.earthlyBranch}
            focusedIndex={focusedIndex}
            onFocused={setFocusedIndex}
            horoscope={horoscope}
            showDecadalScope={showDecadal}
            showYearlyScope={showYearly}
            showMonthlyScope={showMonthly}
            showDailyScope={showDaily}
            showHourlyScope={showHourly}
            taichiPalace={taichiPalaces?.[palace.index]}
            toggleScope={toggleShowScope}
            activeHeavenlyStem={activeHeavenlyStem}
            toggleActiveHeavenlyStem={toggleActiveHeavenlyStem}
            hoverHeavenlyStem={hoverHeavenlyStem}
            setHoverHeavenlyStem={setHoverHeavenlyStem}
            toggleTaichiPoint={toggleTaichiPoint}
            {...palace}
          />
        );
      })}
      <IzpalaceCenter
        astrolabe={astrolabe}
        horoscope={horoscope}
        horoscopeDate={horoscopeDate}
        horoscopeHour={horoscopeHour}
        setHoroscopeDate={setHoroscopeDate}
        setHoroscopeHour={setHoroscopeHour}
        {...dynamic}
      />
    </div>
  );
};
