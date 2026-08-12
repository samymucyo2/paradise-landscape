document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#plNavbarToggle");
  const menu = document.querySelector("#plNavbarMobile");

  if (!button || !menu) {
    console.log("Navbar elements not found");
    return;
  }

  button.onclick = function () {
    button.classList.toggle("pl-toggle-active");
    menu.classList.toggle("pl-mobile-open");
  };

  // Close menu when a link is clicked

  const links = menu.querySelectorAll("a");

  links.forEach((link) => {
    link.onclick = function () {
      button.classList.remove("pl-toggle-active");
      menu.classList.remove("pl-mobile-open");
    };
  });

  // Close menu when clicking outside

  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      button.classList.remove("pl-toggle-active");
      menu.classList.remove("pl-mobile-open");
    }
  });
});
