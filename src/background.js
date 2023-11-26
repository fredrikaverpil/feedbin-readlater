chrome.action.onClicked.addListener((tab) => {
  if (!tab.url) {
    console.error("No URL found for the current tab.");
    return;
  }

  // Retrieve Feedbin credentials from storage
  chrome.storage.sync.get(["username", "password"], (items) => {
    if (items.username && items.password) {
      const feedbinAuth = btoa(`${items.username}:${items.password}`);
      const url = tab.url; // URL of the current tab
      const title = tab.title; // Title of the current tab

      fetch("https://api.feedbin.com/v2/pages.json", {
        method: "POST",
        headers: {
          Authorization: `Basic ${feedbinAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, title }),
      })
        .then((response) => {
          if (response.ok) {
            injectAndSendMessage(tab.id, true);
          } else {
            response.text().then((text) => {
              const errorMessage = `Failed to bookmark the page in Feedbin. Status: ${response.status}. ${text}`;
              console.error(errorMessage);
              injectAndSendMessage(tab.id, false, errorMessage);
            });
          }
        })
        .catch((error) => {
          const errorMessage = `Error bookmarking page: ${error.message}`;
          console.error(errorMessage);
          injectAndSendMessage(tab.id, false, errorMessage);
        });
    } else {
      const errorMessage = `Feedbin username and/or password not set. See extension options.`;
      console.error(errorMessage);
      injectAndSendMessage(tab.id, false, errorMessage);
    }
  });
});

function injectAndSendMessage(tabId, success, error = "") {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["content.js"],
    },
    () => {
      chrome.tabs.sendMessage(tabId, {
        action: "showBanner",
        success: success,
        error: error,
      });
    },
  );
}
