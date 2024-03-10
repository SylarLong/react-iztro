import { IFunctionalHoroscope } from "iztro/lib/astro/FunctionalHoroscope";
import { IFunctionalPalace } from "iztro/lib/astro/FunctionalPalace";
import { HoroscopeItem, Scope } from "iztro/lib/data/types";
import { HeavenlyStemKey } from "iztro/lib/i18n";

export type IzpalaceProps = {
  index: number;
  taichiPalace?: string;
  focusedIndex?: number;
  horoscope?: IFunctionalHoroscope;
  showDecadalScope?: boolean;
  showYearlyScope?: boolean;
  showMonthlyScope?: boolean;
  showDailyScope?: boolean;
  showHourlyScope?: boolean;
  activeHeavenlyStem?: HeavenlyStemKey;
  hoverHeavenlyStem?: HeavenlyStemKey;
  setHoverHeavenlyStem?: (heavenlyStem?: HeavenlyStemKey) => void;
  toggleActiveHeavenlyStem?: (heavenlyStem: HeavenlyStemKey) => void;
  toggleScope?: (scope: Scope) => void;
  onFocused?: (index?: number) => void;
  toggleTaichiPoint?: (index: number) => void;
} & IFunctionalPalace;

export type HoroscopeForPalace = {
  scope: Scope;
  show: boolean;
} & Partial<HoroscopeItem>;
