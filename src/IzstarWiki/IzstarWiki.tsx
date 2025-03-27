import React, { cloneElement, useEffect, useState } from "react";
import { IzstarInfoProps } from "./IzstarWiki.type";
import { Popover } from "react-tiny-popover";
import "./IzstarWiki.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const IzstarInfo = ({ star, children }: IzstarInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [md, setMd] = useState("");

  useEffect(() => {
    // TODO remove
    if (star.name === "紫微") {
      setIsPopoverOpen(true);
    }

    const loadMarkdown = async () => {
      try {
        // 动态导入匹配的 MD 文件
        const file = await import(`./doc/${star.name}.md`);
        setMd(file.default);
      } catch (error) {
        console.error("加载 Markdown 文件失败:", error);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <Popover
      containerClassName="iztro-astrolabe-theme-default iztro-star-wiki"
      isOpen={isPopoverOpen}
      positions={["right", "bottom", "top", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={() => (
        <div
          style={{
            width: "600px",
            height: "600px",
            overflow: "auto",
            backgroundColor: "white",
            padding: "16px",
            border: "1px solid black",
          }}
        >
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {md}
          </Markdown>
        </div>
      )}
      children={cloneElement(children, {
        onClick: () => setIsPopoverOpen(!isPopoverOpen),
        style: {
          cursor: "pointer",
        },
      })}
    />
  );
};
