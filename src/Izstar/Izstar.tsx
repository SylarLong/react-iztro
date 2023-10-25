import React from "react";
import { IzstarProps } from "./Izstar.type";
import classNames from "classnames";
import { MUTAGEN } from "iztro/lib/data";
import { MutagenKey, kot, t } from "iztro/lib/i18n";

export const Izstar = ({ horoscopeMutagens, ...star }: IzstarProps) => {
  return (
    <div className={classNames("iztro-star", `iztro-star-${star.type}`)}>
      {star.name}
      <i className={classNames("iztro-star-brightness")}>{star.brightness}</i>
      {star.mutagen && (
        <span
          className={classNames(
            "iztro-star-mutagen",
            `mutagen-${MUTAGEN.indexOf(kot<MutagenKey>(star.mutagen))}`
          )}
        >
          {star.mutagen}
        </span>
      )}
      {horoscopeMutagens?.map((item) => {
        if (item.mutagen.includes(star.name) && item.show) {
          return (
            <span
              key={item.scope}
              className={classNames(
                "iztro-star-mutagen",
                `mutagen-${item.scope}`
              )}
            >
              {t(MUTAGEN[item.mutagen.indexOf(star.name)])}
            </span>
          );
        }
      })}
    </div>
  );
};
