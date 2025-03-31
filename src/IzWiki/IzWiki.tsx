import React, { cloneElement, useEffect, useState } from "react";
import { IzWikiProps } from "./IzWiki.type";
import "./IzWiki.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { remarkWikilink } from "./remark-wikilink";
import rehypePart from "./rehype-part";
import remarkFrontmatter from "remark-frontmatter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Code } from "@/components/ui/code";

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
    <Popover>
      <PopoverTrigger>
        {cloneElement(children, {
          onClick: () => setIsPopoverOpen(!isPopoverOpen),
          style: {
            cursor: "pointer",
          },
        })}
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <ScrollArea type="scroll" className="">
          <article
            className={clsx(
              "prose",
              "prose-gray",
              "prose-h1:mb-4",
              "prose-h2:my-4",
              "prose-h3:my-4",
              "prose-h4:my-4",
              "prose-h5:my-4",
              "prose-h5:font-semibold",
              "prose-h6:my-4",
              "prose-h6:font-semibold",
              "prose-a:my-0",
              "prose-p:my-2",
              "prose-p:before:content-none prose-p:after:content-none",
              "prose-ul:my-2",
              "prose-li:my-0",
              "prose-hr:my-4",
              "prose-img:my-0",
              "w-[600px] max-h-[500px] h-full"
            )}
          >
            <Markdown
              remarkPlugins={[remarkFrontmatter, remarkGfm, remarkWikilink]}
              rehypePlugins={[
                rehypeRaw,
                [rehypePart, { headings: subHeadings }],
              ]}
              remarkRehypeOptions={{
                allowDangerousHtml: true,
              }}
              components={{
                a: (props) => {
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
                table: (props) => (
                  <Table className="not-prose">{props.children}</Table>
                ),
                thead: (props) => <TableHeader>{props.children}</TableHeader>,
                tr: (props) => (
                  <TableRow className="not-prose">{props.children}</TableRow>
                ),
                th: (props) => {
                  const { children, style } = props;
                  return <TableHead style={style}>{children}</TableHead>;
                },
                tbody: (props) => (
                  <TableBody className="not-prose">{props.children}</TableBody>
                ),
                td: (props) => {
                  const { children, style } = props;
                  return (
                    <TableCell className="not-prose" style={style}>
                      {children}
                    </TableCell>
                  );
                },
                code: (props) => (
                  <Code className="not-prose">{props.children}</Code>
                ),
              }}
            >
              {md}
            </Markdown>
          </article>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
