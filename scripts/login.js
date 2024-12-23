const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document
  .getElementById("signInButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission
    window.location.href = "amazon.html"; // Redirect to amazon.html
  });
