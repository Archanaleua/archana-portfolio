import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  FaPython, FaJsSquare, FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
  FaLinkedinIn, FaGithub, FaEnvelope, FaMapMarkerAlt, FaSun, FaMoon,
  FaDatabase, FaCode, FaBrain, FaChartBar, FaCogs, FaRobot,
} from "react-icons/fa";
import { SiDjango, SiFlask, SiNumpy, SiCplusplus, SiMysql } from "react-icons/si";
import archana from "../assets/archana.jpg";
import archanaLight from "../assets/archana-light.png";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Archana Leua — Computer Engineer & Python Developer" },
      { name: "description", content: "Portfolio of Archana Leua — Computer Engineering undergraduate at MBIT-CVM University building AI-integrated platforms and leading campus tech initiatives." },
    ],
  }),
});

type Cat = "all" | "language" | "frontend" | "backend" | "data";
const SKILLS: { name: string; cat: Exclude<Cat, "all">; icon: ReactNode }[] = [
  { name: "Python", cat: "language", icon: <FaPython /> },
  { name: "C++", cat: "language", icon: <SiCplusplus /> },
  { name: "C", cat: "language", icon: <FaCode /> },
  { name: "JavaScript", cat: "frontend", icon: <FaJsSquare /> },
  { name: "HTML", cat: "frontend", icon: <FaHtml5 /> },
  { name: "CSS", cat: "frontend", icon: <FaCss3Alt /> },
  { name: "React.js", cat: "frontend", icon: <FaReact /> },
  { name: "Django", cat: "backend", icon: <SiDjango /> },
  { name: "Flask", cat: "backend", icon: <SiFlask /> },
  { name: "Node.js", cat: "backend", icon: <FaNodeJs /> },
  { name: "MySQL", cat: "backend", icon: <SiMysql /> },
  { name: "NumPy", cat: "data", icon: <SiNumpy /> },
  { name: "Data Science", cat: "data", icon: <FaChartBar /> },
  { name: "AI / Agents", cat: "data", icon: <FaRobot /> },
];
const CAT_LABEL: Record<Exclude<Cat, "all">, string> = {
  language: "Language", frontend: "Frontend", backend: "Backend", data: "Data & AI",
};

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Cat>("all");
  const ROLES = ["Computer Engineer", "Python Developer", "Data Science Enthusiast", "Open Source Contributor"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(() => {
      setTyped((p) => deleting ? current.slice(0, p.length - 1) : current.slice(0, p.length + 1));
    }, deleting ? 45 : 90);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    const initial: "dark" | "light" = saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const close = () => setMenuOpen(false);
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Toolkit" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Work" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="site-nav">
        <a href="#home" className="logo">Archana<span className="logo-dot" /></a>
        <ul className="nav-links">
          {navItems.map((n) => (<li key={n.href}><a href={n.href}>{n.label}</a></li>))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          
          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">☰</button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map((n) => (<a key={n.href} href={n.href} onClick={close}>{n.label}</a>))}
      </div>

      <section id="home">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-left reveal">
          <div className="hero-badge">Open to Internships &amp; Collaborations</div>
          <p style={{ fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", fontFamily: "var(--font-mono)", marginBottom: ".6rem" }}>Hello, It's Me!</p>
          <h1 className="hero-name">Archana</h1>
          <h1 className="hero-name-italic">Leua.</h1>
          <p className="hero-tagline">And I'm a <strong className="role-rotator" style={{color: theme === "dark" ? "#e8e6e1" : "#0b1226"}}>{typed}<span className="role-caret">|</span></strong></p>
          <p className="hero-desc">
            Undergraduate at MBIT–CVM University building <strong>AI-integrated platforms</strong> and leading campus tech initiatives. Specialising in Python and Data Science — turning ideas into real, working systems.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="/Archana-Leua-Resume.pdf" className="btn-primary" download="Archana-Leua-Resume.pdf">Download Resume</a>
          </div>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/archanaleua09/" target="_blank" rel="noreferrer"><FaLinkedinIn className="sicon" /> LinkedIn</a>
            <a href="https://github.com/Archanaleua" target="_blank" rel="noreferrer"><FaGithub className="sicon" /> GitHub</a>
            <a href="https://maps.google.com/?q=Kantam+apartment,GD+High+School+Rd,Near+Prabhakar+Tenament,Krishna+Nagar,Saijpur+Bogha,Ahmedabad,Gujarat+382345" target="_blank" rel="noreferrer" className="hero-location"><FaMapMarkerAlt /> Ahmedabad, Gujarat</a>
          </div>
        </div>

        <div className="hero-right reveal">
          <div className="hero-img-outer">
            <div className="hero-img-container">
              <img src={theme === "dark" ? archana : archanaLight} alt="Archana Leua" style={{mixBlendMode: theme === "dark" ? "luminosity" : "normal", borderRadius: "0", border: "none", boxShadow: "none", background: "transparent"}} />
            </div>
          </div>
          <div className="hero-stats-row">
            <div className="stat-card">
              <div className="stat-val">9.33</div>
              <div className="stat-label">Sem 5 SPI</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">8.41</div>
              <div className="stat-label">CPI</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">5+</div>
              <div className="stat-label">Leadership Roles</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="about">
        <div className="about-left reveal">
          <span className="about-big">A</span>
          <div className="section-tag">About Me</div>
          <h2 className="about-heading">A student,<br />a builder,<br /><em>a contributor.</em></h2>
        </div>
        <div className="about-right reveal">
          <p className="about-body">I'm Archana Leua — a Computer Engineering undergraduate at MBIT-CVM University with a strong academic foundation and a deeper love for actually building things that matter.</p>
          <p className="about-body">Right now I'm contributing to GSSoC'26 across the Open Source and AI / Agents tracks, leading multiple student bodies on campus, and shipping projects at the intersection of data science and real-world utility.</p>
          <p className="about-body">My goal is simple: keep stepping outside the comfort zone, learn continuously, and build solutions useful to real people.</p>
          <div className="traits">
            {[
              ["Problem-Solver", "I love untangling messy problems and shipping clean, working solutions that hold up under real conditions."],
              ["Open Source Contributor", "Exploring GSSoC'26 Open Source & AI/Agents tracks alongside a global community of builders."],
              ["Always Learning", "Stepping outside my comfort zone is the default setting. New stack? Bring it on."],
            ].map(([t, d]) => (
              <div key={t} className="trait">
                <div className="trait-mark">◈</div>
                <div><div className="trait-title">{t}</div><div className="trait-desc">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="skills">
        <div className="skills-top reveal">
          <div>
            <div className="section-tag">My Toolkit</div>
            <h2 className="skills-heading">Tools that get<br />things done.</h2>
          </div>
          <p className="skills-sub">Click any category to filter by type.</p>
        </div>
        <div className="filter-tabs reveal">
          {(["all", "language", "frontend", "backend", "data"] as Cat[]).map((c) => (
            <button key={c} className={`tab${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>
              {c === "all" ? "All" : CAT_LABEL[c as Exclude<Cat, "all">]}
            </button>
          ))}
        </div>
        <div className="skills-grid reveal">
          {SKILLS.map((s) => (
            <div key={s.name} className={`skill-card${filter !== "all" && filter !== s.cat ? " hidden" : ""}`}>
              <span className="skill-icon">{s.icon}</span>
              <div className="skill-name">{s.name}</div>
              <div className="skill-cat">{CAT_LABEL[s.cat]}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="experience">
        <div className="exp-left-sticky reveal">
          <div className="section-tag">Experience &amp; Leadership</div>
          <h2 className="exp-section-title">Roles I've genuinely shown up for.</h2>
          <p className="exp-section-sub">Leadership, open source, and campus initiatives that shaped who I am.</p>
        </div>
        <div className="timeline reveal">
          {[
            ["2026", "GirlScript Summer of Code", "GSSoC'26 Contributor — Open Source & AI Tracks", "Selected as a contributor across the Open Source and AI / Agents tracks — collaborating with global developers to build impactful, real-world solutions."],
            ["2024 — Present", "MBIT-CVM University", "Ladies Representative", "Advocating for student welfare, voicing concerns to the institution, and coordinating events that strengthen the campus community."],
            ["2024 — Present", "TPC, MBIT", "Training & Placement Cell Coordinator", "Organising student meetings, coordinating training sessions, and helping run campus placement activities smoothly."],
            ["2024 — Present", "Google for Developers", "Google Student Ambassador", "Bringing Google developer programs and learning resources to campus, connecting students with the wider tech community."],
            ["2024 — Present", "MBIT-CVM University", "PDC Discipline Head & NSS Anchoring Head", "Leading discipline within the PDC team and anchoring NSS events — fostering a strong tech and community ecosystem on campus."],
          ].map(([y, o, r, d]) => (
            <div key={r} className="tl-item">
              <div className="tl-year">{y}</div>
              <div className="tl-org">{o}</div>
              <div className="tl-role">{r}</div>
              <div className="tl-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="projects">
        <div className="proj-header reveal">
          <div className="section-tag">Selected Work</div>
          <h2 className="proj-title">Things I've built<br />and shipped.</h2>
          <p className="proj-sub">Real projects. Real code. Real impact.</p>
        </div>
        <div className="proj-grid">
          <div className="proj-card reveal">
            <div className="proj-type">AI · LMS</div>
            <div className="proj-name">AI-Powered Job Prep Platform</div>
            <div className="proj-desc">A platform integrating a learning management system with mock interview simulations to help students prepare for placements and real-world tech careers.</div>
            <div className="proj-tags">
              {["Python", "AI APIs", "React", "Node.js"].map((t) => <span key={t} className="ptag">{t}</span>)}
            </div>
          </div>
          <div className="proj-card reveal">
            <div className="proj-type">Python · Tool</div>
            <div className="proj-name">PDF Translator</div>
            <div className="proj-desc">A Python tool using a chunk-processing translation engine to seamlessly translate full document contents while preserving structure and formatting.</div>
            <div className="proj-tags">
              {["Python", "PyMuPDF", "Translation APIs"].map((t) => <span key={t} className="ptag">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="education">
        <div className="edu-left-sticky reveal">
          <div className="section-tag">Education</div>
          <h2 className="edu-title">The academic foundation.</h2>
          <p className="edu-sub">Building expertise through structured learning and hands-on application.</p>
        </div>
        <div className="edu-cards reveal">
          <div className="edu-card featured">
            <div className="edu-year">2023 — 2027</div>
            <div className="edu-school">MBIT — CVM University</div>
            <div className="edu-degree">B.Tech, Computer Engineering</div>
            <div className="edu-scores">
              <span className="score-item">SPI <span>9.33</span></span>
              <span className="score-item">CPI <span>8.41</span></span>
            </div>
            <div className="edu-skills-row">AI · Programming · Data Structures · Web Development · +10 more</div>
          </div>
          <div className="edu-card">
            <div className="edu-year">Jun 2021 — Jun 2022</div>
            <div className="edu-school">Shree N.V. Patel Vidhya Mandir</div>
            <div className="edu-degree">HSC (12th) — Science · Grade: 54%</div>
          </div>
          <div className="edu-card">
            <div className="edu-year">Jun 2020 — Jun 2021</div>
            <div className="edu-school">Shree Sharda Vidhya Mandir</div>
            <div className="edu-degree">SSC (10th) — Grade: 87% · First experience leading &amp; organising.</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="contact-watermark">CONNECT</div>
        <div className="contact-inner reveal">
          <div className="section-tag" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Let's Connect</div>
          <h2 className="contact-title">Have an idea<br /><em>worth building?</em></h2>
          <p className="contact-sub">I'm always open to internships, open-source collaborations, and conversations about AI or campus tech. Pick your preferred channel.</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/archanaleua09/" className="contact-link" target="_blank" rel="noreferrer"><FaLinkedinIn className="cicon" /> LinkedIn</a>
            <a href="https://github.com/Archanaleua" className="contact-link" target="_blank" rel="noreferrer"><FaGithub className="cicon" /> GitHub</a>
            <a href="/Archana-Leua-Resume.pdf" className="contact-link" download="Archana-Leua-Resume.pdf">↓ Resume</a>
          </div>
          <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=archanaleua09@gmail.com" target="_blank" rel="noreferrer" className="contact-email"><FaEnvelope /> archanaleua09@gmail.com</a>
          <div className="contact-loc">◎ Greater Ahmedabad Area, Gujarat — India</div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-copy">© 2026 Archana Leua · Designed &amp; built with care.</div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/archanaleua09/" target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
          <a href="https://github.com/Archanaleua" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
          <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=archanaleua09@gmail.com" target="_blank" rel="noreferrer"><FaEnvelope /> Email</a>
        </div>
      </footer>
    </>
  );
}
