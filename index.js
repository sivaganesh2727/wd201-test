const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command-line arguments for port
const args = minimist(process.argv.slice(2));
const PORT = args.port || 3000;

let homeContent = "<h1>Home page not available</h1>";
let projectContent = "<h1>Project page not available</h1>";
let registrationContent = "<h1>Registration page not available</h1>";

// Load files asynchronously with default fallback content
fs.readFile("home.html", (err, home) => {
  if (err) {
    console.error("Error reading home.html:", err.message);
  } else {
    homeContent = home;
  }
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    console.error("Error reading project.html:", err.message);
  } else {
    projectContent = project;
  }
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    console.error("Error reading registration.html:", err.message);
  } else {
    registrationContent = registration;
  }
});

// Create HTTP server
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        if (projectContent) {
          response.write(projectContent);
        } else {
          response.write("<h1>Project page not found</h1>");
        }
        break;

      case "/registration":
        if (registrationContent) {
          response.write(registrationContent);
        } else {
          response.write("<h1>Registration page not found</h1>");
        }
        break;

      default:
        if (homeContent) {
          response.write(homeContent);
        } else {
          response.write("<h1>Home page not found</h1>");
        }
        break;
    }
    response.end();
  })
  .listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  });
