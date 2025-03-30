import React, { cloneElement, useEffect, useState } from "react";
import { IzWikiProps } from "./IzWiki.type";
import { Popover } from "react-tiny-popover";
import "./markdown.css";
import "./IzWiki.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { remarkWikilink } from "./remark-wikilink";
import rehypePart from "./rehype-part";
import remarkFrontmatter from "remark-frontmatter";

export const IzWiki = ({
  source,
  children,
  lazy = true,
  subHeadings = [],
}: IzWikiProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [md, setMd] = useState("");

  const loadDefaultMarkdown = async () => {
    const filePath = `/docs/${source}.md`;
    fetch(filePath)
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          return "# Markdown Not Found";
        }
      })
      .then((text) => setMd(text));
  };

  const loadMarkdownByName = (name: string) => {
    console.log("load markdown of", source);
    const request = window.indexedDB.open("iztro", 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("markdowns")) {
        loadDefaultMarkdown();
        return;
      }

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
      containerClassName="iztro-astrolabe-theme-default iztro-wiki"
      isOpen={isPopoverOpen}
      positions={["right", "bottom", "top", "left"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      padding={10}
      content={() => (
        <div className="markdown-body iztro-wiki-content">
          <Markdown
            remarkPlugins={[remarkFrontmatter, remarkGfm, remarkWikilink]}
            rehypePlugins={[rehypeRaw, [rehypePart, { headings: subHeadings }]]}
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
                    <IzWiki source={source} subHeadings={subHeadings}>
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
