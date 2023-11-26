document.getElementById("save").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.storage.sync.set({ username, password }, () => {
    // Update the status to let the user know the credentials were saved.
    const status = document.getElementById("status");
    status.textContent = "Credentials saved successfully.";
    setTimeout(() => {
      status.textContent = "";
    }, 3000); // Clear the status message after 3 seconds
  });
});
