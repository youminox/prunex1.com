"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CHAT_ENDPOINT_PUBLIC, OPEN_CHAT_EVENT, PRICE, SHOP, getVisitor, trackClick } from "@/lib/client-constants";

type Msg = { id: string; role: "user" | "assistant"; content: string; options?: string[] };

const K_MSG = "px_chat_messages";
const K_SESS = "px_chat_session";
const K_TEASER = "px_teaser";
const QUICK = ["¿Cuánto cuesta?", "¿Cómo se prepara?", "¿Qué ingredientes tiene?", "¿Tiene azúcar?"];

const visitor = getVisitor;
let idSeq = 0;
const makeId = (p: string) => `${p}${Date.now().toString(36)}${(idSeq++).toString(36)}`;

function track(sessionId: string | null, source = "chat") {
  trackClick(source, { session_id: sessionId });
}

function Rich({ text, sessionId }: { text: string; sessionId: string | null }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        if (!line.trim()) return <div key={li} className="h-2" />;
        const parts = line.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*)/g);
        const bullet = /^\s*[-•]\s+/.test(line);
        return (
          <p key={li} className={`mb-1.5 leading-relaxed last:mb-0 ${bullet ? "pl-3" : ""}`}>
            {parts.map((p, i) => {
              const l = p.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
              if (l) {
                const isShop = l[2].startsWith("https://carlos-lingan.site.fuxion.com");
                return (
                  <a
                    key={i}
                    href={l[2]}
                    target={isShop ? "_blank" : undefined}
                    rel={isShop ? "sponsored noopener" : undefined}
                    onClick={() => isShop && track(sessionId)}
                    className="font-bold text-[#007CBC] underline decoration-[#8CC63F] decoration-2 underline-offset-2"
                  >
                    {l[1]}
                    {isShop ? " ↗" : ""}
                  </a>
                );
              }
              const b = p.match(/^\*\*([^*]+)\*\*$/);
              if (b) return <strong key={i}>{b[1]}</strong>;
              return <span key={i}>{bullet && i === 0 ? p.replace(/^\s*[-•]\s+/, "• ") : p}</span>;
            })}
          </p>
        );
      })}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [welcome, setWelcome] = useState("¡Hola! 👋 Soy el asesor virtual de Prunex1. Pregúntame por el precio, la preparación según la etiqueta o sus ingredientes.");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const restore = requestAnimationFrame(() => {
      try {
        const m = localStorage.getItem(K_MSG);
        const s = localStorage.getItem(K_SESS);
        if (m) setMsgs(JSON.parse(m));
        if (s) setSessionId(s);
      } catch {
        /* noop */
      }
    });
    let t: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!sessionStorage.getItem(K_TEASER)) {
        t = setTimeout(() => {
          setTeaser(true);
          sessionStorage.setItem(K_TEASER, "1");
          t2 = setTimeout(() => setTeaser(false), 8000);
        }, 12000);
      }
    } catch {
      /* noop */
    }
    const openEv = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, openEv);
    return () => {
      cancelAnimationFrame(restore);
      if (t) clearTimeout(t);
      if (t2) clearTimeout(t2);
      window.removeEventListener(OPEN_CHAT_EVENT, openEv);
    };
  }, []);

  useEffect(() => {
    if (!open || loaded.current) return;
    loaded.current = true;
    fetch(CHAT_ENDPOINT_PUBLIC)
      .then((r) => r.json())
      .then((c) => {
        if (c.is_enabled === false) setEnabled(false);
        if (c.welcome_message) setWelcome(c.welcome_message);
      })
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading, open]);

  const persist = (m: Msg[], s: string | null) => {
    setMsgs(m);
    if (s) setSessionId(s);
    try {
      localStorage.setItem(K_MSG, JSON.stringify(m.slice(-30)));
      if (s) localStorage.setItem(K_SESS, s);
    } catch {
      /* noop */
    }
  };

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    setInput("");
    const withUser: Msg[] = [...msgs, { id: makeId("u"), role: "user", content: t }];
    persist(withUser, sessionId);
    setLoading(true);
    try {
      const r = await fetch(CHAT_ENDPOINT_PUBLIC, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          message: t,
          session_id: sessionId,
          visitor_id: visitor(),
          page_url: location.href,
          history: withUser.slice(-9, -1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const d = await r.json();
      persist([...withUser, { id: makeId("a"), role: "assistant", content: d.reply, options: d.suggested_options || [] }], d.session_id || sessionId);
    } catch {
      persist(
        [...withUser, { id: makeId("e"), role: "assistant", content: `Hubo una demora en la conexión. Puedes comprar Prunex1 en la [tienda oficial FuXion](${SHOP}).`, options: ["Intentar de nuevo"] }],
        sessionId
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMsgs([]);
    setSessionId(null);
    try {
      localStorage.removeItem(K_MSG);
      localStorage.removeItem(K_SESS);
    } catch {
      /* noop */
    }
  };

  if (!enabled) return null;
  const last = msgs[msgs.length - 1];

  return (
    <div className="fixed bottom-[92px] right-4 z-50 flex flex-col items-end md:bottom-6 md:right-6">
      {open && (
        <div role="dialog" aria-label="Asesor virtual Prunex1" className="mb-3 flex h-[580px] max-h-[78vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-[#D7E4EC] bg-white shadow-2xl sm:w-[400px]">
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3.5 text-white" style={{ background: "linear-gradient(135deg,#0093DD 0%,#7A1F3D 100%)" }}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-xl" aria-hidden>
                ☕
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#3b4d8a] bg-[#8CC63F]" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-extrabold leading-tight">Asesor Prunex1</p>
                <p className="text-xs text-white/80">Responde al instante · IA</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {msgs.length > 0 && (
                <button onClick={reset} className="rounded-full px-2 py-1 text-xs text-white/85 hover:bg-white/15" aria-label="Nueva conversación">
                  Reiniciar
                </button>
              )}
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15" aria-label="Cerrar chat">
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#F6FAFC] p-4 text-[14px] text-[#12232E]" data-lenis-prevent>
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#E3EEF4] bg-white px-3.5 py-2.5 shadow-sm">
              <Rich text={welcome} sessionId={sessionId} />
            </div>
            {msgs.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)} className="rounded-full border border-[#0093DD]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#007CBC] hover:bg-[#EDF7FD]">
                    {q}
                  </button>
                ))}
                <a
                  href={SHOP}
                  target="_blank"
                  rel="sponsored noopener"
                  onClick={() => track(sessionId, "chat-chip")}
                  className="rounded-full border border-[#8CC63F] bg-[#EFFBC4] px-3 py-1.5 text-xs font-bold text-[#2c4a0b] hover:bg-[#e3f5a8]"
                >
                  Comprar Prunex1 ↗
                </a>
              </div>
            )}
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    m.role === "user" ? "rounded-tr-sm bg-[#0093DD] text-white" : "rounded-tl-sm border border-[#E3EEF4] bg-white"
                  }`}
                >
                  {m.role === "user" ? m.content : <Rich text={m.content} sessionId={sessionId} />}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 px-2" aria-label="Escribiendo">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-[#8CC63F]" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
            {!loading && last?.role === "assistant" && last.options && last.options.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {last.options.map((o) => (
                  <button key={o} onClick={() => send(o)} className="rounded-full border border-[#0093DD]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#007CBC] hover:bg-[#EDF7FD]">
                    {o}
                  </button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>
          <a
            href={SHOP}
            target="_blank"
            rel="sponsored noopener"
            onClick={() => track(sessionId, "chat-banner")}
            className="shrink-0 bg-[#EFFBC4] px-4 py-2 text-center text-xs font-bold text-[#2c4a0b] hover:bg-[#e3f5a8]"
          >
            🛒 Comprar Prunex1 en la tienda oficial · {PRICE}
          </a>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 gap-2 border-t border-[#E3EEF4] bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              maxLength={500}
              className="min-w-0 flex-1 rounded-full border border-[#D7E4EC] px-4 py-2.5 text-sm outline-none focus:border-[#0093DD]"
              aria-label="Tu mensaje"
            />
            <button disabled={loading || !input.trim()} className="grid h-10 w-10 place-items-center rounded-full bg-[#0093DD] text-white disabled:opacity-40" aria-label="Enviar">
              ➤
            </button>
          </form>
          <p className="shrink-0 bg-white px-4 pb-2 text-center text-[10px] text-[#5A6B78]">Información orientativa. No reemplaza la consulta con un profesional de salud.</p>
        </div>
      )}
      {!open && teaser && (
        <button onClick={() => setOpen(true)} className="mb-3 max-w-[240px] rounded-2xl rounded-br-sm border border-[#D7E4EC] bg-white px-4 py-3 text-left text-sm shadow-xl">
          <span className="font-bold text-[#12232E]">¿Dudas con Prunex1?</span>
          <span className="block text-[#5A6B78]">Pregúntame cuánto cuesta o cómo se prepara.</span>
        </button>
      )}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setTeaser(false);
        }}
        className="relative grid h-14 w-14 place-items-center rounded-full text-2xl text-white shadow-[0_14px_30px_-10px_rgba(122,31,61,0.8)] transition hover:scale-105"
        style={{ background: "linear-gradient(135deg,#0093DD,#7A1F3D)" }}
        aria-label={open ? "Cerrar asesor" : "Abrir asesor virtual"}
      >
        {open ? "✕" : "💬"}
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#0093DD]/40" />}
      </button>
    </div>
  );
}
