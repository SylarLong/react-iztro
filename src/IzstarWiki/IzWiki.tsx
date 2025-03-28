import React, { cloneElement, useEffect, useState } from "react";
import { IzstarInfoProps } from "./IzWiki.type";
import { Popover, ArrowContainer } from "react-tiny-popover";
import "./markdown.css";
import "./IzWiki.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { remarkWikilink } from "./remark-wikilink";

export const IzWiki = ({ source, children }: IzstarInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [md, setMd] = useState("");

  useEffect(() => {
    // TODO remove
    if (source === "天府") {
      setIsPopoverOpen(true);
    }

    const loadMarkdown = async () => {
      try {
        // 动态导入匹配的 MD 文件
        const file = await import(`./doc/${source}.md`);
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
      // onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={"red"}
          arrowSize={10}
          arrowStyle={{ opacity: 0.7 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div className="markdown-body iztro-wiki">
            <Markdown
              remarkPlugins={[remarkGfm, remarkWikilink]}
              rehypePlugins={[rehypeRaw]}
              remarkRehypeOptions={{
                allowDangerousHtml: true,
              }}
              components={{
                a(props) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { node, className, href, children, ...rest } = props;
                  if ("data-wikilink" in rest && href) {
                    const [source, ...subHeadings] = href.split("#");
                    return (
                      <IzWiki source={source}>
                        <span className="iztro-wiki-link">{children}</span>
                      </IzWiki>
                    );
                  }
                  return (
                    <a className={className} href={href} {...rest}>
                      {children}
                    </a>
                  );
                },
              }}
            >
              {md}
            </Markdown>
          </div>
        </ArrowContainer>
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
