import type { ComponentType } from "react";
import CodeBlock from "./CodeBlock";

export const mdxComponents: Record<string, ComponentType<Record<string, unknown>>> = {
  pre: CodeBlock,
  img: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} className="rounded-lg" loading="lazy" alt={(props.alt as string) ?? ""} />
  ),
  a: (props: Record<string, unknown>) => {
    const href = props.href as string | undefined;
    const isExternal = href?.startsWith("http");
    return (
      <a
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
      />
    );
  },
};
