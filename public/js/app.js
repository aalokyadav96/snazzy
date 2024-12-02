// Array of projects
const projects = [
  {
    title: 'ShowSaw ',
    description: 'A website to browse and create events and buy tickets',
    details: 'httprouter',
    stack: ["JavaScript","Golang","MongoDB","Redis"],
    image: './assets/showsaw.avif',
    github: 'https://github.com/aalokyadav96/fishstick',
    live: 'https://showsaw.netlify.app/'
  },
  {
    title: 'Gyfget',
    description: "Salvaged Gfycat.com's frontend before it shut down.",
    details: 'Gorilla Mux',
    stack: ["React.js","Golang","MongoDB","Redis"],
    image: './assets/gyfget.jpg',
    github: '#',//https://github.com/Tyuzu/glue
    live: 'https://gyfget.onrender.com/'
  },
  {
    title: 'Imigi',
    description: 'A JavaScript web app that uses FFMPEG to apply filters to photos.',
    details: 'Imigi is a lightweight image-processing tool built for speed and simplicity. It allows users to upload, filter, and download images effortlessly.',
    stack: ["JavaScript","Golang","FFMPEG"],
    image: './assets/imigi.jpg',
    github: 'https://github.com/aalokyadav96/vichitr',
    live: 'https://imigi.onrender.com/'
  },
  {
    title: 'Locazon',
    description: 'A Web app built with pure JavaScript. API built with Golang.',
    details: 'Locazon integrates geolocation APIs to connect users with nearby services, providing an interactive and location-aware experience.',
    stack: ["JavaScript","Golang","MySQL"],
    image: '',
    github: '#',
    live: 'https://atapi-vatapi.onrender.com'
  },
  {
    title: 'Blog',
    description: 'Personal Blog.',
    details: '',
    image: './assets/aalokyadav.avif',
    github: '#',
    live: 'https://aalokyadav.netlify.app/'
  },
  {
    title: 'Qualms',
    description: 'A Web app built with pure JavaScript, using state-based routing. Backend in Golang.',
    details: 'Qualms explores modern web technologies to deliver an SPA experience with a focus on state-based routing and dynamic UI.',
    stack: ["JavaScript","Golang","Redis"],
    image: '',
    github: 'https://github.com/aalokyadav96/friendly-palm-tree',
    live: 'https://qualms.onrender.com'
  }
];

// Utility to handle errors in fetch
function handleError(error, content) {
  console.error(error);
  content.innerHTML = `<p>Error: Unable to load content. Please try again later.</p>`;
}

// Function to render the homepage
function renderHome() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Welcome to My Portfolio</h2>
    <p>Hello, I'm Aalok Yadav, a passionate web developer. Feel free to explore my projects and get in touch.</p>
  `;
}

// Function to render the homepage
function renderAbout() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>About</h2>
    <p>AboutPage.</p>
  `;
}

// Function to render the homepage
function renderContact() {
  const content = document.getElementById('content');
  content.innerHTML = `
  <h2>Contact</h2>
  <p>ContactPage.</p>
  `;
}

// Function to render Projects gallery
function renderProjects() {
  const base64img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";
  const content = document.getElementById('content');
  const galleryHTML = `
    <h2>My Projects</h2>
    <span>Click cards for details</span><br><br>
    <div class="gallery">
      ${projects
        .map((project, index) => `
          <div class="project-card" data-index="${index}">
          <img src="${project.image ? project.image : base64img}" alt="${project.title}" loading="lazy"/>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="links">
              <a href="${project.github}" target="_blank">GitHub</a>
              <a href="${project.live}" target="_blank">Live Demo</a>
            </div>
          </div>
        `)
        .join('')}
    </div>
  `;
  content.innerHTML = galleryHTML;

  // Add click event listeners to project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const index = card.getAttribute('data-index');
      renderProjectDetails(index);
    });
  });
}


//<!--img src="${project.image}" alt="${project.title}" loading="lazy" /-->
//<--img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${project.title}" loading="lazy" /-->


// Function to render detailed project view
function renderProjectDetails(index) {
  const content = document.getElementById('content');
  const project = projects[index];
  if (!project) {
    handleError(new Error('Invalid project index'), content);
    return;
  }

  content.innerHTML = `
    <div class="project-details">
      <button id="back-to-projects">Back to Projects</button>
      <h2>${project.title}</h2>
      <p>${project.details}</p>
      <!--img src="${project.image}" alt="${project.title}" loading="lazy" /-->
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="${project.title}" loading="lazy" />
      <div class="links">
        <a href="${project.github}" target="_blank"><button>GitHub</button></a>
        <a href="${project.live}" target="_blank"><button>Live Demo</button></a>
      </div>
    </div>
  `;

  document.getElementById('back-to-projects').addEventListener('click', renderProjects);
}

// Function to render Blog section
function renderBlog() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <section>
      <h2>Blog Posts</h2>
      <main><p>A collection of blog posts covering design and development of lots of things.</p><article><span class="mini-note">Jan 2, 2024</span><h3><a href="/mongod-commands-codes">MongoDB CRUD code snippets</a></h3></article><article><span class="mini-note">Dec 14, 2023</span><h3><a href="https://aalokyadav.netlify.app/reverse-engineering-websites">Reverse Engineering React.js based Websites and their APIs</a></h3></article><article><span class="mini-note">Aug 10, 2023</span><h3><a href="/creating-images">How to create images from code</a></h3></article><article><span class="mini-note">Aug 10, 2023</span><h3><a href="/first-post">First Post</a></h3></article></main>
    </section>
  `;
}

// Function to render content based on the current route
function renderContent(route) {
  const routes = {
    home: renderHome,
    about: renderAbout,
    blog: renderBlog,
    projects: renderProjects,
    contact: renderContact
  };

  (routes[route] || renderHome)();
}

// Function to initialize the app
function init() {
  const initialRoute = window.location.hash.replace('#', '') || 'home';
  renderContent(initialRoute);

  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const route = link.getAttribute('data-link');
      window.history.pushState({ route }, route, `#${route}`);
      renderContent(route);
      updateActiveLink(route);
    });
  });

  window.addEventListener('popstate', event => {
    const route = event.state ? event.state.route : 'home';
    renderContent(route);
    updateActiveLink(route);
  });

  updateActiveLink(initialRoute);
}

// Function to update active navigation link
function updateActiveLink(route) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-link') === route);
  });
}

// Run the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
