import { IzstarInfo } from "./IzstarInfo.type";
import data from "./data.json";

export const useIzstarInfo = ({
  name,
}: {
  name: string;
}): IzstarInfo | null => {
  const starNameInfoMap: { [key: string]: IzstarInfo | null } = data;
  return starNameInfoMap[name];
};
