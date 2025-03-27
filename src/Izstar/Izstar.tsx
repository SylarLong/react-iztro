import React, { useMemo, useState } from "react";
import { IzstarProps } from "./Izstar.type";
import classNames from "classnames";
import { MUTAGEN } from "iztro/lib/data";
import { MutagenKey, kot, t } from "iztro/lib/i18n";
import { getMutagensByHeavenlyStem } from "iztro/lib/utils";
import { Popover } from "react-tiny-popover";

export const Izstar = ({
  horoscopeMutagens,
  activeHeavenlyStem,
  hoverHeavenlyStem,
  palaceHeavenlyStem,
  ...star
}: IzstarProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const hoverMutagenStyle = useMemo(() => {
    if (!hoverHeavenlyStem) {
      return "";
    }

    const mutagens = getMutagensByHeavenlyStem(t(hoverHeavenlyStem));
    const index = mutagens.indexOf(star.name);

    if (index < 0) {
      return "";
    }

    return `iztro-star-hover-mutagen-${index}`;
  }, [hoverHeavenlyStem, star.name]);

  const selfMutagenStyle = useMemo(() => {
    if (!palaceHeavenlyStem || activeHeavenlyStem || hoverHeavenlyStem) {
      return undefined;
    }

    const mutagens = getMutagensByHeavenlyStem(t(palaceHeavenlyStem));
    const index = mutagens.indexOf(star.name);

    if (index < 0) {
      return "";
    }

    return `iztro-star-self-mutagen-${index}`;
  }, [palaceHeavenlyStem, activeHeavenlyStem, hoverHeavenlyStem]);

  return (
    <div className={classNames("iztro-star", `iztro-star-${star.type}`)}>
      {star.type === "major" ? (
        <Popover
          isOpen={isPopoverOpen}
          positions={["right", "bottom", "top", "left"]}
          onClickOutside={() => setIsPopoverOpen(false)}
          padding={10}
          content={({ position, nudgedLeft, nudgedTop }) => (
            <div
              style={{
                width: "300px",
                height: "400px",
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              <div>name: {star.name}</div>
              <div>type: {star.type}</div>
            </div>
          )}
        >
          <span
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={classNames(
              "star-with-mutagen",
              mutagenStyle,
              selfMutagenStyle,
              hoverMutagenStyle,
              {
                "iztro-star-self-mutagen": !!selfMutagenStyle,
              }
            )}
          >
            {star.name}
          </span>
        </Popover>
      ) : (
        <span
          className={classNames(
            "star-with-mutagen",
            mutagenStyle,
            selfMutagenStyle,
            hoverMutagenStyle,
            {
              "iztro-star-self-mutagen": !!selfMutagenStyle,
            }
          )}
        >
          {star.name}
        </span>
      )}
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
