import React, { cloneElement, useEffect, useState } from "react";
import { IzstarInfoProps } from "./IzWiki.type";
import { Popover, ArrowContainer } from "react-tiny-popover";
import "./markdown.css";
import "./IzWiki.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { remarkWikilink } from "./remark-wikilink";

export const IzWiki = ({ source, children, lazy = true }: IzstarInfoProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [md, setMd] = useState("");

  const loadDefaultMarkdown = async () => {
    try {
      // 动态导入匹配的 MD 文件
      const file = await import(`./doc/${source}.md`);
      setMd(file.default);
    } catch (error) {
      console.error("加载 Markdown 文件失败:", error);
    }
  };

  // 根据文件名从 IndexedDB 获取对应的文件
  const loadMarkdownByName = (name: string) => {
    console.log("load markdown of", source);
    const request = window.indexedDB.open("iztro", 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("markdowns", "readonly");
      const store = transaction.objectStore("markdowns");

      const getAllKeysRequest = store.getAllKeys(); // 获取所有的键

      getAllKeysRequest.onsuccess = () => {
        const keys = getAllKeysRequest.result as string[];
        // console.log("all keys:", keys);

        const targetKey = keys.find((key) => key.includes(`${name}.md`));
        // console.log("target key:", targetKey);

        if (targetKey) {
          const fileRequest = store.get(targetKey);
          fileRequest.onsuccess = () => {
            const file = fileRequest.result;
            if (file) {
              // console.log(`markdown of ${name}:`, file);
              setMd(file.content);
            } else {
              // console.log("Markdown not found, load default");
              loadDefaultMarkdown();
            }
          };
        } else {
          // console.log("load default markdown");
          loadDefaultMarkdown();
        }
      };
    };
  };

  useEffect(() => {
    if (lazy) {
      if (isPopoverOpen) {
        loadMarkdownByName(source);
      }
    } else {
      loadMarkdownByName(source);
    }
  }, [isPopoverOpen, lazy]);

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
