"use client";

import { useRef, useState, useCallback } from "react";

export default function CodeBlock(props: Record<string, unknown>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = ref.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 cursor-pointer rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-3 opacity-0 transition-all hover:border-accent hover:text-accent group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}
