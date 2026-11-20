"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BuyLink from "./BuyLink";
import Logo from "./Logo";

export const NAV = [
  { href: "/que-es-prunex1/", label: "Qué es" },
  { href: "/precio-prunex1-peru/", label: "Precio" },
  { href: "/ingredientes-prunex1/", label: "Ingredientes" },
  { href: "/como-preparar-prunex1/", label: "Preparación" },
  { href: "/opiniones-prunex1/", label: "Opiniones" },
  { href: "/comparativas-prunex1/", label: "Comparativas" },
];

export default function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const dark = variant === "dark" && !scrolled && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        dark ? "bg-transparent text-white" : "bg-white/80 text-fxink shadow-[0_8px_30px_-20px_rgba(0,60,100,0.4)] backdrop-blur-xl"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="Prunex1 Perú – inicio">
          <Logo dark={dark} />
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition ${dark ? "hover:bg-white/10" : "hover:bg-fxsky hover:text-fxbluedeep"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/comprar-prunex1/"
            className={`ml-1 rounded-full border px-3.5 py-2 text-[0.92rem] font-semibold transition ${
              dark ? "border-white/25 hover:bg-white/10" : "border-[var(--line)] hover:border-fxblue hover:text-fxbluedeep"
            }`}
          >
            Ficha del producto
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <BuyLink source="header" className="btn btn-buy shine !px-5 !py-2.5 text-sm">
            Comprar
          </BuyLink>
          <button
            className="grid h-10 w-10 place-items-center rounded-full xl:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="wrap grid gap-1 pb-5 xl:hidden" aria-label="Móvil" data-lenis-prevent>
          {[{ href: "/comprar-prunex1/", label: "Comprar Prunex1 (ficha y precio)" }, ...NAV].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-fxsky">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
