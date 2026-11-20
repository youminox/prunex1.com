import Image from "next/image";
import Link from "next/link";
import BuyLink from "./BuyLink";
import { product } from "@/lib/content";

export default function ProductCTA({ text, source, compact = false }: { text?: string; source: string; compact?: boolean }) {
  return (
    <div className="not-prose relative my-9 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#06324d] via-[#0b1820] to-[#3d0d20] p-6 text-white sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-drink/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-fxblue/40 blur-3xl" />
      <div className={`relative grid items-center gap-5 ${compact ? "sm:grid-cols-[130px_1fr]" : "sm:grid-cols-[180px_1fr]"}`}>
        <Image
          src={product.images.hero}
          alt="Prunex1 de FuXion: doypack de 28 sticks, stick individual y taza preparada sabor guindón"
          width={compact ? 130 : 180}
          height={compact ? 127 : 175}
          sizes={compact ? "130px" : "180px"}
          className="mx-auto h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fxlime">Tienda oficial FuXion · Envíos a todo el Perú</p>
          <p className="mt-1 font-display text-xl font-extrabold leading-tight sm:text-2xl">{text || "Prunex1 original al precio de catálogo"}</p>
          <p className="mt-1.5 text-sm text-white/75">
            {product.presentation} · <strong className="text-white">{product.formattedPrice}</strong> ({product.formattedPricePerSachet} por stick)
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <BuyLink source={source} className="btn btn-lime shine !py-3">
              Comprar ahora →
            </BuyLink>
            {!compact && (
              <Link href="/comprar-prunex1/" className="btn btn-glass !py-3">
                Ver ficha completa
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
