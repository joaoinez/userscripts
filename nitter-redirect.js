// ==UserScript==
// @name         X.com to Nitter Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirects all x.com links to nitter.net
// @author       -
// @match        *://x.com/*
// @match        *://www.x.com/*
// @match        *://mobile.x.com/*
// @match        *://twitter.com/*
// @match        *://www.twitter.com/*
// @match        *://mobile.twitter.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const currentHost = window.location.hostname;
  const currentPath =
    window.location.pathname + window.location.search + window.location.hash;

  // Check if we're on x.com or twitter.com domains
  if (currentHost.match(/^(www\.)?(x|twitter)\.com$/)) {
    // Redirect to nitter.net with the same path
    const nitterUrl = "https://nitter.net" + currentPath;
    window.location.replace(nitterUrl);
  }
})();
