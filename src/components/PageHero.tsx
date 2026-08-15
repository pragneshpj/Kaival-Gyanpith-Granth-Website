import { Flourish } from "./Icons";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-gold/30 bg-[linear-gradient(180deg,#fff6e4,transparent)] py-14 text-center">
      <Flourish className="mx-auto mb-4 h-5 w-40" />
      <h1 className="text-3xl font-bold text-maroon md:text-4xl">{title}</h1>
      {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-muted">{subtitle}</p> : null}
    </section>
  );
}
