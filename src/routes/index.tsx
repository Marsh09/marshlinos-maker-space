import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircuitBoard,
  Cpu,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Radio,
  ArrowRight,
  Send,
  Layers,
  Code2,
  Gauge,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import portraitAsset from "@/assets/marshlino-portrait.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marshlino Nader — Computer Engineering Portfolio" },
      {
        name: "description",
        content:
          "Second-year Computer Engineering student at Pharos University, Alexandria — building embedded systems, digital circuits, and software that solve real-world problems.",
      },
    ],
  }),
  component: Index,
});

const GITHUB = "https://github.com/Marsh09";
const LINKEDIN =
  "https://www.linkedin.com/in/marshlino-nader-954794363";
const EMAIL = "marshlino6@gmail.com";
const PHONE = "01283977016";
const PHONE_INTL = "+201283977016";

/* ---------- data ---------- */

const PROJECTS = [
  {
    index: "01",
    title: "SOS Safety Device",
    blurb:
      "Arduino-based emergency unit that sends automated distress alerts. A SIM800L GSM module texts location, a Neo-6M GPS module supplies coordinates, and an ultrasonic sensor plus buzzer handle triggering and local alarm.",
    details: [
      "Built around an Arduino Uno, the device continuously polls an ultrasonic sensor to detect a distress trigger. On activation, the SIM800L dials a pre-set contact and sends an SMS carrying live GPS coordinates parsed from the Neo-6M NMEA sentence stream, while the buzzer fires a loud local alarm.",
      "The hardest parts were power management for the GSM burst current, AT-command handshaking with the SIM800L, and waiting reliably for a GPS fix before sending coordinates. I worked through each with a mix of hardware filtering and state-machine code.",
    ],
    tags: ["Arduino", "SIM800L", "Neo-6M GPS", "Ultrasonic", "Embedded C"],
    icon: Radio,
  },
  {
    index: "02",
    title: "Interactive Parking Counter",
    blurb:
      "A digital-systems build that counts cars in and out of a lot. JK flip-flops (74LS76) hold state, TCRT5000 IR sensors detect entry/exit, a 74LS47 BCD decoder drives the 7-segment display.",
    details: [
      "Designed the full logic on paper, then wired it on a breadboard. Two TCRT5000 IR sensor pairs sit at the entry and exit; each car crossing a beam clocks the 74LS76 JK flip-flop pair configured as an up/down counter — one direction increments, the other decrements.",
      "The counter's BCD output feeds a 74LS47 decoder that drives common-anode 7-segment displays. Getting clean, bounce-free counts meant tuning the IR thresholds and adding hardware debouncing so a single car never read as two.",
    ],
    tags: ["74LS76", "TCRT5000", "74LS47", "7-Segment", "Digital Logic"],
    icon: CircuitBoard,
  },
  {
    index: "03",
    title: "Infix-to-Postfix Converter",
    blurb:
      "A C program that transforms infix expressions into postfix notation using a stack. Built to ground my understanding of data structures beyond the textbook — operator precedence, associativity, and traversal.",
    details: [
      "A pure C implementation: read an infix expression character by character, emit operands immediately, and push operators onto a stack while respecting precedence and associativity. Parentheses and multi-digit numbers are handled, and the result is a clean postfix string.",
      "I also added an optional evaluation step that walks the postfix expression with a value stack. Building it made operator precedence and stack mechanics click far more than the lecture notes ever did.",
    ],
    tags: ["C", "Stacks", "Data Structures", "Algorithms"],
    icon: Code2,
  },
  {
    index: "04",
    title: "Supermarket Sales Data Analysis",
    blurb:
      "Python/Pandas pipeline over a retail dataset: data cleaning, profiling, and business-question analysis. Turned messy rows into answers about best-selling lines, peak periods, and branch performance.",
    details: [
      "Loaded a real retail dataset into Pandas, cleaned missing and malformed values, set correct dtypes, and engineered a couple of helper columns. Then profiled distributions and outliers to sanity-check the data before drawing conclusions.",
      "Finally I answered the business questions: top-selling product lines, peak transaction hours, branch-vs-branch performance, and the payment-method mix. Results were presented with matplotlib charts so the numbers were easy to read at a glance.",
    ],
    tags: ["Python", "Pandas", "Data Cleaning", "EDA"],
    icon: BarChart3,
  },
] as const;

const OPTIONAL_PROJECTS = [
  "Bluetooth-Controlled Smart Agricultural Rover",
  "Fire Detection & Alert System",
  "Smart Blind Stick",
] as const;

const SKILL_GROUPS = [
  {
    label: "Languages",
    icon: Code2,
    items: ["C", "Python", "Embedded C"],
  },
  {
    label: "Embedded & Hardware",
    icon: Cpu,
    items: ["Arduino", "Circuit Design", "Sensors & Modules", "Digital Logic"],
  },
  {
    label: "Tools & Data",
    icon: Layers,
    items: ["Pandas", "Data Analysis", "Git & GitHub", "Proteus / Simulation"],
  },
] as const;

const COURSEWORK = [
  "Digital Systems",
  "Electronics",
  "Data Structures",
  "Linear Algebra",
  "Probability",
] as const;

/* ---------- small components ---------- */

function Reveal({
  children,
  className = "",
  delay = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "" | "reveal-delay-1" | "reveal-delay-2" | "reveal-delay-3" | "reveal-delay-4";
  as?: "div" | "section" | "li" | "article";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${delay} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

function SectionLabel({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-signal">{index}</span>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>
      {children ? (
        <p className="max-w-sm text-sm text-muted-foreground">{children}</p>
      ) : null}
    </div>
  );
}

/* ---------- page ---------- */

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-copper/8 blur-[150px]" />
      </div>

      <Nav />

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-signal/40 bg-signal/10 font-mono text-xs font-semibold text-signal">
            MN
          </span>
          <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            marshlino.nader
          </span>
        </a>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github className="h-4.5 w-4.5" size={18} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Linkedin className="h-4.5 w-4.5" size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* text */}
        <div>
          <Reveal className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-signal" />
            Computer Engineering · Year 2
          </Reveal>

          <Reveal delay="reveal-delay-1" className="mt-6">
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Marshlino
              <br />
              Nader
            </h1>
          </Reveal>

          <Reveal delay="reveal-delay-2" className="mt-6 max-w-xl">
            <p className="font-display text-xl font-medium leading-snug text-foreground sm:text-2xl">
              Where hardware meets code —{" "}
              <span className="text-signal text-glow">
                building embedded systems
              </span>{" "}
              that solve real-world problems.
            </p>
          </Reveal>

          <Reveal delay="reveal-delay-3" className="mt-5 max-w-lg">
            <p className="text-base leading-relaxed text-muted-foreground">
              Second-year Computer Engineering student at Pharos University,
              Alexandria. I turn breadboards, microcontrollers, and code into
              devices that work in the field — from distress beacons to
              parking counters.
            </p>
          </Reveal>

          <Reveal delay="reveal-delay-4" className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-mono text-sm font-medium text-signal-foreground transition-all hover:signal-ring"
            >
              View Projects
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-3 font-mono text-sm font-medium text-foreground transition-colors hover:border-signal/40 hover:bg-accent"
            >
              Get in touch
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay="reveal-delay-4" className="mt-10 flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-signal/70" /> Alexandria, EG
            </span>
            <span className="h-3 w-px bg-border" />
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              github.com/Marsh09
            </a>
          </Reveal>
        </div>

        {/* portrait */}
        <Reveal delay="reveal-delay-2" className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative">
            {/* circuit frame accents */}
            <div className="absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-signal/50" />
            <div className="absolute -right-3 -bottom-3 h-10 w-10 border-b-2 border-r-2 border-signal/50" />
            <div className="absolute -right-6 top-8 hidden h-3 w-3 animate-pulse rounded-full bg-signal sm:block" />
            <div className="absolute -left-6 bottom-16 hidden h-3 w-3 rounded-full bg-copper/70 sm:block" />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={portraitAsset.url}
                alt="Portrait of Marshlino Nader"
                width={1200}
                height={1600}
                loading="eager"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-border/60 bg-background/70 px-2.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Marshlino · Alexandria
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border/60 py-20 sm:py-24">
      <Reveal>
        <SectionLabel index="01" title="About">
          The short version of who I am and what I'm studying.
        </SectionLabel>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay="reveal-delay-1">
          <p className="text-lg leading-relaxed text-foreground/90">
            I'm a second-year{" "}
            <span className="text-signal">Computer Engineering</span> student
            at Pharos University in Alexandria, Egypt. My coursework spans
            digital systems, electronics, data structures, linear algebra, and
            probability — and I keep pulling the theory off the page and onto a
            breadboard.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I'm most at home where a microcontroller meets a sensor and a few
            lines of code: Arduino builds, GSM/GPS emergency devices, digital
            logic counters, and the occasional data analysis project in Python.
            I'm looking for internships where I can keep building real things
            alongside people who do this well.
          </p>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Current coursework
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {COURSEWORK.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm text-foreground/90"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay="reveal-delay-2">
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/12 text-signal">
                <Gauge className="h-5 w-5" />
              </span>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Education
              </p>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              Pharos University
            </h3>
            <p className="text-sm text-muted-foreground">
              Alexandria, Egypt
            </p>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-foreground/80">BSc Computer Engineering</span>
                <span className="font-mono text-xs text-signal">Year 2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-mono text-xs text-muted-foreground">
                  In progress
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- project card (expandable) ---------- */

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof PROJECTS)[number];
  delay: "" | "reveal-delay-1" | "reveal-delay-2" | "reveal-delay-3" | "reveal-delay-4";
}) {
  const [open, setOpen] = useState(false);
  const Icon = project.icon;
  return (
    <Reveal
      delay={delay}
      as="div"
      className={open ? "md:col-span-2" : ""}
    >
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/50 p-6 transition-colors duration-300 hover:bg-card ${
          open ? "border-signal/40" : "border-border hover:border-signal/40"
        }`}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-signal/5 blur-3xl transition-opacity group-hover:bg-signal/10" />

        {/* card header */}
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-signal/25 bg-signal/10 text-signal">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-sm text-muted-foreground/70">
            {project.index}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/70 bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md border border-border/70 bg-background/60 px-3 py-1.5 font-mono text-xs text-signal transition-colors hover:border-signal/40 hover:bg-signal/10"
        >
          {open ? "Show less" : "Read more"}
          <ArrowDownRight
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* expandable details — opens as a full-width rectangle below */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              <div className="mt-6 space-y-3 rounded-xl border border-signal/25 bg-signal/5 p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                  How it works
                </p>
                {project.details.map((d, idx) => (
                  <p
                    key={idx}
                    className="max-w-3xl text-sm leading-relaxed text-foreground/80"
                  >
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}



function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-24"
    >
      <Reveal>
        <SectionLabel index="02" title="Projects">
          A mix of embedded hardware, digital logic, and software.
        </SectionLabel>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            delay={i % 2 === 0 ? "reveal-delay-1" : "reveal-delay-2"}
          />
        ))}
      </div>

      {/* optional / in-progress */}
      <Reveal delay="reveal-delay-1" className="mt-10">
        <div className="rounded-2xl border border-dashed border-border bg-card/30 p-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-copper" />
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Also exploring / in progress
            </p>
          </div>
          <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {OPTIONAL_PROJECTS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <ArrowRight className="h-3.5 w-3.5 text-copper/70" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- skills ---------- */

function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-24"
    >
      <Reveal>
        <SectionLabel index="03" title="Skills">
          What I reach for when something needs to get built.
        </SectionLabel>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal
              key={g.label}
              delay={`reveal-delay-${i + 1}` as "reveal-delay-1"}
            >
              <div className="h-full rounded-2xl border border-border bg-card/50 p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-signal">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {g.label}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-signal/40 hover:text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12">
          <div className="dot-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/12 blur-3xl" />

          <div className="relative">
            <span className="font-mono text-sm text-signal">04</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let's build something.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Open to internships, collaborations, and a good engineering
              problem. Reach me on GitHub, by email, or by phone — I read every
              message.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-mono text-sm font-medium text-signal-foreground transition-all hover:signal-ring"
              >
                <Github className="h-4 w-4" />
                See my code on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/50 px-6 py-3.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-signal/40 hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-signal/70" /> Alexandria, Egypt
              </span>
              <a
                href={`tel:${PHONE_INTL}`}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 text-signal/70" /> {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-signal/70" /> {EMAIL}
              </a>
              <span className="flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-signal/70" /> Open to remote & on-site internships
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row sm:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 Marshlino Nader · Built in Alexandria, Egypt
        </p>
        <div className="flex items-center gap-1.5">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github size={16} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
