import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import ClientEffects from "./ClientEffects";
import LegalNotice from "./LegalNotice";

export default function SimplePage({
  title,
  crumb,
  href,
  intro,
  children,
}: {
  title: string;
  crumb: string;
  href: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <section className="relative overflow-hidden bg-gradient-to-b from-fxsky to-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-prune/10 blur-3xl" />
          <div className="wrap relative max-w-3xl pb-8 pt-10">
            <Breadcrumbs items={[{ name: crumb, href }]} />
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">{title}</h1>
            {intro && <p className="mt-4 text-lg text-[var(--muted)]">{intro}</p>}
          </div>
        </section>
        <div className="wrap max-w-3xl pb-10">
          <div className="prose-fx">{children}</div>
          <LegalNotice />
        </div>
      </main>
      <Footer />
      <ClientEffects stickyBar={false} />
    </>
  );
}
