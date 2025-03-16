import { IztroInput } from "iztro-hook/lib/index.type";
import { NestedProps } from "../config/types";

export type IztrolabeProps = {
  width?: number | string;
  horoscopeDate?: string | Date;
  horoscopeHour?: number;
  centerPalaceAlign?: boolean;
} & IztroInput &
  NestedProps;
