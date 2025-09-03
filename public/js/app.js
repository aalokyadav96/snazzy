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
  { title: "ShowSaw", description: "Event platform to browse, create, and purchase tickets effortlessly.", details: "Built a Golang backend with Redis caching and MongoDB storage to ensure fast load times. Clean JS frontend for browsing events and managing tickets.", stack: ["JavaScript","Golang","MongoDB","Redis"], image: "./assets/showsaw.avif", github: "https://github.com/aalokyadav96/fishstick", live: "https://showsaw.netlify.app/" },
  { title: "Gyfget", description: "Revived the Gfycat experience for users after its shutdown.", details: "Modern frontend in React.js with Golang API backend. Redis caching optimizes GIF serving, MongoDB stores user data.", stack: ["React.js","Golang","MongoDB","Redis"], image: "./assets/gyfget.jpg", github: "#", live: "https://gyfget.onrender.com/" },
  { title: "Imigi", description: "Photo filter app with instant previews and downloads.", details: "Lightweight image processing app using JS and FFMPEG. Concurrent processing for multiple uploads.", stack: ["JavaScript","Golang","FFMPEG"], image: "./assets/imigi.jpg", github: "https://github.com/aalokyadav96/vichitr", live: "https://imigi.onrender.com/" },
  { title: "Locazon", description: "Connects users to nearby services using geolocation APIs.", details: "Geo-aware web app with Golang backend + MySQL. Real-time location tracking with JS APIs.", stack: ["JavaScript","Golang","MySQL"], image: "", github: "#", live: "https://atapi-vatapi.onrender.com" },
  { title: "Personal Blog", description: "My personal thoughts and experiences on coding and web development.", details: "Built entirely in vanilla JS as a SPA with clean components and minimal dependencies.", stack: ["JavaScript"], image: "./assets/aalokyadav.avif", github: "#", live: "https://aalokyadav.netlify.app/" },
  { title: "Qualms", description: "SPA demonstrating pure JS routing and state management.", details: "Designed for performance and minimalism. Backend built in Golang.", stack: ["JavaScript","Golang"], image: "", github: "#", live: "#" },
  { title: "TaskMaster", description: "Productivity app to manage and track daily tasks efficiently.", details: "Dynamic SPA with JS frontend and Golang API. Real-time updates via WebSockets.", stack: ["JavaScript","Golang","MongoDB","WebSockets"], image: "", github: "#", live: "#" },
  { title: "CodeSnippets", description: "Share, discover, and save code snippets online.", details: "Platform for posting and searching snippets. MongoDB backend, JS frontend.", stack: ["JavaScript","Golang","MongoDB"], image: "", github: "#", live: "#" },
  { title: "CryptoTracker", description: "Real-time cryptocurrency tracking dashboard.", details: "Connected multiple APIs for live prices. Charts in vanilla JS, caching with Golang.", stack: ["JavaScript","Golang"], image: "", github: "#", live: "#" },
  { title: "FitLogger", description: "Track workouts and fitness goals with a minimal interface.", details: "SPA with JS frontend and Golang backend for secure data storage.", stack: ["JavaScript","Golang","MongoDB"], image: "", github: "#", live: "#" },
  { title: "DevConnect", description: "Small social platform for developers to connect and share projects.", details: "Real-time messaging and project sharing. JS frontend, Golang backend, MongoDB storage.", stack: ["JavaScript","Golang","MongoDB","WebSockets"], image: "", github: "#", live: "#" }
];

// ---- Blog Data ----
const posts = [
  { title: "Building a Portfolio SPA with Vanilla JS", excerpt: "I built a full portfolio SPA from scratch using only vanilla JS.", content: "This project taught me DOM manipulation, state management, and dynamic routing without frameworks. Focused on reusable components, fast load, and responsive design.", date: "2025-02-10" },
  { title: "Why I Use Golang for Backend", excerpt: "Why Golang became my go-to backend language for performance and simplicity.", content: "Golang offers speed, simplicity, and concurrency. APIs handle thousands of requests efficiently while keeping code clean.", date: "2025-01-15" },
  { title: "Vanilla JS vs Frameworks", excerpt: "Sometimes less is more when building small apps.", content: "Frameworks add overhead. Vanilla JS gives full control, smaller bundles, and faster load times.", date: "2024-12-20" },
  { title: "Optimizing Web Apps with Redis", excerpt: "How I leveraged Redis caching to improve load times.", content: "By caching frequently accessed data, response times improved up to 70%, creating smooth experiences under load.", date: "2024-11-15" },
  { title: "Building Real-Time Apps with WebSockets", excerpt: "Techniques for creating fast, responsive real-time apps.", content: "Implemented WebSocket features in TaskMaster and DevConnect, enabling real-time updates without full reloads.", date: "2024-10-10" }
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

const ProjectsPage = () => {
  const filterDiv = createElement("div", { style: { marginBottom: "1em" } }, [
    createElement("label", {}, ["Filter by Tech: "]),
    (() => {
      const techs = Array.from(new Set(projects.flatMap(p => p.stack || [])));
      const select = createElement("select", { events: { change: e => filterProjects(e.target.value) } }, [
        createElement("option", { value: "" }, ["All"])
      ]);
      techs.forEach(t => select.appendChild(createElement("option", { value: t }, [t])));
      return select;
    })()
  ]);

  const grid = createElement("div", { class: "grid" }, projects.map((p, i) =>
    createElement("div", { class: "card", style: { transition: "0.3s", cursor: "pointer", padding: "1em", border: "1px solid #ddd", borderRadius: "8px" }, events: { mouseenter: e => e.currentTarget.style.transform="scale(1.03)", mouseleave: e => e.currentTarget.style.transform="scale(1)" } }, [
      p.image ? createElement("img", { src: p.image, alt: p.title, style: { width: "100%", borderRadius: "8px" } }) : null,
      createElement("h3", {}, [p.title]),
      createElement("p", {}, [p.description]),
      p.stack ? createElement("div", { class: "stack-tags", style: { margin: "0.5em 0" } }, p.stack.map(tag => createElement("span", { style: { marginRight: "5px", padding: "2px 6px", background: "#eee", borderRadius: "4px", fontSize: "0.8em" } }, [tag]))) : null,
      createElement("div", { style: { display: "flex", gap: "0.5em", marginTop: "0.5em" } }, [
        createElement("button", { class: "btn-small", events: { click: () => navigate("/project", { id: i }) } }, ["Details"]),
        p.github ? createElement("a", { href: p.github, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#333", color: "#fff", borderRadius: "4px" } }, ["GitHub"]) : null,
        p.live ? createElement("a", { href: p.live, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#0070f3", color: "#fff", borderRadius: "4px" } }, ["Live"]) : null
      ])
    ])
  ));

  function filterProjects(tech) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    const filtered = tech ? projects.filter(p => p.stack.includes(tech)) : projects;
    const newGrid = createElement("div", { class: "grid" }, filtered.map((p, i) =>
      createElement("div", { class: "card", style: { transition: "0.3s", cursor: "pointer", padding: "1em", border: "1px solid #ddd", borderRadius: "8px" }, events: { mouseenter: e => e.currentTarget.style.transform="scale(1.03)", mouseleave: e => e.currentTarget.style.transform="scale(1)" } }, [
        p.image ? createElement("img", { src: p.image, alt: p.title, style: { width: "100%", borderRadius: "8px" } }) : null,
        createElement("h3", {}, [p.title]),
        createElement("p", {}, [p.description]),
        p.stack ? createElement("div", { class: "stack-tags", style: { margin: "0.5em 0" } }, p.stack.map(tag => createElement("span", { style: { marginRight: "5px", padding: "2px 6px", background: "#eee", borderRadius: "4px", fontSize: "0.8em" } }, [tag]))) : null,
        createElement("div", { style: { display: "flex", gap: "0.5em", marginTop: "0.5em" } }, [
          createElement("button", { class: "btn-small", events: { click: () => navigate("/project", { id: i }) } }, ["Details"]),
          p.github ? createElement("a", { href: p.github, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#333", color: "#fff", borderRadius: "4px" } }, ["GitHub"]) : null,
          p.live ? createElement("a", { href: p.live, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#0070f3", color: "#fff", borderRadius: "4px" } }, ["Live"]) : null
        ])
      ])
    ));
    main.append(filterDiv, newGrid);
  }

  return createElement("section", { id: "projects-page" }, [filterDiv, grid]);
};

const ProjectDetailsPage = ({ id }) => {
  const p = projects[id];
  if (!p) return createElement("p", {}, ["Project not found."]);
  return createElement("section", { id: "project-details" }, [
    createElement("h2", {}, [p.title]),
    p.image ? createElement("img", { src: p.image, alt: p.title, style: { width: "100%", borderRadius: "8px" } }) : null,
    createElement("p", {}, [p.details]),
    p.stack ? createElement("ul", {}, p.stack.map(s => createElement("li", {}, [s]))) : null,
    createElement("div", { style: { display: "flex", gap: "1em", marginTop: "1em" } }, [
      p.github ? createElement("a", { href: p.github, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#333", color: "#fff", borderRadius: "4px" } }, ["GitHub"]) : null,
      p.live ? createElement("a", { href: p.live, target: "_blank", style: { textDecoration: "none", padding: "5px 10px", background: "#0070f3", color: "#fff", borderRadius: "4px" } }, ["Live"]) : null
    ])
  ]);
};

const BlogPage = () =>
  createElement("section", { id: "blog" }, [
    createElement("h2", {}, ["Blog"]),
    createElement("div", { class: "grid" }, posts.map((post, i) =>
      createElement("div", { class: "card", style: { padding: "1em", border: "1px solid #ddd", borderRadius: "8px", transition: "0.3s", cursor: "pointer", marginBottom: "1em" }, events: { mouseenter: e => e.currentTarget.style.transform="scale(1.02)", mouseleave: e => e.currentTarget.style.transform="scale(1)" } }, [
        createElement("h3", {}, [post.title]),
        createElement("small", {}, [post.date]),
        createElement("p", {}, [post.excerpt]),
        createElement("button", { class: "btn-small", events: { click: () => navigate("/post", { id: i }) }, style: { marginTop: "0.5em" } }, ["Read More"])
      ])
    ))
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

// ---- Navigation ----
function navigate(path, params = {}) {
  const url = new URL(window.location.origin + path);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v));
  window.history.pushState({ path, params }, "", url.pathname + url.search);
  render(path, params);
}

async function render(path, params = {}) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Theme toggle
  const themeBtn = createElement("button", { class: "theme-toggle" }, [document.documentElement.getAttribute("data-theme")==="dark"?"☀️":"🌙"]);
  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme")==="dark";
    document.documentElement.setAttribute("data-theme", dark?"light":"dark");
    themeBtn.textContent = dark?"🌙":"☀️";
    localStorage.setItem("theme", dark?"light":"dark");
  });

  const header = createElement("header", {}, [
    createElement("div", { class: "logo" }, [createElement("h1", {}, ["Aalok Yadav"])]),
    createElement("nav", {}, [
      createElement("ul", {}, ["","projects","blog","about","contact"].map(p =>
        createElement("li", {}, [
          createElement("a", { href: p?`/${p}`:"/", events:{click:e=>{e.preventDefault();navigate(p?`/${p}`:"/");}} }, [p? p[0].toUpperCase()+p.slice(1):"Home"])
        ])
      ))
    ]),
    themeBtn
  ]);

  const page = await routes[path](params);
  const footer = createElement("footer", {}, [createElement("p", {}, ["© 2025 Aalok Yadav"])]);

  app.append(header, createElement("main", {}, [page]), footer);
}

// ---- Init ----
if(localStorage.getItem("theme")==="dark") document.documentElement.setAttribute("data-theme","dark");

window.addEventListener("popstate", e => {
  const state = e.state || { path: "/", params: {} };
  render(state.path, state.params);
});

// Initial render
render(window.location.pathname, Object.fromEntries(new URLSearchParams(window.location.search)));
