import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL, OG_DEFAULT, organizationLd, personLd } from "@/lib/content";
import ChatWidget from "@/components/ChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["500", "600", "700", "800"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Prunex1 de FuXion Perú: qué es, precio y cómo se prepara", template: "%s" },
  description:
    "Todo sobre Prunex1 de FuXion en Perú según su etiqueta: bebida instantánea de fibras y extractos vegetales sabor guindón, ingredientes, preparación, precio S/ 76.00 y compra en la tienda oficial.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [{ url: OG_DEFAULT(), width: 1200, height: 675, alt: "Prunex1 de FuXion: taza caliente sabor guindón" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: { google: "yiX9xpZK7w8QUmwa8tUklptWr7dH-hE37F4xH_DrKbA" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0093DD", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#8CC63F] selection:text-[#12232E]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: "es-PE", publisher: { "@id": `${SITE_URL}/#org` } },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <ChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
