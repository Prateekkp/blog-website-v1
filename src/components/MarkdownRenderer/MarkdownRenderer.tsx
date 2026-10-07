import React from 'react';

export interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split into blocks by double line-breaks, respecting code blocks
  const blocks = content.split(/\n\n+/);

  return (
    <div>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Code blocks: ```lang ... ```
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const codeContent = lines.slice(1, -1).join('\n');
          return (
            <pre key={idx}>
              <code>{codeContent}</code>
            </pre>
          );
        }

        // Heading 3: ### ...
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx}>{trimmed.replace(/^###\s+/, '')}</h3>;
        }

        // Heading 2: ## ...
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx}>{trimmed.replace(/^##\s+/, '')}</h2>;
        }

        // Numbered list: 1. ... \n 2. ...
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(Boolean);
          return (
            <ol key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s+/, '')}</li>
              ))}
            </ol>
          );
        }

        // Bullet list: - ... \n - ...
        if (/^-\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(Boolean);
          return (
            <ul key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^-\s+/, '')}</li>
              ))}
            </ul>
          );
        }

        // Standard paragraph with simple bold/code inline replacements
        const parts = trimmed.split(/(\*\*.*?\*\*|`.*?`)/g);

        return (
          <p key={idx}>
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={pIdx}>{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;
