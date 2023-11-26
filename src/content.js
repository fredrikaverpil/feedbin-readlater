chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showBanner") {
    const banner = document.createElement("div");
    banner.style.position = "fixed";
    banner.style.bottom = "20px";
    banner.style.left = "20px";
    banner.style.padding = "10px";
    banner.style.backgroundColor = request.success ? "green" : "red";
    banner.style.color = "white";
    banner.style.zIndex = "1000";
    banner.innerText = request.success
      ? "Page bookmarked successfully in Feedbin!"
      : "Failed to bookmark the page in Feedbin.";

    document.body.appendChild(banner);

    setTimeout(() => {
      document.body.removeChild(banner);
    }, 3000); // Remove the banner after 3 seconds
  }
});
