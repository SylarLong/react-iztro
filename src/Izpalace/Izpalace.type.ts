import { IFunctionalPalace } from "iztro/lib/astro/FunctionalPalace";
import { Horoscope } from "iztro/lib/data/types";

export type IzpalaceProps = {
  index: number;
  focusedIndex?: number;
  horoscope?: Horoscope;
  onFocused?: (index: number) => void;
} & IFunctionalPalace;
