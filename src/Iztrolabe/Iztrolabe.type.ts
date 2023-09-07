import { IztroInput, NestedProps } from "../config/types";

export type IztrolabeProps = {
  width?: number | string;
} & IztroInput &
  NestedProps;
