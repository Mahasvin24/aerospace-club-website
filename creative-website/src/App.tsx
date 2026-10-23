import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Aircraft, { aircraftParts, type AircraftPart } from "./Aircraft";
import { CALENDAR_URL, EMAIL, JOIN_URL, crew, fleet } from "./data";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 52"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 28 30 5l27 23-27-9Z" fill="currentColor" />
      <path d="m10 42 20-17 20 17-20-7Z" fill="currentColor" />
      <path d="m19 49 11-10 11 10-11-4Z" fill="currentColor" />
    </svg>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 800) setOpen(false);
    };
    const dismiss = (event: PointerEvent) => {
      if (open && !headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [open]);
  return (
    <header ref={headerRef} className="site-header">
      <a
        href="#home"
        className="brand"
        aria-label="Santa Barbara Aeronautics home"
        onClick={() => setOpen(false)}
      >
        <Mark />
        <span>
          Santa Barbara
          <br />
          Aeronautics
        </span>
      </a>
      <button
        ref={toggleRef}
        className={`menu-toggle ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
      </button>
      <nav
        id="main-nav"
        className={`main-nav ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#story" onClick={() => setOpen(false)}>
          Our story
        </a>
        <a href="#fleet" onClick={() => setOpen(false)}>
          The fleet
        </a>
        <a href="#crew" onClick={() => setOpen(false)}>
          The crew
        </a>
        <a href="#support" onClick={() => setOpen(false)}>
          Support us
        </a>
        <a href="#join" className="nav-join" onClick={() => setOpen(false)}>
          Come build with us <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const [part, setPart] = useState<AircraftPart>("airframe");
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-topline">
        <span>
          <span className="location-dot" /> Student-built at UC Santa Barbara
        </span>
        <span className="hero-location">An open sky. A shared ambition.</span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <h1 id="hero-heading">
            Beyond
            <br />
            the shore.
          </h1>
          <p className="hero-motto">Above the rest.</p>
          <p className="hero-description">
            We’re Santa Barbara Aeronautics.
            <br />A crew of curious minds turning big ideas
            <br className="desktop-break" /> into things that fly.
          </p>
          <a href="#fleet" className="button button--blue">
            Explore our fleet{" "}
            <span>
              <Arrow />
            </span>
          </a>
        </div>
        <div className="hero-aircraft">
          <div className="sky-disc" />
          <Aircraft selected={part} />
          <span className="figure-note">Made to explore a little further.</span>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-project">
          <span className="project-symbol" aria-hidden="true">
            ↗
          </span>
          <div>
            <strong>Meet Condor</strong>
            <span>Our coastal research aircraft concept</span>
          </div>
        </div>
        <div
          className="aircraft-controls"
          role="group"
          aria-label="Explore Condor’s components"
        >
          {(Object.keys(aircraftParts) as AircraftPart[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPart(key)}
              aria-pressed={part === key}
            >
              {aircraftParts[key].label}
              <span aria-hidden="true">{part === key ? "−" : "+"}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="part-description" aria-live="polite">
        {aircraftParts[part].description}
      </p>
    </section>
  );
}

function fleetSlug(index: number) {
  return fleet[index].name.toLowerCase().replaceAll(" ", "-");
}

function selectedFleetFromUrl() {
  const slug = new URLSearchParams(window.location.search).get("aircraft");
  return Math.max(0, fleet.findIndex((_, index) => fleetSlug(index) === slug));
}

function Fleet() {
  const [selected, setSelected] = useState(selectedFleetFromUrl);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const aircraft = fleet[selected];
  useEffect(() => {
    const syncSelection = () => setSelected(selectedFleetFromUrl());
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, []);
  function chooseAircraft(index: number) {
    setSelected(index);
    const url = new URL(window.location.href);
    url.searchParams.set("aircraft", fleetSlug(index));
    window.history.replaceState(null, "", url);
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % fleet.length;
    else if (event.key === "ArrowLeft")
      next = (index + fleet.length - 1) % fleet.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = fleet.length - 1;
    else return;
    event.preventDefault();
    chooseAircraft(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      id="fleet"
      className="fleet section-wrap"
      aria-labelledby="fleet-heading"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">From our workbench</p>
          <h2 id="fleet-heading">
            Ideas with wings.
            <br />
            And rotors.
          </h2>
        </div>
        <p>
          Designed, wired, built, and tested by us.
          <br />A closer look at what we’re putting in the air.
        </p>
      </div>
      <div className="fleet-tabs" role="tablist" aria-label="Our aircraft">
        {fleet.map((item, i) => (
          <button
            ref={(el) => {
              tabs.current[i] = el;
            }}
            key={item.name}
            id={`fleet-tab-${i}`}
            role="tab"
            aria-selected={selected === i}
            aria-controls="fleet-panel"
            tabIndex={selected === i ? 0 : -1}
            onClick={() => chooseAircraft(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span>{item.name}</span>
            <span className="tab-type">{item.type}</span>
            <span className="tab-icon" aria-hidden="true">
              {selected === i ? "↗" : "+"}
            </span>
          </button>
        ))}
      </div>
      <div
        key={selected}
        id="fleet-panel"
        role="tabpanel"
        aria-labelledby={`fleet-tab-${selected}`}
        tabIndex={0}
        className="fleet-panel"
      >
        <div
          className={`fleet-visual ${aircraft.image ? "" : "fleet-visual--concept"}`}
        >
          {aircraft.image ? (
            <img
              src={aircraft.image}
              alt={aircraft.alt}
              loading="lazy"
              width="1024"
              height="683"
            />
          ) : (
            <>
              <Aircraft compact />
              <span className="concept-caption">
                Condor / illustrative concept
              </span>
            </>
          )}
          <span className="image-tag">{aircraft.name} / SB Aero</span>
        </div>
        <div className="fleet-details">
          <span className={`status ${selected === 2 ? "status--legacy" : ""}`}>
            <span />
            {aircraft.status}
          </span>
          <h3>{aircraft.title}</h3>
          <p>{aircraft.description}</p>
          <dl className="specs">
            {aircraft.specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <a href="#join" className="text-link">
            Work on a project with us <Arrow diagonal />
          </a>
        </div>
      </div>
      <p className="fleet-footnote">
        Ad rem classem paratus <span>Ready for the fleet.</span>
      </p>
    </section>
  );
}

function Story() {
  return (
    <section
      id="story"
      className="story section-wrap"
      aria-labelledby="story-heading"
    >
      <div className="story-title">
        <span className="mini-mark">
          <Mark />
        </span>
        <p className="section-kicker">A little about us</p>
        <h2 id="story-heading">
          Great things
          <br />
          start with
          <br />
          “what if?”
        </h2>
      </div>
      <div className="story-copy">
        <p className="story-lead">
          What if the thing you sketched in a notebook could actually take
          flight?
        </p>
        <p>
          That’s the spirit behind Santa Barbara Aeronautics. We’re a
          student-built organization exploring aeronautics, controls, and
          robotics, with our feet in Santa Barbara and our eyes on what’s next.
        </p>
        <p>
          We build more than aircraft. Through ambitious projects and shared
          work, we develop the technical skills, leadership, and friendships
          that go with us long after graduation.
        </p>
        <div className="ways-to-build">
          <h3>Find your way in.</h3>
          <p>
            Engineering. Research. Creative work.
            <br />
            Finance. Operations. There’s a place to contribute.
          </p>
        </div>
      </div>
    </section>
  );
}

function Crew() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.classList.add("dialog-open");
    } else {
      dialogRef.current?.close();
      document.body.classList.remove("dialog-open");
    }
    return () => document.body.classList.remove("dialog-open");
  }, [isOpen]);
  function close() {
    setIsOpen(false);
    openButton.current?.focus();
  }
  const featured = [crew[0], crew[1], crew[2]];
  return (
    <section id="crew" className="crew-section" aria-labelledby="crew-heading">
      <div className="crew-inner section-wrap">
        <div className="crew-copy">
          <p className="section-kicker">The 2026–27 crew</p>
          <h2 id="crew-heading">
            Good people.
            <br />
            Great lift.
          </h2>
          <p>
            Behind every airframe is a group of people figuring it out together.
            Meet the crew making it happen.
          </p>
          <button
            ref={openButton}
            onClick={() => setIsOpen(true)}
            className="text-link"
          >
            Meet the whole team{" "}
            <span className="circle-plus" aria-hidden="true">
              +
            </span>
          </button>
        </div>
        <div className="crew-portraits">
          {featured.map((member) => (
            <figure key={member.name}>
              <div>
                <img
                  src={`/assets/team/${member.image}.png`}
                  alt={member.name}
                  width="400"
                  height="520"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="crew-dialog"
        aria-labelledby="directory-heading"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const box = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < box.left ||
              e.clientX > box.right ||
              e.clientY < box.top ||
              e.clientY > box.bottom
            )
              close();
          }
        }}
      >
        <div className="dialog-heading">
          <div>
            <p className="section-kicker">
              Santa Barbara Aeronautics / 2026–27
            </p>
            <h2 id="directory-heading">Meet the crew.</h2>
          </div>
          <button
            className="dialog-close"
            aria-label="Close team directory"
            onClick={close}
          >
            ×
          </button>
        </div>
        <div className="directory-grid">
          {crew.map((member) => (
            <article className="directory-member" key={member.name}>
              {member.image ? (
                <img
                  src={`/assets/team/${member.image}.png`}
                  alt={member.name}
                  width="300"
                  height="350"
                  loading={isOpen ? "eager" : "lazy"}
                />
              ) : (
                <div className="portrait-placeholder">
                  <Mark />
                  <span>Portrait coming soon</span>
                </div>
              )}
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
        <p className="directory-note">
          Our Business Chair position is open.{" "}
          <a href={`mailto:${EMAIL}?subject=Business%20Chair%20interest`}>
            Get in touch if you’re interested.
          </a>
        </p>
      </dialog>
    </section>
  );
}

function Support() {
  return (
    <section
      id="support"
      className="support section-wrap"
      aria-labelledby="support-heading"
    >
      <div className="support-heading">
        <p className="section-kicker">
          A little support. A lot of possibility.
        </p>
        <h2 id="support-heading">Flight is a team effort.</h2>
        <p>
          Our supporters help turn ambitious student ideas into real airframes
          and field tests. Thank you for being part of the build.
        </p>
        <a
          href={`mailto:${EMAIL}?subject=Supporting%20SB%20Aero`}
          className="text-link"
        >
          Become a supporter <Arrow diagonal />
        </a>
      </div>
      <div className="sponsor-logos">
        <div>
          <img
            src="/assets/sponsors/aztech-labs.png"
            alt="Aztech Labs"
            width="420"
            height="140"
            loading="lazy"
          />
        </div>
        <a
          href="https://accu-components.com/us/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Accu Components (opens in a new tab)"
        >
          <img
            src="/assets/sponsors/accu-components.png"
            alt="Accu Components"
            width="420"
            height="280"
            loading="lazy"
          />
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

function Join() {
  return (
    <section id="join" className="join-section" aria-labelledby="join-heading">
      <div className="join-main">
        <div>
          <p className="section-kicker">Your next chapter, in the air.</p>
          <h2 id="join-heading">
            Come curious.
            <br />
            Leave airborne.
          </h2>
        </div>
        <div className="join-copy">
          <p>
            You bring the questions.
            <br />
            We’ll find out what’s possible together.
          </p>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noreferrer"
            className="button button--yellow"
            aria-label="Join the crew (opens in a new tab)"
          >
            Join the crew{" "}
            <span>
              <Arrow diagonal />
            </span>
          </a>
          <span className="join-form-note">Start with our interest form.</span>
        </div>
        <svg
          className="join-flightline"
          viewBox="0 0 1100 290"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M-70 271c276 4 403-201 633-153s134 182 13 112S667-11 1160 18"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="5 7"
          />
          <path
            d="m1003 23 12-12-1 15-5-4-6 1Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>
      <div className="join-steps">
        <div>
          <span>01</span>
          <div>
            <h3>Say hello.</h3>
            <p>Fill out the interest form so we can connect.</p>
          </div>
        </div>
        <div>
          <span>02</span>
          <div>
            <h3>Meet the group.</h3>
            <p>Come to a meeting or project work day.</p>
          </div>
        </div>
        <div>
          <span>03</span>
          <div>
            <h3>Find your project.</h3>
            <p>Pick a track, get involved, and build with us.</p>
          </div>
        </div>
      </div>
      <div className="join-questions">
        <details>
          <summary>
            When can I meet the club?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Our annual calendar has the club’s events and meeting schedule.{" "}
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer">
              Open the SB Aero calendar{" "}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </details>
        <details>
          <summary>
            Is there a place for me beyond engineering?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Yes. The club has tracks in content, finance, research, and
            operations alongside engineering.{" "}
            <a href={JOIN_URL} target="_blank" rel="noreferrer">
              Tell us what interests you in the interest form.
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </details>
        <details>
          <summary>
            I have a different question.<span aria-hidden="true">+</span>
          </summary>
          <p>
            We’d love to hear from you. Email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with your questions, ideas,
            or collaboration interests.
          </p>
        </details>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#home" className="brand">
          <Mark />
          <span>
            Santa Barbara
            <br />
            Aeronautics
          </span>
        </a>
        <a className="footer-email" href={`mailto:${EMAIL}`}>
          Let’s get something off the ground.
          <br />
          <span>{EMAIL}</span>
        </a>
        <a href="#home" className="back-top" aria-label="Back to top">
          ↑
        </a>
      </div>
      <div className="footer-bottom">
        <span>Student-built. Santa Barbara, California.</span>
        <div>
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer">
            Club calendar <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href={JOIN_URL} target="_blank" rel="noreferrer">
            Interest form <span className="sr-only">(opens in a new tab)</span>
          </a>
          <span>© {new Date().getFullYear()} SB Aero</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="home">
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <section
            className="intro-strip section-wrap"
            aria-label="Our approach"
          >
            <span className="intro-star" aria-hidden="true">
              ✳
            </span>
            <p>
              A little coastal.
              <br />A lot of possibility.
            </p>
            <p>
              From first solder joints to the next flight test,
              <br />
              we learn by making. Then we make it fly.
            </p>
          </section>
          <Fleet />
          <Story />
          <Crew />
          <Support />
          <Join />
        </main>
        <Footer />
      </div>
    </>
  );
}
