# Simple Node.js Web Server

A professional implementation of a web server using the native Node.js `http` module. This project demonstrates routing, static file serving, and error handling.

## Setup Instructions
1. Initialize the project: `npm install`
2. Start the server: `npm start`
3. Access via: `http://localhost:3000`

## Features
- **Dynamic Routing:** Handles `/home`, `/about`, and `/contact`.
- **Static Assets:** Serves linked CSS files correctly.
- **Custom Error Handling:** Automatically directs invalid URLs to a `404.html` page.
- **Efficient I/O:** Uses asynchronous `fs.readFile` to prevent blocking the event loop.