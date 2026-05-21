import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ReasonTextProps = {
  children: string;
};

export function ReasonText({ children }: ReasonTextProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="text-sm leading-6 text-[var(--tt-soft)]">{children}</p>,
        ol: ({ children }) => <ol className="ml-5 list-decimal space-y-2 text-sm leading-6 text-[var(--tt-soft)]">{children}</ol>,
        ul: ({ children }) => <ul className="ml-5 list-disc space-y-2 text-sm leading-6 text-[var(--tt-soft)]">{children}</ul>,
        strong: ({ children }) => <strong className="font-semibold text-[var(--tt-ink)]">{children}</strong>,
        em: ({ children }) => <em className="text-[var(--tt-ink)]">{children}</em>,
        code: ({ children }) => (
          <code className="rounded bg-[color-mix(in_oklab,var(--tt-ink)_8%,transparent)] px-1.5 py-0.5 text-[13px] text-[var(--tt-ink)]">{children}</code>
        ),
      }}
    >
      {formatReasonMarkdown(children)}
    </ReactMarkdown>
  );
}

function formatReasonMarkdown(text: string) {
  return text
    .replace(/\s+Factors contributing/g, "\n\nFactors contributing")
    .replace(/\s+(\d+)\.\s+\*\*/g, "\n\n$1. **")
    .trim();
}
