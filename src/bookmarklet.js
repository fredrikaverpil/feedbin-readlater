void (function () {
  var script = document.createElement("script");
  var body = document.querySelector("body");
  var title = document.title;
  document.title = "Sending to Feedbin: " + title;
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://feedbin.com/bookmarklet/replace_me".replace(
    "replace_me",
    Date.now(),
  );
  script.setAttribute("data-feedbin-token", "e6381ccdf46ceeb622fc6d5f19ae170b");
  script.setAttribute("data-original-title", title);
  script.onerror = function () {
    window.location =
      "https://feedbin.com/pages?url=" +
      encodeURIComponent(window.location.href) +
      "&title=" +
      encodeURIComponent(title) +
      "&page_token=e6381ccdf46ceeb622fc6d5f19ae170b";
    document.title = title;
  };
  body.appendChild(script);
})();

