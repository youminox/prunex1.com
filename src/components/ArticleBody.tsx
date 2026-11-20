import type { Block } from "@/lib/content";
import Inline, { slugify } from "./Inline";
import ProductCTA from "./ProductCTA";

const CALLOUT: Record<string, { label: string; cls: string; icon: string }> = {
  etiqueta: { label: "Según la etiqueta", cls: "border-fxblue/30 bg-fxsky", icon: "🏷" },
  fabricante: { label: "Lo que comunica el fabricante (afirmación comercial)", cls: "border-amber-300/60 bg-amber-50", icon: "📣" },
  aviso: { label: "Aviso de salud", cls: "border-rose-300/60 bg-rose-50", icon: "⚕" },
  tip: { label: "Consejo práctico", cls: "border-fxlime/50 bg-fxcream/60", icon: "✦" },
};

export default function ArticleBody({ blocks, source }: { blocks: Block[]; source: string }) {
  return (
    <div className="prose-fx">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} source={source} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                <Inline text={b.text} source={source} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Inline text={b.text} source={source} />
              </h3>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} source={source} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} source={source} />
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="my-7 overflow-x-auto rounded-2xl border border-[var(--line)]">
                <table>
                  <thead>
                    <tr>
                      {b.headers.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <Inline text={String(c)} source={source} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {b.caption && <figcaption className="px-4 py-2 text-xs text-[var(--muted)]">{b.caption}</figcaption>}
              </figure>
            );
          case "callout": {
            const c = CALLOUT[b.variant] || CALLOUT.tip;
            return (
              <aside key={i} className={`my-7 rounded-2xl border p-5 ${c.cls}`}>
                <p className="!mb-1 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  <span aria-hidden>{c.icon}</span> {c.label}
                </p>
                {b.title && <p className="!mb-1 font-display text-lg font-bold text-fxink">{b.title}</p>}
                <p className="!mb-0">
                  <Inline text={b.text} source={source} />
                </p>
              </aside>
            );
          }
          case "steps":
            return (
              <ol key={i} className="!gap-4">
                {b.items.map((s, j) => (
                  <li key={j}>
                    <strong>{s.name}.</strong> <Inline text={s.text} source={source} />
                  </li>
                ))}
              </ol>
            );
          case "cta":
            return <ProductCTA key={i} text={b.text} source={`${source}-mid-${i}`} compact />;
          default:
            return null;
        }
      })}
    </div>
  );
}
