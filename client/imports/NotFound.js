import React from 'react';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const NotFound = () => (
  <div className="NotFound">
    <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
  </div>
);

export default NotFound;
