import { IztroInput } from "iztro-hook/lib/index.type";
import { NestedProps } from "../config/types";

export type IztrolabeProps = {
  width?: number | string;
} & IztroInput &
  NestedProps;
