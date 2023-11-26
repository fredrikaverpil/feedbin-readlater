// When the options page is loaded, populate the form with existing credentials
document.addEventListener("DOMContentLoaded", loadCredentials);

function loadCredentials() {
  chrome.storage.sync.get(["username", "password"], (items) => {
    if (items.username) {
      document.getElementById("username").value = items.username;
    }
    if (items.password) {
      document.getElementById("password").value = items.password;
    }
  });
}

// Save the credentials when the "Save" button is clicked
document.getElementById("save").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.storage.sync.set({ username, password }, () => {
    const status = document.getElementById("status");
    status.textContent = "Credentials saved successfully.";
    setTimeout(() => {
      status.textContent = "";
    }, 3000); // Clear the status message after 3 seconds
  });
});
