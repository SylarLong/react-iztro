import FunctionalHoroscope from "iztro/lib/astro/FunctionalHoroscope";
import { IFunctionalPalace } from "iztro/lib/astro/FunctionalPalace";
import { Scope } from "iztro/lib/data/types";

export type IzpalaceProps = {
  index: number;
  focusedIndex?: number;
  horoscope?: FunctionalHoroscope;
  showDecadalScope?: boolean;
  showYearlyScope?: boolean;
  showMonthlyScope?: boolean;
  showDailyScope?: boolean;
  showHourlyScope?: boolean;
  toggleScope?: (scope: Scope) => void;
  onFocused?: (index?: number) => void;
} & IFunctionalPalace;
