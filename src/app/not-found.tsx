import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyLink from "@/components/BuyLink";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap grid min-h-[70vh] place-items-center pt-[68px] text-center">
        <div>
          <p className="text-gradient font-display text-8xl font-extrabold">404</p>
          <h1 className="mt-2 text-3xl font-extrabold">Esta taza está vacía</h1>
          <p className="mt-3 text-[var(--muted)]">La página que buscas no existe o cambió de dirección.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-ghost">
              Volver al inicio
            </Link>
            <Link href="/como-preparar-prunex1/" className="btn btn-ghost">
              Cómo preparar Prunex1
            </Link>
            <Link href="/comprar-prunex1/" className="btn btn-ghost">
              Ficha del producto
            </Link>
            <BuyLink source="404">Comprar Prunex1</BuyLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
