import React, { useEffect, useState } from 'react';
import { HelpCircle, Code2, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageContext?: string;
  schemaId?: string;
  showInspectorBadge?: boolean;
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({
  faqs,
  pageContext = 'Home',
  schemaId = 'faq-page-json-ld',
  showInspectorBadge = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const faqSchemaObject = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': typeof window !== 'undefined' ? `${window.location.href}#faq` : 'https://northridgebuildroof.com#faq',
    name: `${pageContext} Roofing FAQs`,
    description: `Frequently asked roofing, inspection, and repair questions for ${pageContext}`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  useEffect(() => {
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchemaObject, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(schemaId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [faqs, pageContext, schemaId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(faqSchemaObject, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showInspectorBadge) return null;

  return (
    <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-2 select-none">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-semibold text-white">
            Schema.org FAQPage Structured Data Active
          </span>
          <span className="text-[10px] font-mono text-[#e05d26] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {faqs.length} Google Rich Snippets Injected
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px] transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-[#e05d26]" />
          <span>{showCode ? 'Hide Schema' : 'View FAQ Schema JSON-LD'}</span>
          {showCode ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
        </button>
      </div>

      {showCode && (
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Injected into &lt;head&gt; as application/ld+json</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy JSON-LD'}</span>
            </button>
          </div>
          <pre className="p-3 bg-black/70 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-56 select-all">
            {JSON.stringify(faqSchemaObject, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
