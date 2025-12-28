import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { FaCode } from "react-icons/fa6";
import { VscCode } from "react-icons/vsc";
import {
  SiReact,
  SiVite,
  SiExpo,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiGit,
  SiGithub,
  SiPython,
  SiFirebase
} from "react-icons/si";

const toolkit = [
  "React",
  "Vite",
  "React Native",
  "Expo CLI",
  "JavaScript",
  "HTML",
  "CSS",
  "Figma",
  "Git",
  "GitHub",
  "REST APIs",
  "Python",
  "Firebase",
  "VsCode",
  "n8n"
];

const projectsSeed = [
  {
    id: "p1",
    category: "code",
    title: "Journal Fit",
    short: "Aplicacion para todo tipo de deportista.",
    description:
      "Proyecto enfocado en UI y arquitectura de componentes. Incluye layout responsive, componentes reutilizables, manejo de estados, y una experiencia fluida en desktop y mobile.",
    preview: "/src/assets/project-1.jpg",
    video: "",
    images: [
      "/src/assets/project-1.jpg",
      "/src/assets/project-1b.jpg",
      "/src/assets/project-1c.jpg"
    ],
    github: "https://github.com/tu-usuario/tu-repo",
    live: "",
    tags: ["React Native", "Expo CLI", "Firebase"]
  },
  {
    id: "p2",
    category: "code",
    title: "Learn Free",
    short: "Proyecto universitario donde se buscaba dar educacion gratuita del idioma Ingles.",
    description:
      "Front end centrado en componentes, rutas, estados y buenas prácticas de UX. Enfocado en performance y consistencia visual.",
    preview: "/src/assets/project-2.jpg",
    video: "",
    images: ["/src/assets/project-2.jpg", "/src/assets/project-2b.jpg"],
    github: "https://github.com/tu-usuario/tu-repo-2",
    live: "",
    tags: ["React"]
  },
  {
    id: "d1",
    category: "design",
    title: "Mockup de la primera version de Journal Fit",
    short: "Journal fit cuando aun era un proyecto de la universidad",
    description:
      ", consistencia y ",
    preview: "/src/assets/design-1.jpg",
    video: "",
    images: ["/src/assets/design-1.jpg", "/src/assets/design-1b.jpg"],
    figma: "https://www.figma.com/file/tu-link",
    tags: ["Figma", "Design System", "Tokens"]
  },
  {
    id: "d2",
    category: "design",
    title: "Mockup Learn Free",
    short: "Proyecto de la universidad donde aplique mis tecnicas autodidactas de diseño.",
    description:
      "Diseño orientado a conversión: jerarquía clara, secciones modulares, componentes reutilizables y estética moderna.",
    preview: "/src/assets/design-2.jpg",
    video: "",
    images: [
      "/src/assets/design-2.jpg",
      "/src/assets/design-2b.jpg",
      "/src/assets/design-2c.jpg"
    ],
    figma: "https://www.figma.com/file/tu-link-2",
    tags: ["Figma", "Landing", "Layout"]
  }
];

function useLockBodyScroll(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isLocked]);
}

function clampIndex(i, len) {
  if (len <= 0) return 0;
  if (i < 0) return len - 1;
  if (i >= len) return 0;
  return i;
}

const keyOf = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const TECH_META = {
  react: { label: "React", Icon: SiReact },
  vite: { label: "Vite", Icon: SiVite },
  reactnative: { label: "React Native", Icon: SiReact },
  expocli: { label: "Expo CLI", Icon: SiExpo },
  javascript: { label: "JavaScript", Icon: SiJavascript },
  html: { label: "HTML", Icon: SiHtml5 },
  css: { label: "CSS", Icon: SiCss3 },
  figma: { label: "Figma", Icon: SiFigma },
  git: { label: "Git", Icon: SiGit },
  github: { label: "GitHub", Icon: SiGithub },
  restapis: { label: "REST APIs", Icon: FaCode },
  python: { label: "Python", Icon: SiPython },
  firebase: { label: "Firebase", Icon: SiFirebase },
  vscode: { label: "VS Code", Icon: VscCode },
  n8n: { label: "N8N", Icon: VscCode}

};

const TOOLKIT_GROUPS = [
  {
    id: "frontend",
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Vite", "React Native", "Expo CLI", "Figma"]
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Python", "Firebase", "REST APIs"]
  },
  {
    id: "learning",
    title: "Aprendiendo",
    items: ["n8n",]
  },
  {
    id: "tools",
    title: "Herramientas",
    items: ["Git", "GitHub", "VsCode"]
  }
];

function TechTile({ name, accent }) {
  const meta = TECH_META[keyOf(name)] || { label: name, Icon: FaCode };
  const Icon = meta.Icon;
  return (
    <div className="techTile">
      <div className="techIconWrap">
        <Icon className="techIcon" style={{ color: accent }} />
      </div>
      <div className="techLabel">{meta.label}</div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [modalProject, setModalProject] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const observerRef = useRef(null);

  const projects = useMemo(() => projectsSeed, []);
  const codeProjects = useMemo(() => projects.filter((p) => p.category === "code"), [projects]);
  const designProjects = useMemo(() => projects.filter((p) => p.category === "design"), [projects]);

  useLockBodyScroll(!!modalProject);

  useEffect(() => {
    const ids = ["inicio", "toolkit", "proyectos", "contacto"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (observerRef.current) observerRef.current.disconnect();

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { root: null, rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.2, 0.35, 0.5, 0.75] }
    );

    elements.forEach((el) => io.observe(el));
    observerRef.current = io;

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (!modalProject) return;
      if (e.key === "ArrowLeft") shiftCarousel(-1);
      if (e.key === "ArrowRight") shiftCarousel(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalProject, carouselIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openModal = (project) => {
    setModalProject(project);
    setCarouselIndex(0);
  };

  const closeModal = () => {
    setModalProject(null);
    setCarouselIndex(0);
  };

  const shiftCarousel = (delta) => {
    if (!modalProject) return;
    const imgs = modalProject.images || [];
    if (!imgs.length) return;
    setCarouselIndex((prev) => clampIndex(prev + delta, imgs.length));
  };

  const onContactSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = `Contacto portfolio - ${company || "Empresa"}`;
    const body = [`Nombre: ${name}`, `Email: ${email}`, `Empresa: ${company || "-"}`, "", message].join("\n");

    const to = "tu-correo@dominio.com";
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const accentByBoard = {
    frontend: "rgba(59,130,246,.95)",
    backend: "rgba(16,163,127,.95)",
    learning: "rgba(245,158,11,.95)",
    tools: "rgba(167,139,250,.95)"
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container headerInner">
          <div className="brand" onClick={() => scrollTo("inicio")} role="button" tabIndex={0}>
            <span className="brandDot" />
            <span className="brandText">Angel Cardenas Portfolio</span>
          </div>

          <nav className="nav">
            <button
              className={`navLink ${activeSection === "inicio" ? "active" : ""}`}
              onClick={() => scrollTo("inicio")}
            >
              Inicio
            </button>
            <button
              className={`navLink ${activeSection === "toolkit" ? "active" : ""}`}
              onClick={() => scrollTo("toolkit")}
            >
              Toolkit
            </button>
            <button
              className={`navLink ${activeSection === "proyectos" ? "active" : ""}`}
              onClick={() => scrollTo("proyectos")}
            >
              Proyectos
            </button>
            <button
              className={`navLink ${activeSection === "contacto" ? "active" : ""}`}
              onClick={() => scrollTo("contacto")}
            >
              Contacto
            </button>
          </nav>

          <div className="headerCtas">
            <button className="btn btnGhost" onClick={() => scrollTo("proyectos")}>
              Ver proyectos
            </button>
            <button className="btn btnPrimary" onClick={() => scrollTo("contacto")}>
              Trabajemos
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="inicio" className="section">
          <div className="container hero">
            <div className="heroLeft">
              <div className="eyebrow">Front End Developer</div>
              <h1 className="h1">
                Hola soy Angel!
                <br />
                Te doy la bienvenida a mi portafolio.
              </h1>
              <p className="lead">
Soy un programador con más de un año de experiencia en la industria. A lo largo de mi trayectoria profesional, me he enfrentado a diversos desafíos, desde desarrollar aplicaciones móviles multiplataforma desde cero, hasta brindar soporte a grandes plataformas web. Te invito a visitar mi portfolio para que conozcas todo lo que he logrado a lo largo de mi carrera.
              </p>

              <div className="heroActions">
                <button className="btn btnPrimary" onClick={() => scrollTo("proyectos")}>
                  Explorar proyectos
                </button>
                <button className="btn btnGhost" onClick={() => scrollTo("contacto")}>
                  Contactar
                </button>
              </div>

              <div className="heroStats">
                <div className="stat">
                  <div className="statTop">UI</div>
                  <div className="statBottom">Componentes y layout</div>
                </div>
                <div className="stat">
                  <div className="statTop">UX</div>
                  <div className="statBottom">Flujos claros y accesibles</div>
                </div>
                <div className="stat">
                  <div className="statTop">Entrega</div>
                  <div className="statBottom">Handoff limpio</div>
                </div>
              </div>
            </div>

            <div className="heroRight">
              <div className="profileCard">
                <div className="profileFrame">
                  <img className="profileImg" src="/src/assets/profile.jpg" alt="Foto de perfil" loading="lazy" />
                </div>
                <div className="profileMeta">
                  <div className="profileName">Angel Cardenas Abarzua</div>
                  <div className="profileRole">Front End Developer </div>
                  <div className="profileLinks">
                    <a className="chipLink" href="https://github.com/WaTenshi" target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    <a className="chipLink" href="https://www.figma.com/" target="_blank" rel="noreferrer">
                      Figma
                    </a>
                    <a className="chipLink" href="https://www.linkedin.com/in/angel-cardenas-abarzua-0a7380290/" target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="hintCard">
                <div className="hintTitle">Enfoque</div>
                <div className="hintText">
Me enfoco en crear sistemas modulares y escalables, pensados para crecer de forma ordenada a nivel de código. Me gusta integrar mis conocimientos como desarrollador con lo aprendido de manera autodidacta en UX/UI; no solo construyo aplicaciones, creo experiencias.                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="toolkit" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2 className="h2">Toolkit</h2>
              <p className="sub">Tecnologías y herramientas que domino en la actualidad.</p>
            </div>

            <div className="toolkitBoards">
              {TOOLKIT_GROUPS.map((g) => {
                const toolkitSet = new Set(toolkit.map(keyOf));
                const items = (g.items || []).filter((x) => toolkitSet.has(keyOf(x)));
                const accent = accentByBoard[g.id] || "rgba(16,163,127,.95)";

                return (
                  <div key={g.id} className={`board ${g.id}`}>
                    <div className="boardHeader">
                      <div className="boardTitle" style={{ color: accent }}>
                        {g.title}
                      </div>
                    </div>

                    {items.length > 0 ? (
                      <div className="boardGrid">
                        {items.map((t) => (
                          <TechTile key={t} name={t} accent={accent} />
                        ))}
                      </div>
                    ) : (
                      <div className="boardEmpty"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="proyectos" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2 className="h2">Proyectos</h2>
              <p className="sub">Código en GitHub y diseños en Figma. Cada card abre un modal con demo y más detalle.</p>
            </div>

            <div className="projectsSplit">
              <div className="splitCol">
                <div className="splitTitleRow">
                  <h3 className="h3">Código</h3>
                  <div className="splitBadge">{codeProjects.length}</div>
                </div>

                <div className="cardsGrid">
                  {codeProjects.map((p) => (
                    <button key={p.id} className="card" onClick={() => openModal(p)}>
                      <div className="cardMedia">
                        <img className="cardImg" src={p.preview} alt={p.title} loading="lazy" />
                        <div className="cardShade" />
                        <div className="cardTop">
                          <span className="cardChip">GitHub</span>
                        </div>
                      </div>
                      <div className="cardBody">
                        <div className="cardTitle">{p.title}</div>
                        <div className="cardShort">{p.short}</div>
                        <div className="cardTags">
                          {(p.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="splitCol">
                <div className="splitTitleRow">
                  <h3 className="h3">Diseños</h3>
                  <div className="splitBadge">{designProjects.length}</div>
                </div>

                <div className="cardsGrid">
                  {designProjects.map((p) => (
                    <button key={p.id} className="card" onClick={() => openModal(p)}>
                      <div className="cardMedia">
                        <img className="cardImg" src={p.preview} alt={p.title} loading="lazy" />
                        <div className="cardShade" />
                        <div className="cardTop">
                          <span className="cardChip cardChipBlue">Figma</span>
                        </div>
                      </div>
                      <div className="cardBody">
                        <div className="cardTitle">{p.title}</div>
                        <div className="cardShort">{p.short}</div>
                        <div className="cardTags">
                          {(p.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section">
          <div className="container contact">
            <div className="contactLeft">
              <div className="sectionHead left">
                <h2 className="h2">Contacto</h2>
                <p className="sub">Si eres empresa o reclutador, envíame un mensaje y te respondo lo antes posible.</p>
              </div>

              {/* <div className="contactCards">
                <div className="miniCard">a
                  <div className="miniTitle">Disponibilidad</div>
                  <div className="miniText">Freelance y full time</div>
                </div>
                <div className="miniCard">
                  <div className="miniTitle">Ubicación</div>
                  <div className="miniText">Chile</div>
                </div>
                <div className="miniCard">
                  <div className="miniTitle">Enfoque</div>
                  <div className="miniText">Front end y UI</div>
                </div>
              </div> */}
            </div>

            <div className="contactRight">
              <form className="form" onSubmit={onContactSubmit}>
                <div className="row2">
                  <label className="field">
                    <span className="label">Nombre</span>
                    <input className="input" name="name" required placeholder="Tu nombre" />
                  </label>
                  <label className="field">
                    <span className="label">Email</span>
                    <input className="input" name="email" type="email" required placeholder="correo@empresa.com" />
                  </label>
                </div>

                <label className="field">
                  <span className="label">Empresa</span>
                  <input className="input" name="company" placeholder="Nombre de empresa" />
                </label>

                <label className="field">
                  <span className="label">Mensaje</span>
                  <textarea className="textarea" name="message" required rows={6} placeholder="Cuéntame sobre el proyecto o vacante" />
                </label>

                <div className="formActions">
                  <button className="btn btnPrimary" type="submit">
                    Enviar
                  </button>
                  <div className="formHint">Se abrirá tu cliente de correo con el mensaje listo</div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footerInner">
            <div className="footerLeft">
              <div className="brand small" onClick={() => scrollTo("inicio")} role="button" tabIndex={0}>
                <span className="brandDot" />
                <span className="brandText">Portfolio</span>
              </div>
              <div className="footerMuted">Front end developer</div>
            </div>

            <div className="footerRight">
              <a className="footerLink" href="https://github.com/tu-usuario" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="footerLink" href="https://www.figma.com/@tu-usuario" target="_blank" rel="noreferrer">
                Figma
              </a>
              <a className="footerLink" href="https://www.linkedin.com/in/tu-usuario" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>

      {modalProject && (
        <div className="modalOverlay" onMouseDown={closeModal} role="presentation">
          <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modalHeader">
              <div className="modalTitleWrap">
                <div className="modalTitle">{modalProject.title}</div>
                <div className="modalSubtitle">{modalProject.short}</div>
              </div>
              <button className="iconBtn" onClick={closeModal} aria-label="Cerrar">
                ×
              </button>
            </div>

            <div className="modalMedia">
              {modalProject.video ? (
                <video className="video" src={modalProject.video} controls playsInline />
              ) : (
                <div className="carousel">
                  <button className="carouselBtn" onClick={() => shiftCarousel(-1)} aria-label="Anterior">
                    ‹
                  </button>
                  <div className="carouselFrame">
                    <img
                      className="carouselImg"
                      src={(modalProject.images || [modalProject.preview])[carouselIndex] || modalProject.preview}
                      alt={modalProject.title}
                    />
                  </div>
                  <button className="carouselBtn" onClick={() => shiftCarousel(1)} aria-label="Siguiente">
                    ›
                  </button>
                </div>
              )}
            </div>

            <div className="modalBody">
              <div className="modalDesc">{modalProject.description}</div>

              <div className="modalLinks">
                {modalProject.github && (
                  <a className="btn btnGhost" href={modalProject.github} target="_blank" rel="noreferrer">
                    Repositorio GitHub
                  </a>
                )}
                {modalProject.live && (
                  <a className="btn btnGhost" href={modalProject.live} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
                {modalProject.figma && (
                  <a className="btn btnGhost" href={modalProject.figma} target="_blank" rel="noreferrer">
                    Archivo Figma
                  </a>
                )}
              </div>

              <div className="modalTags">
                {(modalProject.tags || []).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
