import { Tabs as ShadcnTabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <ShadcnTabs defaultValue="0" className="my-6">
      <TabsList>
        {items.map((item, i) => (
          <TabsTrigger key={item} value={String(i)} className="font-mono text-xs">
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {childArray.map((child, i) => (
        <TabsContent key={i} value={String(i)} className="mt-2">
          {child}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
