// app.js

// Array of projects
const projects = [
  {
    title: 'Imigi',
    description: 'A web app built using JavaScript and Golang. Uses FFMPEG to apply filters to uploaded images.',
    image: '#',
    github: '#',
    live: 'https://imigi.onrender.com/'
  },
  {
    title: 'Fromisoda',
    description: 'A full-stack video streaming website made with compiled React.js and Golang and Redis.',
    image: '#',
    github: '#',
    live: 'https://fromisoda.onrender.com'
  },
  {
    title: 'Locazon',
    description: 'A Web app built with pure JavaScript. API built with Golang.',
    image: '#',
    github: '#',
    live: 'https://atapi-vatapi.onrender.com'
  },
  {
    title: 'Qualms',
    description: 'A Web app built with pure JavaScript, using state-based routing. Backend in Golang.',
    image: '#',
    github: 'https://github.com/aalokyadav96/friendly-palm-tree',
    live: 'https://qualms.onrender.com'
  }
];

// Function to render project gallery
function renderProjects() {
  const content = document.getElementById('content');
  const galleryHTML = `
    <h1>My Projects</h1>
    <div class="gallery">
      ${projects
        .map(project => `
          <div class="project-card">
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
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
}

// Function to render About me section
function renderAbout() {
  const content = document.getElementById('content');
  const aboutHTML = `
  <section id="resume">
  <div class="resume-container">
    <div class="header">
      <!--div class="avatar">
        <img src="https://via.placeholder.com/150" alt="Your Photo">
      </div-->
      <div class="personal-info">
        <h1>Aalok Yadav</h1>
        <p>Haryana, India, 123001</p>
        <p>aalokyadav96@gmail.com</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/aalokyadav" target="_blank">LinkedIn</a>
          <a href="https://github.com/aalokyadav96" target="_blank">GitHub</a>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>About Me</h2>
      <p>
        I am a creative full-stack developer with a strong focus on building scalable and efficient web applications. I specialize in JavaScript and Golang, and I'm always looking to learn and implement new technologies.
      </p>
    </div>

    <div class="section">
      <h2>Skills</h2>
      <ul>
        <li><strong>Front-End: </strong>HTML5, CSS3, JavaScript, Typescript</li>
        <li><strong>Languages: </strong>Golang, Python, Browser APIs, React.js</li>
        <li><strong>Backend: </strong>REST APIs, CORS, JWT, Flask, Vite</li>
        <li><strong>Database: </strong>MongoDB, PostgreSQL, Redis, MySQL</li>
        <li><strong>Testing: </strong>Integration Testing, SDLC, Fuzzing</li>
        <li><strong>Design: </strong>UI/UX Design, Figma, FFMPEG</li>
        <li><strong>Misc: </strong>SAP ERP, Linux, Cryptography</li>
      </ul>
    </div>

    <div class="section">
      <h2>Experience</h2>
      <div class="job">
        <h3>Software Developer (Golang) | Mobile Programming LLC</h3>
        <p class="duration">(Oct 2022 – Jul 2023)</p>
        <ul>
          <li>Developed REST APIs and microservices in Go and Node.js, enhancing functionality and
          increasing concurrent user handling capacity by 47%.</li>
          <li>Designed and implemented a state-based routing frontend in TypeScript, utilizing CI/CD practices
          via GitLab, Jenkins, and Kubernetes.</li>
          <li>Optimized API response in the client’s Flutter app, achieving a 15% performance improvement.</li>
          <li>Integrated third-party services and APIs using TCP sockets and RabbitMQ for Pub/Sub.</li>
          <li>Implemented automated testing which reduced testing time by 75%.</li>
          <li>Led a team of 5 members, including developers and QA analysts.</li>
        </ul>
      </div>
      
      <div class="job">
        <h3>Systems Engineer | Tata Consultancy services</h3>
        <p class="duration">(Nov 2019– May 2022)</p>
        <ul>
          <li>Created a microservice-based equipment ordering website using Python, Golang, and React.js, improving order efficiency.</li>
          <li>Integrated client supply chain processes with internal websites and SAP systems, automating warehouse operations through SOAP and REST APIs.</li>
          <li>Supported testing and user support for 27 software releases across 18 countries, enhancing global operational efficiency</li>
          <li>Received A Grade in performance appraisals for consistently delivering high-quality results.</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <h2>Education</h2>
      <div class="education">
        <h3>Bachelor's Degree in Computer Science</h3>
        <p class="institution">Lovely Professional University, Punjab</p>
        <p class="duration">2015 - 2019</p>
        <p>Graduated with honors and gained solid knowledge in algorithms, data structures, and software engineering.</p>
      </div>
    </div>

    <div class="section">
      <h2>Awards and Accomplishments</h2>
      <div class="education">
        <p>$5000 bug bounty by Google for finding remote code execution vulnerability in Android and chrome.</p>
      </div>
    </div>

    <div class="footer">
      <p>© 2024 Aalok Yadav</p>
    </div>
  </div>
</section>  `;
  content.innerHTML = aboutHTML;
}

// Function to render Contact section
function renderContact() {
  const content = document.getElementById('content');
  const contactHTML = `
    <h1>Contact Me</h1>
    <p>Feel free to reach out via email or follow me on social media!</p>
    <footer>
      <p>Follow me on:</p>
      <a href="https://www.linkedin.com/in/aalokyadav" target="_blank"><img src="https://static.licdn.com/aero-v1/sc/h/8s162nmbcnfkg7a0k8nq9wwqo" alt="LinkedIn" /></a>
      <a href="https://github.com/aalokyadav96" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub" /></a>
      <!--a href="https://twitter.com/yourusername" target="_blank"><img src="twitter-icon.png" alt="Twitter" /></a-->
    </footer>
  `;
  content.innerHTML = contactHTML;
}

// Function to render Blog section
// function renderBlog() {
//   const content = document.getElementById('content');
//   const blogHTML = `
//     <section>
//       <h1>Blog Posts</h1>
//       <p>Coming soon! Stay tuned for updates on web development, design, and more.</p>
//     </section>
//   `;
//   content.innerHTML = blogHTML;
// }
function renderBlog() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <section>
      <h1>Blog Posts</h1>
      <p>Loading blog posts...</p>
    </section>
  `; // Initial loading message
  
  // Fetch the blog data from the API
  fetch('https://aalokyadav96.netlify.app/api/blogposts')
    .then(response => {
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      // If the API returns data, render it
      if (data && data.posts && Array.isArray(data.posts)) {
        const postsHTML = data.posts.map(post => {
          return `
            <div class="blog-post">
              <h2>${post.title}</h2>
              <p>${post.excerpt}</p>
              <a href="${post.url}" target="_blank">Read more</a>
            </div>
          `;
        }).join('');
        
        content.innerHTML = `
          <section>
            <h1>Blog Posts</h1>
            <div class="blog-posts">
              ${postsHTML}
            </div>
          </section>
        `;
      } else {
        content.innerHTML = `
          <section>
            <h1>Blog Posts</h1>
            <p>No blog posts found.</p>
          </section>
        `;
      }
    })
    .catch(error => {
      // Handle errors and show a message to the user
      console.error('Error fetching blog posts:', error);
      content.innerHTML = `
        <section>
          <h1>Blog Posts</h1>
          <p>Sorry, there was an error loading the blog posts. Please try again later.</p>
        </section>
      `;
    });
}

// let exampleAPI = {
//   "posts": [
//     {
//       "title": "How to Build a Portfolio with JavaScript",
//       "excerpt": "In this post, I walk you through building a portfolio website from scratch using JavaScript and a little bit of CSS.",
//       "url": "https://your-blog.com/portfolio-building"
//     },
//     {
//       "title": "Understanding Asynchronous JavaScript",
//       "excerpt": "This post explains asynchronous programming in JavaScript, including callbacks, promises, and async/await.",
//       "url": "https://your-blog.com/async-javascript"
//     }
//   ]
// }


// Function to render the homepage
function renderHome() {
  const content = document.getElementById('content');
  const homeHTML = `
    <h1>Welcome to My Portfolio</h1>
    <p>Hello, I'm Aalok Yadav, a passionate web developer. Feel free to explore my projects and get in touch.</p>
  `;
  content.innerHTML = homeHTML;
}

// Function to render content based on the current route
function renderContent(route) {
  switch (route) {
    case 'home':
      renderHome();
      break;
    case 'about':
      renderAbout();
      break;
    case 'blog':
      renderBlog();
      break;
    case 'projects':
      renderProjects();
      break;
    case 'contact':
      renderContact();
      break;
    default:
      document.getElementById('content').innerHTML = `<h1>Welcome to My Portfolio</h1><p>This is my homepage.</p>`;
      break;
  }
}

// Function to handle link clicks and update history state
function handleLinkClick(event) {
  event.preventDefault();
  const route = event.target.getAttribute('data-link');
  window.history.pushState({ route }, route, `#${route}`);
  renderContent(route);
  updateActiveLink(route); // Update active link
}

// Function to handle browser navigation (back, forward)
function handlePopState(event) {
  const route = event.state ? event.state.route : 'home';
  renderContent(route);
  updateActiveLink(route); // Update active link on history change
}

// Function to update active navigation link
function updateActiveLink(route) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.getAttribute('data-link') === route) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Function to initialize the app
function init() {
  const initialRoute = window.location.hash.replace('#', '') || 'home';
  renderContent(initialRoute);

  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });

  window.addEventListener('popstate', handlePopState);
  
  // Initial active link update
  updateActiveLink(initialRoute);
}

// Run the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Dark Mode Toggle Functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Attach event listener for dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', toggleDarkMode);
}
