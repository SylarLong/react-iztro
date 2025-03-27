import React, { cloneElement, useEffect, useState } from "react";
import { IzstarInfoProps } from "./IzstarWiki.type";
import { Popover } from "react-tiny-popover";
import "./markdown.css";
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
      containerClassName="iztro-astrolabe-theme-default"
      isOpen={isPopoverOpen}
      positions={["right", "bottom", "top", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={() => (
        <div className="markdown-body iztro-star-wiki">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            remarkRehypeOptions={{
              allowDangerousHtml: true,
            }}
          >
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
