import { Data, Node } from "mdast";

export type IzstarInfoProps = {
  children: JSX.Element;
  source: string;
  lazy?: boolean;
  subHeadings?: string[];
};

interface WikilinkData extends Data {
  alias?: string;
  exists?: boolean;
}

export interface Wikilink extends Node {
  type: "wikilink";
  value: string | null;
  data: WikilinkData;
}

declare module "mdast" {
  interface RootContentMap {
    wikilink: Wikilink;
  }
}

declare module "micromark-util-types" {
  interface TokenTypeMap {
    wikilink: "wikilink";
    wikilinkMarker: "wikilinkMarker";
    wikilinkData: "wikilinkData";
    wikilinkTarget: "wikilinkTarget";
    wikilinkAlias: "wikilinkAlias";
    wikilinkAliasMarker: "wikilinkAliasMarker";
  }
}

export interface MarkdownFile {
  name: string;
  content: string;
}
