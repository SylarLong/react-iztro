import { Data, Node } from "mdast";

export type IzstarInfoProps = {
  children: JSX.Element;
  source: string;
};

/**
 * 星宿组合类型
 */
type CelestialConfiguration = {
  /**
   * 主星
   */
  primaryStar: string;
  /**
   * 辅星
   */
  secondaryStars: string;
  /**
   * 特性
   */
  characteristics: string[];
};

/**
 * 星宿信息类型
 */
export type IzstarInfo = {
  /**
   * 星宿名称
   */
  name: string;
  /**
   * 阴阳
   */
  yinYang: string;
  /**
   * 五行
   */
  fiveElement: string;
  /**
   * 星系（斗分）
   */
  galaxy: string;
  /**
   * 化气
   */
  transformation: string;
  /**
   * 五行色
   */
  elementColor: string;
  /**
   * 能量色
   */
  energyColor: string;
  /**
   * 职业
   */
  occupation: string;
  /**
   * 职务
   */
  position: string;
  /**
   * 别号
   */
  alias: string;
  /**
   * 特性
   */
  characteristics: string[];
  /**
   * 星宿组合
   */
  celestialConfigurations: CelestialConfiguration[];
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
