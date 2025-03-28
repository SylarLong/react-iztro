import type { Root } from "mdast";
import type { Plugin, Data } from "unified";
import { fromMarkdown } from "./fromMarkdown";
import { syntax } from "./syntax";
import type { Extension as FromMarkdownExtension } from "mdast-util-from-markdown";
import type { Extension as MicromarkExtension } from "micromark-util-types";

interface RemarkPluginData extends Data {
  micromarkExtensions?: MicromarkExtension[];
  fromMarkdownExtensions?: FromMarkdownExtension[];
}

const remarkWikilink: Plugin<[], Root> = function () {
  const data: RemarkPluginData = this.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);

  micromarkExtensions.push(syntax());
  fromMarkdownExtensions.push(fromMarkdown());
};

export {
  fromMarkdown as fromWikilinkMarkdown,
  remarkWikilink,
  syntax as remarkWikilinkSyntax,
};
