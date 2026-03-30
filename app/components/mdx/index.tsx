import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Tabs, Tab } from "./Tabs";
import { Collapsible } from "./Collapsible";
import { FileTree } from "./FileTree";
import { Steps, Step } from "./Steps";

export const mdxComponents = {
  CodeBlock,
  Callout,
  Tabs,
  Tab,
  Collapsible,
  FileTree,
  Steps,
  Step,
  pre: (props: React.ComponentProps<"pre">) => <CodeBlock>{props.children}</CodeBlock>,
};
