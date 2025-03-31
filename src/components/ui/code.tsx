import { cn } from "@/lib/utils";
import React, { FC, type HTMLAttributes } from "react";

export const Code: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <code
    className={cn(
      "relative rounded bg-muted px-[0.3rem]  py-[0.2rem]  font-mono  text-sm font-semibold",
      className
    )}
    {...props}
  />
);
Code.displayName = "Code";
