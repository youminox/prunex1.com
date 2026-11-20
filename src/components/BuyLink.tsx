"use client";

import { SHOP, trackClick } from "@/lib/client-constants";

type Props = {
  source: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  magnetic?: boolean;
};

/** Enlace de compra a la tienda oficial FuXion del distribuidor. Cada ubicación usa un `source` único. */
export default function BuyLink({ source, className = "btn btn-buy shine", children, ariaLabel, magnetic = false }: Props) {
  return (
    <a
      href={SHOP}
      target="_blank"
      rel="sponsored noopener"
      className={className}
      aria-label={ariaLabel}
      data-magnetic={magnetic ? "" : undefined}
      data-source={source}
      onClick={() => trackClick(source)}
    >
      {children}
    </a>
  );
}
