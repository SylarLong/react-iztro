import React, { useMemo } from "react";
import { IzstarProps } from "./Izstar.type";
import classNames from "classnames";
import { MUTAGEN } from "iztro/lib/data";
import { MutagenKey, kot, t } from "iztro/lib/i18n";
import { getMutagensByHeavenlyStem } from "iztro/lib/utils";

export const Izstar = ({
  horoscopeMutagens,
  activeHeavenlyStem,
  palaceHeavenlyStem,
  ...star
}: IzstarProps) => {
  const mutagenStyle = useMemo(() => {
    if (!activeHeavenlyStem) {
      return "";
    }

    const mutagens = getMutagensByHeavenlyStem(t(activeHeavenlyStem));
    const index = mutagens.indexOf(star.name);

    if (index < 0) {
      return "";
    }

    return `iztro-star-mutagen-${index}`;
  }, [activeHeavenlyStem, star.name]);

  const selfMutagenStyle = useMemo(() => {
    if (!palaceHeavenlyStem) {
      return undefined;
    }

    const mutagens = getMutagensByHeavenlyStem(t(palaceHeavenlyStem));
    const index = mutagens.indexOf(star.name);

    if (index < 0) {
      return "";
    }

    return `iztro-star-self-mutagen-${index}`;
  }, [palaceHeavenlyStem]);

  return (
    <div className={classNames("iztro-star", `iztro-star-${star.type}`)}>
      <span
        className={classNames(mutagenStyle, selfMutagenStyle, {
          "iztro-star-self-mutagen": !!selfMutagenStyle,
        })}
      >
        {star.name}
      </span>
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
