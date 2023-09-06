import { IztroInput, NestedProps } from "../config/types";

export type IztrolabeProps = {
  width?: number | string;
  height?: number | string;
} & IztroInput &
  NestedProps;
