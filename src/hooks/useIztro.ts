import { astro } from "iztro";
import { timeToIndex } from "iztro/lib/utils";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { useEffect, useState } from "react";
import { IztroInput, RangeOfNumber } from "../config/types";
import { Horoscope } from "iztro/lib/data/types";

export const useIztro = (input: IztroInput) => {
  const _currentDate = new Date();
  const _currentHour = _currentDate.getHours();
  const [astrolabe, _setAstrolabe] = useState<FunctionalAstrolabe>();
  const [_horoscopeDate, _setHoroscopeDate] = useState<string | Date>(
    _currentDate
  );
  const [_horoscopeHour, _setHoroscopeHour] = useState<number>(
    timeToIndex(_currentHour)
  );
  const [horoscope, _setHoroscope] = useState<Horoscope>();
  const { birthTime, birthday, birthdayType, fixLeap, isLeapMonth, gender } =
    input;

  useEffect(() => {
    const date = new Date(birthday).toString().toLowerCase();

    if (!birthday || date === "invalid date") {
      return undefined;
    }

    if (birthdayType === "lunar") {
      const data = astro.astrolabeByLunarDate(
        birthday,
        birthTime,
        gender,
        isLeapMonth,
        fixLeap
      );

      _setAstrolabe(data);

      return;
    }

    const data = astro.astrolabeBySolarDate(
      birthday,
      birthTime,
      gender,
      fixLeap
    );

    _setAstrolabe(data);
  }, [birthTime, birthday, birthdayType, fixLeap, isLeapMonth, gender]);

  useEffect(() => {
    if (astrolabe) {
      _setHoroscope(astrolabe.horoscope(_horoscopeDate, _horoscopeHour));
    }
  }, [astrolabe, _horoscopeDate, _horoscopeHour]);

  const setHoroscope = (date: string | Date, hour?: RangeOfNumber<0, 12>) => {
    _setHoroscopeDate(date);

    if (typeof hour === "number") {
      _setHoroscopeHour(hour);
    } else {
      const _hour = timeToIndex(new Date(date).getHours());

      _setHoroscopeHour(_hour);
    }
  };

  return {
    astrolabe,
    horoscope,
    setHoroscope,
  };
};
