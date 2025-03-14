import React from 'react';

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Page does not exist. Try something else :p </p>
      <a href="/" className="notfound-link">Return to Home</a>
    </div>
  );
}

export default NotFound;