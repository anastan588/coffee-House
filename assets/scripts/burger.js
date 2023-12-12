let burgerImage = document.querySelector(".burger");
let menu = document.querySelector(".menu_block_burger");
export let body = document.querySelector(".body");
export let overlay = document.querySelector(".overlay");
let burgerLine1 = document.querySelector(".line_1");
let burgerLine2 = document.querySelector(".line_2");
let menuItem = document.querySelectorAll(".nav_item");


function openOrCloseBurger(event) {
  event.stopPropagation();
  let styleOfOverlay = getComputedStyle(overlay);
  if(styleOfOverlay.zIndex === '4') {
    return;
  }
  if (
    !menu.classList.contains("burger-open") &&
    window.innerWidth <= 768 &&
    styleOfOverlay.display === "none"
  ) {
    overlay.style.display = "block";
    menu.classList.toggle("menu-open");
    burgerImage.classList.toggle("burger_open");
    burgerLine1.classList.toggle("burger_line_open_1");
    burgerLine2.classList.toggle("burger_line_open_2");
    menu.style.right = "0%";
    body.style.overflow = "hidden";
  } else {
    menu.classList.toggle("menu-open");
    overlay.style.display = "none";
    menu.classList.toggle("menu-open");
    burgerImage.classList.toggle("burger_open");
    burgerLine1.classList.toggle("burger_line_open_1");
    burgerLine2.classList.toggle("burger_line_open_2");
    menu.style.right = "-100%";
    body.style.overflow = "auto";
  }
}

burgerImage.addEventListener("click", openOrCloseBurger);
overlay.addEventListener("click", openOrCloseBurger);
menuItem.forEach((element) =>
  element.addEventListener("click", openOrCloseBurger)
);
