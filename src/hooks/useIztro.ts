import { astro } from "iztro";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { useEffect, useState } from "react";
import { IztroInput } from "../config/types";

export const useIztro = (input: IztroInput) => {
  const [astrolabe, setAstrolabe] = useState<FunctionalAstrolabe>();
  const { birthTime, birthday, birthdayType, fixLeap, isLeapMonth, gender } =
    input;

  useEffect(() => {
    const date = new Date(birthday).toString().toLowerCase();

    if (!birthday || date === "invalid date") {
      return undefined;
    }

    if (birthdayType === "lunar") {
      const data = astro.astrolabeByLunarDate(
        date.toString(),
        birthTime,
        gender,
        isLeapMonth,
        fixLeap
      );

      setAstrolabe(data);
    }

    const data = astro.astrolabeBySolarDate(
      date.toString(),
      birthTime,
      gender,
      fixLeap
    );

    setAstrolabe(data);
  }, [birthTime, birthday, birthdayType, fixLeap, isLeapMonth, gender]);

  return {
    astrolabe,
  };
};
