// ---- Utilities ----
const createElement = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "events") for (const [e, fn] of Object.entries(v)) el.addEventListener(e, fn);
    else if (k === "class") el.classList.add(...v.split(" "));
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k in el) el[k] = v;
    else el.setAttribute(k, v);
  }
  [].concat(children).forEach(c => {
    if (c || c === 0) el.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(c) : c);
  });
  return el;
};

// ---- Projects & Blog Data ----
// Replace with your full projects and posts arrays
const projects = [
  { title: "ShowSaw", description: "A website to browse and create events and buy tickets", details: "httprouter", stack: ["JavaScript","Golang","MongoDB","Redis"], image: "./assets/showsaw.avif", github: "https://github.com/aalokyadav96/fishstick", live: "https://showsaw.netlify.app/" },
  { title: "Gyfget", description: "Salvaged Gfycat.com's frontend before it shut down.", details: "Gorilla Mux", stack: ["React.js","Golang","MongoDB","Redis"], image: "./assets/gyfget.jpg", github: "#", live: "https://gyfget.onrender.com/" },
  { title: "Imigi", description: "A JavaScript web app that uses FFMPEG to apply filters to photos.", details: "Lightweight tool to upload, filter, and download images effortlessly.", stack: ["JavaScript","Golang","FFMPEG"], image: "./assets/imigi.jpg", github: "https://github.com/aalokyadav96/vichitr", live: "https://imigi.onrender.com/" },
  { title: "Locazon", description: "Web app with geolocation APIs to connect users with nearby services.", details: "Built with Golang + MySQL backend.", stack: ["JavaScript","Golang","MySQL"], image: "", github: "#", live: "https://atapi-vatapi.onrender.com" },
  { title: "Blog", description: "Personal Blog.", details: "", image: "./assets/aalokyadav.avif", github: "#", live: "https://aalokyadav.netlify.app/" },
  { title: "Qualms", description: "SPA with pure JavaScript and state-based routing.", details: "Backend built in Golang.", stack: ["JavaScript","Golang"], image: "", github: "#", live: "#" }
];

const posts = [
  { title: "Building a Portfolio SPA with Vanilla JS", excerpt: "How I built my portfolio with no frameworks, just state-based routing and clean components.", content: "This project was about exploring the fundamentals of SPAs using only vanilla JavaScript. No frameworks, no libraries. Just DOM manipulation and state management.", date: "2025-02-10" },
  { title: "Why I Use Golang for Backend", excerpt: "Golang offers simplicity, concurrency, and great performance for web apps.", content: "I started with Node.js, but Golang quickly became my go-to for backend development. It’s fast, compiled, and has first-class support for concurrency with goroutines.", date: "2025-01-15" },
  { title: "Vanilla JS vs Frameworks", excerpt: "Sometimes less is more — why I prefer building small projects without frameworks.", content: "Frameworks like React and Vue are powerful, but they also add complexity. For many projects, vanilla JS is faster, simpler, and keeps bundle sizes small.", date: "2024-12-20" }
];

// ---- Pages ----
const HomePage = () => createElement("section", { class: "hero" }, [
  createElement("h1", {}, ["Hi, I'm Aalok Yadav"]),
  createElement("p", {}, ["Full-stack Developer (Golang, MongoDB, Vanilla JS)"]),
  createElement("button", { class: "cta-btn", events: { click: () => navigate("/projects") } }, ["View My Work"])
]);

// --- Projects ---
const ProjectsPage = () => {
  const searchInput = createElement("input", { type: "text", placeholder: "Search projects..." });
  const techSelect = createElement("select", {}, [createElement("option", { value: "" }, ["All"])]);
  Array.from(new Set(projects.flatMap(p => p.stack || []))).forEach(t => techSelect.appendChild(createElement("option", { value: t }, [t])));
  
  const filterDiv = createElement("div", { class: "projects-controls" }, [
    createElement("label", {}, ["Filter by Tech: "]), techSelect,
    searchInput
  ]);

  const grid = createElement("div", { class: "grid" }, projects.map((p,i) => createProjectCard(p,i)));

  function filterProjects() {
    const term = searchInput.value.toLowerCase();
    const tech = techSelect.value;
    const filtered = projects.filter(p => {
      const matchTech = tech ? (p.stack||[]).includes(tech) : true;
      const matchTerm = term ? p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) : true;
      return matchTech && matchTerm;
    });
    const newGrid = createElement("div", { class: "grid" }, filtered.map((p,i) => createProjectCard(p,i)));
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(filterDiv,newGrid);
  }

  searchInput.addEventListener("input", filterProjects);
  techSelect.addEventListener("change", filterProjects);

  return createElement("section", {}, [filterDiv, grid]);
};

function createProjectCard(p,i) {
  return createElement("div",{class:"card"},[
    p.image ? createElement("img",{src:p.image,alt:p.title,loading:"lazy"}):null,
    createElement("h3",{},[p.title]),
    createElement("p",{},[p.description]),
    p.stack ? createElement("div",{class:"stack-tags"},p.stack.map(t=>createElement("span",{},[t]))):null,
    createElement("div",{class:"card-buttons"},[
      createElement("button",{class:"btn-small",events:{click:()=>navigate("/project",{id:i})}} ,["Details"]),
      p.github ? createElement("a",{href:p.github,target:"_blank",class:"btn-small"},["GitHub"]):null,
      p.live ? createElement("a",{href:p.live,target:"_blank",class:"btn-small"},["Live"]):null
    ])
  ]);
}

const ProjectDetailsPage = ({id})=>{
  const p = projects[id];
  if(!p) return createElement("p",{},["Project not found."]);
  return createElement("section",{},[
    createElement("h2",{},[p.title]),
    p.image ? createElement("img",{src:p.image,alt:p.title,loading:"lazy"}):null,
    createElement("p",{},[p.details||p.description]),
    p.stack ? createElement("ul",{},p.stack.map(s=>createElement("li",{},[s]))):null,
    createElement("div",{class:"card-buttons"},[
      p.github ? createElement("a",{href:p.github,target:"_blank",class:"btn-small"},["GitHub"]):null,
      p.live ? createElement("a",{href:p.live,target:"_blank",class:"btn-small"},["Live"]):null
    ])
  ]);
};

// ---- Blog ----
const BlogPage = ()=>{
  const searchInput = createElement("input",{type:"text",placeholder:"Search posts..."});
  const filterDiv = createElement("div",{class:"projects-controls"},[
    createElement("label",{},["Search Blog: "]),searchInput
  ]);
  const grid = createElement("div",{class:"grid"},posts.map((p,i)=>createPostCard(p,i)));

  function filterPosts(){
    const term = searchInput.value.toLowerCase();
    const filtered = posts.filter(post=>post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term));
    const newGrid = createElement("div",{class:"grid"},filtered.map((p,i)=>createPostCard(p,i)));
    const main = document.querySelector("main");
    main.innerHTML="";
    main.append(filterDiv,newGrid);
  }

  searchInput.addEventListener("input",filterPosts);

  return createElement("section",{},[filterDiv,grid]);
};

function createPostCard(post,i){
  return createElement("div",{class:"card"},[
    createElement("h3",{},[post.title]),
    createElement("p",{},[post.excerpt]),
    createElement("small",{},[post.date]),
    createElement("button",{class:"btn-small",events:{click:()=>navigate("/post",{id:i})}},["Read More"])
  ]);
}

const PostDetailsPage = ({id})=>{
  const post = posts[id];
  if(!post) return createElement("p",{},["Post not found."]);
  return createElement("section",{},[
    createElement("h2",{},[post.title]),
    createElement("small",{},[post.date]),
    createElement("p",{},[post.content])
  ]);
};

// ---- About & Contact ----
const AboutPage = ()=>createElement("section",{},[
  createElement("h2",{},["About Me"]),
  createElement("p",{},["I’m a backend-focused developer with strong skills in Golang, MongoDB, and vanilla JavaScript. I enjoy building fast, minimal, and reliable applications."])
]);

const ContactPage = ()=>createElement("section",{},[
  createElement("h2",{},["Contact"]),
  createElement("p",{},["Let’s connect and collaborate!"]),
  createElement("a",{href:"mailto:Aalok@example.com"},["Aalok@example.com"]),
  createElement("button",{class:"btn-small",events:{click:()=>navigator.clipboard.writeText("Aalok@example.com")}} ,["Copy Email"])
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

// ---- Navigation & Render ----
function navigate(path, params={}){
  const url = new URL(window.location.origin + path);
  Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));
  const scroll = window.scrollY;
  window.history.pushState({path,params,scroll},"",url.pathname+url.search);
  render(path,params);
}

async function render(path, params={}){
  const app = document.getElementById("app");
  app.classList.add("fade-out");
  await new Promise(r=>setTimeout(r,150));
  app.innerHTML="";
  app.classList.remove("fade-out");

  document.title=`Aalok Yadav - ${path==="/"?"Home":path.replace("/","").toUpperCase()}`;

  const themeBtn = createElement("button",{class:"theme-toggle"},[document.documentElement.getAttribute("data-theme")==="dark"?"☀️":"🌙"]);
  themeBtn.addEventListener("click",()=>{
    const dark=document.documentElement.getAttribute("data-theme")==="dark";
    document.documentElement.setAttribute("data-theme",dark?"light":"dark");
    themeBtn.textContent = dark?"🌙":"☀️";
    localStorage.setItem("theme",dark?"light":"dark");
  });

  const header = createElement("header",{},[
    createElement("div",{class:"logo"},[createElement("h1",{},["Aalok Yadav"])]),
    createElement("nav",{},[
      createElement("ul",{},["","projects","blog","about","contact"].map(p=>
        createElement("li",{},[createElement("a",{href:p?`/${p}`:"/",events:{click:e=>{e.preventDefault();navigate(p?`/${p}`:"/");}}},[p?p[0].toUpperCase()+p.slice(1):"Home"])]))
      )
    ]),
    themeBtn
  ]);

  const page = await routes[path](params);
  const footer = createElement("footer",{},[createElement("p",{},["© 2025 Aalok Yadav"])]);

  app.append(header,createElement("main",{},[page]),footer);

  app.classList.add("fade-in");
  setTimeout(()=>app.classList.remove("fade-in"),300);
}

// ---- Init ----
if(localStorage.getItem("theme")==="dark") document.documentElement.setAttribute("data-theme","dark");

window.addEventListener("popstate", e=>{
  const state = e.state || {path:"/",params:{},scroll:0};
  render(state.path,state.params).then(()=>window.scrollTo(0,state.scroll));
});

render(window.location.pathname,Object.fromEntries(new URLSearchParams(window.location.search)));
