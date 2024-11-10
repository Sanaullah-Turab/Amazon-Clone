const xhr = new XMLHttpRequest();

xhr.addEventListener("load", function () {
  const data = JSON.parse(xhr.responseText);
  console.log(data);
});

xhr.open("GET", "https://api.github.com/users/asad-ullah-turab/repos");
xhr.send();
