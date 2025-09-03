// ---- Utilities ----
const createElement = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "events") for (const [e, fn] of Object.entries(v)) el.addEventListener(e, fn);
    else if (k === "class") el.classList.add(...v.split(" "));
    else if (k === "style") Object.assign(el.style, v);
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k in el) el[k] = v;
    else el.setAttribute(k, v);
  }
  [].concat(children).forEach(c => {
    if (c || c === 0) el.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(c) : c);
  });
  return el;
};

// ---- Project Data ----
const projects = [
  { title: "ShowSaw", description: "A website to browse and create events and buy tickets", details: "httprouter", stack: ["JavaScript","Golang","MongoDB","Redis"], image: "./assets/showsaw.avif", github: "https://github.com/aalokyadav96/fishstick", live: "https://showsaw.netlify.app/" },
  { title: "Gyfget", description: "Salvaged Gfycat.com's frontend before it shut down.", details: "Gorilla Mux", stack: ["React.js","Golang","MongoDB","Redis"], image: "./assets/gyfget.jpg", github: "#", live: "https://gyfget.onrender.com/" },
  { title: "Imigi", description: "A JavaScript web app that uses FFMPEG to apply filters to photos.", details: "Lightweight tool to upload, filter, and download images effortlessly.", stack: ["JavaScript","Golang","FFMPEG"], image: "./assets/imigi.jpg", github: "https://github.com/aalokyadav96/vichitr", live: "https://imigi.onrender.com/" },
  { title: "Locazon", description: "Web app with geolocation APIs to connect users with nearby services.", details: "Built with Golang + MySQL backend.", stack: ["JavaScript","Golang","MySQL"], image: "", github: "#", live: "https://atapi-vatapi.onrender.com" },
  { title: "Blog", description: "Personal Blog.", details: "", image: "./assets/aalokyadav.avif", github: "#", live: "https://aalokyadav.netlify.app/" },
  { title: "Qualms", description: "SPA with pure JavaScript and state-based routing.", details: "Backend built in Golang.", stack: ["JavaScript","Golang"], image: "", github: "#", live: "#" }
];

// ---- Blog Data ----
const posts = [
  { title: "Building a Portfolio SPA with Vanilla JS", excerpt: "How I built my portfolio with no frameworks, just state-based routing and clean components.", content: "This project was about exploring the fundamentals of SPAs using only vanilla JavaScript. No frameworks, no libraries. Just DOM manipulation and state management.", date: "2025-02-10" },
  { title: "Why I Use Golang for Backend", excerpt: "Golang offers simplicity, concurrency, and great performance for web apps.", content: "I started with Node.js, but Golang quickly became my go-to for backend development. It’s fast, compiled, and has first-class support for concurrency with goroutines.", date: "2025-01-15" },
  { title: "Vanilla JS vs Frameworks", excerpt: "Sometimes less is more — why I prefer building small projects without frameworks.", content: "Frameworks like React and Vue are powerful, but they also add complexity. For many projects, vanilla JS is faster, simpler, and keeps bundle sizes small.", date: "2024-12-20" }
];

// ---- Pages ----
const HomePage = () =>
  createElement("section", { id: "home" }, [
    createElement("div", { class: "hero" }, [
      createElement("h1", {}, ["Hi, I'm Aalok Yadav"]),
      createElement("p", {}, ["Full-stack Developer (Golang, MongoDB, Vanilla JS)"]),
      createElement("button", { class: "cta-btn", events: { click: () => navigate("/projects") } }, ["View My Work"])
    ])
  ]);

const ProjectsPage = () =>
  createElement("section", { id: "projects" }, [
    createElement("h2", {}, ["Projects"]),
    createElement("div", { class: "grid" },
      projects.map((p, i) =>
        createElement("div", { class: "card" }, [
          p.image ? createElement("img", { src: p.image, alt: p.title }) : null,
          createElement("h3", {}, [p.title]),
          createElement("p", {}, [p.description]),
          createElement("button", { class: "btn-small", events: { click: () => navigate("/project", { id: i }) } }, ["Details"])
        ])
      )
    )
  ]);

const ProjectDetailsPage = ({ id }) => {
  const p = projects[id];
  if (!p) return createElement("p", {}, ["Project not found."]);
  return createElement("section", { id: "project-details" }, [
    createElement("h2", {}, [p.title]),
    p.image ? createElement("img", { src: p.image, alt: p.title }) : null,
    createElement("p", {}, [p.details || p.description]),
    p.stack ? createElement("ul", { class: "stack" }, p.stack.map(s => createElement("li", {}, [s]))) : null,
    createElement("div", { class: "links" }, [
      p.github ? createElement("a", { href: p.github, target: "_blank" }, ["GitHub"]) : null,
      p.live ? createElement("a", { href: p.live, target: "_blank" }, ["Live Demo"]) : null
    ])
  ]);
};

const BlogPage = () =>
  createElement("section", { id: "blog" }, [
    createElement("h2", {}, ["Blog"]),
    createElement("div", { class: "grid" },
      posts.map((post, i) =>
        createElement("div", { class: "card" }, [
          createElement("h3", {}, [post.title]),
          createElement("p", {}, [post.excerpt]),
          createElement("button", { class: "btn-small", events: { click: () => navigate("/post", { id: i }) } }, ["Read More"])
        ])
      )
    )
  ]);

const PostDetailsPage = ({ id }) => {
  const p = posts[id];
  if (!p) return createElement("p", {}, ["Post not found."]);
  return createElement("section", { id: "post-details" }, [
    createElement("h2", {}, [p.title]),
    createElement("small", {}, [p.date]),
    createElement("p", {}, [p.content])
  ]);
};

const AboutPage = () =>
  createElement("section", { id: "about" }, [
    createElement("h2", {}, ["About Me"]),
    createElement("p", {}, ["I’m a backend-focused developer with strong skills in Golang, MongoDB, and vanilla JavaScript. I enjoy building fast, minimal, and reliable applications."])
  ]);

const ContactPage = () =>
  createElement("section", { id: "contact" }, [
    createElement("h2", {}, ["Contact"]),
    createElement("p", {}, ["Let’s connect and collaborate!"]),
    createElement("a", { href: "mailto:Aalok@example.com" }, ["Aalok@example.com"])
  ]);

// ---- Router ----
const routes = { 
  "/": HomePage,
  "/projects": ProjectsPage,
  "/project": ProjectDetailsPage,
  "/blog": BlogPage,
  "/post": PostDetailsPage,
  "/about": AboutPage,
  "/contact": ContactPage
};

// Navigate using History API
function navigate(path, params = {}) {
  const url = path + (Object.keys(params).length ? "?" + new URLSearchParams(params).toString() : "");
  window.history.pushState({ path, params }, "", url);
  render(path, params);
}

// Parse path and query params
function getRouteFromPath() {
  const path = window.location.pathname || "/";
  const params = {};
  new URLSearchParams(window.location.search).forEach((v, k) => params[k] = v);
  return { path: path in routes ? path : "/", params };
}

// Render page
async function render(path, params = {}) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const themeBtn = createElement("button", { class: "theme-toggle" }, [document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"]);
  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
    themeBtn.textContent = dark ? "🌙" : "☀️";
    localStorage.setItem("theme", dark ? "light" : "dark");
  });

  const header = createElement("header", {}, [
    createElement("div", { class: "logo" }, [createElement("h1", {}, ["Aalok Yadav"])]),
    createElement("nav", {}, [
      createElement("ul", {}, [
        ...["/", "/projects", "/blog", "/about", "/contact"].map(r =>
          createElement("li", {}, [
            createElement("a", { href: r, events: { click: e => { e.preventDefault(); navigate(r); } } }, [r === "/" ? "Home" : r.slice(1).charAt(0).toUpperCase() + r.slice(2)])
          ])
        )
      ])
    ]),
    themeBtn
  ]);

  const page = await routes[path](params);
  const footer = createElement("footer", {}, [createElement("p", {}, ["© 2025 Aalok Yadav"])]);

  app.append(header, createElement("main", {}, [page]), footer);
}

// ---- Init ----
if (localStorage.getItem("theme") === "dark") document.documentElement.setAttribute("data-theme", "dark");

window.addEventListener("popstate", () => {
  const { path, params } = getRouteFromPath();
  render(path, params);
});

// Initial render
const { path, params } = getRouteFromPath();
render(path, params);
