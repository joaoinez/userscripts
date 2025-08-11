// ==UserScript==
// @name         Reddit Media Direct Link
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Redirects reddit.com/media URLs to their direct image/video links
// @author       -
// @match        *://reddit.com/media*
// @match        *://www.reddit.com/media*
// @match        *://old.reddit.com/media*
// @match        *://new.reddit.com/media*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Get the URL parameter immediately
  const urlParams = new URLSearchParams(window.location.search);
  const directUrl = urlParams.get("url");

  if (directUrl) {
    // Decode the URL
    let targetUrl;
    try {
      targetUrl = decodeURIComponent(directUrl);
    } catch (error) {
      targetUrl = directUrl;
    }

    // Use history.replaceState to change URL without triggering navigation
    const newUrl = new URL(window.location);
    newUrl.pathname = "/redirecting";
    newUrl.search = "";
    history.replaceState(null, "", newUrl);

    // Create a blob with redirect HTML to completely break the referrer chain
    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="refresh" content="0; url=${targetUrl.replace(/"/g, "&quot;")}">
</head>
<body>
  <p>Loading image...</p>
  <script>
    setTimeout(function() {
      window.location.replace('${targetUrl.replace(/'/g, "\\'")}');
    }, 100);
  </script>
</body>
</html>`;

    const blob = new Blob([redirectHtml], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);

    // Navigate to the blob URL, which will then redirect to the target
    window.location.replace(blobUrl);
  }
})();
