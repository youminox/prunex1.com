"use client";

import { OPEN_CHAT_EVENT } from "@/lib/client-constants";

export default function OpenChatButton({ label = "Abrir el asesor virtual", className = "btn btn-buy" }: { label?: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))} className={className}>
      💬 {label}
    </button>
  );
}
