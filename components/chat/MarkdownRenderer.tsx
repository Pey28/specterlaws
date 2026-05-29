"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-white/70">{children}</em>
        ),
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-white mt-5 mb-2 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold text-white mt-4 mb-2 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-white mt-3 mb-1.5 first:mt-0">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="mb-3 space-y-1 list-none">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 space-y-1 list-decimal list-inside">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex gap-2 text-sm leading-relaxed">
            <span className="text-white/30 shrink-0 mt-0.5">•</span>
            <span>{children}</span>
          </li>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <code className="block bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-xs font-mono text-white/80 my-3 overflow-x-auto whitespace-pre">
                {children}
              </code>
            );
          }
          return (
            <code className="bg-[#252525] border border-white/10 rounded px-1.5 py-0.5 text-xs font-mono text-white/80">
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-white/20 pl-4 my-3 text-white/60 italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-white/10 my-4" />,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/70 underline hover:text-white transition-colors">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
