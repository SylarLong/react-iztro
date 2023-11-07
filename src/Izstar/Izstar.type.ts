import FunctionalStar from "iztro/lib/star/FunctionalStar";
import { HeavenlyStemKey, StarName } from "iztro/lib/i18n";
import { Scope } from "iztro/lib/data/types";

export type HoroscopeMutagen = {
  mutagen: StarName[];
  scope: Scope;
  show: boolean;
};

export type IzstarProps = {
  palaceHeavenlyStem?: HeavenlyStemKey;
  activeHeavenlyStem?: HeavenlyStemKey;
  hoverHeavenlyStem?: HeavenlyStemKey;
  horoscopeMutagens?: HoroscopeMutagen[];
} & FunctionalStar;
