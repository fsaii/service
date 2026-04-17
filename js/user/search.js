const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("click", (e) => {
  searchBox.classList.add("active");
});

document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target)) {
    searchBox.classList.remove("active");
  }
});