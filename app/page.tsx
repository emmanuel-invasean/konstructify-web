import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="w-full bg-[var(--deep-navy)] text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded bg-white/10">
              <span className="sr-only">Konstructify</span>
              <span aria-hidden className="font-semibold text-white">
                K
              </span>
            </div>
            <span className="font-display text-lg tracking-wide">
              Konstructify
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a className="underline-offset-4 hover:underline" href="#features">
              Features
            </a>
            <a className="underline-offset-4 hover:underline" href="#solutions">
              Solutions
            </a>
            <a className="underline-offset-4 hover:underline" href="#pricing">
              Pricing
            </a>
            <a className="underline-offset-4 hover:underline" href="#faq">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn-secondary-inverse" href="/sign-in">
              Sign in
            </a>
            <a className="btn-primary" href="#cta">
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[var(--deep-navy)] text-white">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              Build smarter. Deliver faster.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              Konstructify is the modern platform for construction planning,
              field tracking, and real-time reporting. Keep every stakeholder
              aligned from bid to handover.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary text-center" href="#pricing">
                Start free trial
              </a>
              <a className="btn-secondary-inverse text-center" href="#features">
                See features
              </a>
            </div>
            <div className="mt-6 text-xs text-white/70 md:text-sm">
              No credit card required. 14-day free trial.
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-lg md:h-96">
            <Image
              src="/window.svg"
              alt="Dashboard preview"
              fill
              className="object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Logos / social proof */}
      <section className="bg-[var(--concrete-gray)]">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10 text-center md:py-12">
          <p className="text-sm text-[var(--charcoal)]/70">
            Trusted by teams building the world around us
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
            <Image
              src="/vercel.svg"
              alt=""
              width={80}
              height={20}
              className="mx-auto"
            />
            <Image
              src="/next.svg"
              alt=""
              width={100}
              height={24}
              className="mx-auto"
            />
            <Image
              src="/globe.svg"
              alt=""
              width={24}
              height={24}
              className="mx-auto"
            />
            <Image
              src="/window.svg"
              alt=""
              width={24}
              height={24}
              className="mx-auto"
            />
            <Image
              src="/file.svg"
              alt=""
              width={24}
              height={24}
              className="mx-auto"
            />
            <Image
              src="/vercel.svg"
              alt=""
              width={80}
              height={20}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight text-[var(--deep-navy)] md:text-5xl">
              Everything you need to keep projects on track
            </h2>
            <p className="mt-4 text-[var(--charcoal)]/80">
              Plan, schedule, and track progress with clarity. Centralize RFIs,
              change orders, inspections, and field reporting.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Project planning",
                desc: "Milestones, dependencies, and baseline schedules.",
              },
              {
                title: "Field tracking",
                desc: "Daily logs, timecards, equipment utilization.",
              },
              {
                title: "Quality & safety",
                desc: "Punch lists, inspections, incident reporting.",
              },
              {
                title: "Docs & RFIs",
                desc: "Submittals, RFIs, and change management in one place.",
              },
              {
                title: "Dashboards",
                desc: "KPIs across cost, schedule, and quality with clarity.",
              },
              {
                title: "Integrations",
                desc: "Connect to Procore, Autodesk, ERPs, and more.",
              },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded bg-[var(--deep-navy)] text-white">
                  <span aria-hidden>★</span>
                </div>
                <h3 className="font-display text-xl text-[var(--charcoal)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--charcoal)]/80">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution band */}
      <section id="solutions" className="bg-[var(--concrete-gray)]">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="font-display text-3xl text-[var(--deep-navy)] md:text-4xl">
              For the field and the office
            </h2>
            <ul className="mt-6 space-y-3 text-[var(--charcoal)]/80">
              <li>• Superintendents capture daily progress with ease</li>
              <li>• PMs track RFIs, submittals, and change orders</li>
              <li>• Executives get portfolio-level KPIs in real time</li>
            </ul>
            <div className="mt-8">
              <a className="btn-primary" href="#cta">
                Request a demo
              </a>
            </div>
          </div>
          <div className="card overflow-hidden rounded-lg bg-white p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded border border-black/5 p-4">
                <div className="font-semibold text-[var(--emerald)]">
                  On-time tasks
                </div>
                <div className="font-display mt-2 text-3xl">96%</div>
              </div>
              <div className="rounded border border-black/5 p-4">
                <div className="font-semibold text-[var(--deep-navy)]">
                  RFIs closed
                </div>
                <div className="font-display mt-2 text-3xl">142</div>
              </div>
              <div className="rounded border border-black/5 p-4">
                <div className="font-semibold text-[var(--signal-orange)]">
                  Open issues
                </div>
                <div className="font-display mt-2 text-3xl text-[var(--signal-orange)]">
                  12
                </div>
              </div>
              <div className="rounded border border-black/5 p-4">
                <div className="font-semibold text-[var(--charcoal)]">
                  Avg. cycle time
                </div>
                <div className="font-display mt-2 text-3xl">2.1d</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <h2 className="font-display text-3xl text-[var(--deep-navy)] md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-[var(--charcoal)]/80">
            Start free, upgrade when your team is ready.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                desc: "For small crews getting started.",
              },
              {
                name: "Team",
                price: "$19",
                desc: "Per user/month, billed annually.",
              },
              {
                name: "Business",
                price: "$39",
                desc: "Advanced controls and support.",
              },
            ].map((p) => (
              <div key={p.name} className="card flex flex-col p-6">
                <h3 className="font-display text-xl text-[var(--charcoal)]">
                  {p.name}
                </h3>
                <div className="font-display mt-2 text-3xl text-[var(--deep-navy)]">
                  {p.price}
                </div>
                <p className="mt-2 text-sm text-[var(--charcoal)]/80">
                  {p.desc}
                </p>
                <div className="mt-6">
                  <a
                    className="btn-primary inline-block w-full text-center"
                    href="#cta"
                  >
                    Choose plan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[var(--concrete-gray)]">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <h2 className="font-display text-3xl text-[var(--deep-navy)] md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                q: "Is there a free trial?",
                a: "Yes, 14 days. No credit card required.",
              },
              {
                q: "Can we use Konstructify on site?",
                a: "Yes, works great on mobile and tablet.",
              },
              {
                q: "Do you offer SSO?",
                a: "SSO is available on Business plan and above.",
              },
              {
                q: "What integrations are available?",
                a: "Connect to Procore, Autodesk, ERPs, and more.",
              },
            ].map((item) => (
              <div key={item.q} className="card p-6">
                <div className="font-semibold text-[var(--charcoal)]">
                  {item.q}
                </div>
                <div className="mt-2 text-sm text-[var(--charcoal)]/80">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--deep-navy)] text-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:py-12">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded bg-white/10">
              <span aria-hidden className="font-semibold text-white">
                K
              </span>
            </div>
            <span className="font-display text-lg tracking-wide">
              Konstructify
            </span>
          </div>
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} Konstructify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
