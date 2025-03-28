import { Root, Element } from "hast";
import { toText } from "hast-util-to-text";

const truncateHast = (hast: Root, headings: string[]) => {
  if (headings.length <= 0) {
    return;
  }

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const begin = hast.children.findIndex(
      (child) => child.type === "element" && toText(child) === heading
    );

    if (begin == -1) {
      return;
    }

    const end = hast.children.findIndex(
      (child, index) =>
        child.type === "element" &&
        child.tagName === (hast.children[begin] as Element).tagName &&
        index > begin
    );

    hast.children = hast.children.slice(
      begin,
      end === -1 ? hast.children.length : end
    );
  }
};

export default function rehypePart({ headings = [] }: { headings: string[] }) {
  return function (tree: Root) {
    if (!headings || headings.length < 1) {
      return;
    }

    truncateHast(tree, headings);
  };
}
