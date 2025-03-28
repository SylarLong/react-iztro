import {
  markdownLineEnding,
  markdownLineEndingOrSpace,
} from "micromark-util-character";
import { codes } from "micromark-util-symbol";
import { Extension, State, Tokenizer } from "micromark-util-types";

const aliasDivider = "|";
const aliasMarker = aliasDivider;
const startMarker = "[[";
const endMarker = "]]";

const tokenizeWikilink: Tokenizer = function (effects, ok, nok) {
  let data = false;
  let alias = false;

  let aliasCursor = 0;
  let startMarkerCursor = 0;
  let endMarkerCursor = 0;

  const start: State = function (code) {
    if (code !== startMarker.charCodeAt(startMarkerCursor)) {
      return nok(code);
    }

    effects.enter("wikilink");
    effects.enter("wikilinkMarker");

    return consumeStart(code);
  };

  const consumeStart: State = function (code) {
    if (startMarkerCursor === startMarker.length) {
      effects.exit("wikilinkMarker");
      return consumeData(code);
    }

    if (code !== startMarker.charCodeAt(startMarkerCursor)) {
      return nok(code);
    }

    effects.consume(code);
    startMarkerCursor++;

    return consumeStart;
  };

  const consumeData: State = function (code) {
    if (markdownLineEnding(code) || code === codes.eof) {
      return nok(code);
    }

    effects.enter("wikilinkData");
    effects.enter("wikilinkTarget");
    return consumeTarget(code);
  };

  const consumeTarget: State = function (code) {
    if (code === aliasMarker.charCodeAt(aliasCursor)) {
      if (!data) {
        return nok(code);
      }
      effects.exit("wikilinkTarget");
      effects.enter("wikilinkAliasMarker");
      return consumeAliasMarker(code);
    }

    if (code === endMarker.charCodeAt(endMarkerCursor)) {
      if (!data) {
        return nok(code);
      }
      effects.exit("wikilinkTarget");
      effects.exit("wikilinkData");
      effects.enter("wikilinkMarker");
      return consumeEnd(code);
    }

    if (markdownLineEnding(code) || code === codes.eof) {
      return nok(code);
    }

    if (!markdownLineEndingOrSpace(code)) {
      data = true;
    }

    effects.consume(code);

    return consumeTarget;
  };

  const consumeAliasMarker: State = function (code) {
    if (aliasCursor === aliasMarker.length) {
      effects.exit("wikilinkAliasMarker");
      effects.enter("wikilinkAlias");
      return consumeAlias(code);
    }

    if (code !== aliasMarker.charCodeAt(aliasCursor)) {
      return nok(code);
    }

    effects.consume(code);
    aliasCursor++;

    return consumeAliasMarker;
  };

  const consumeAlias: State = function (code) {
    if (code === endMarker.charCodeAt(endMarkerCursor)) {
      if (!alias) {
        return nok(code);
      }
      effects.exit("wikilinkAlias");
      effects.exit("wikilinkData");
      effects.enter("wikilinkMarker");
      return consumeEnd(code);
    }

    if (markdownLineEnding(code) || code === codes.eof) {
      return nok(code);
    }

    if (!markdownLineEndingOrSpace(code)) {
      alias = true;
    }

    effects.consume(code);

    return consumeAlias;
  };

  const consumeEnd: State = function (code) {
    if (endMarkerCursor === endMarker.length) {
      effects.exit("wikilinkMarker");
      effects.exit("wikilink");
      return ok(code);
    }

    if (code !== endMarker.charCodeAt(endMarkerCursor)) {
      return nok(code);
    }

    effects.consume(code);
    endMarkerCursor++;

    return consumeEnd;
  };

  return start;
};

const wikilinkTokenizer = {
  name: "wikilinkTokenizer",
  tokenize: tokenizeWikilink,
};

export const syntax = (): Extension => {
  return {
    text: { [codes.leftSquareBracket]: wikilinkTokenizer },
  };
};
