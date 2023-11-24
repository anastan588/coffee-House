let burgerImage = document.querySelector(".burger");
let menu = document.querySelector(".menu_block_burger");
export let body = document.querySelector(".body");
export let overlay = document.querySelector(".overlay");

function openOrCloseBurger(event) {
  event.stopPropagation();
  //console.log(event);
  //console.log(window.innerWidth);
  //console.log(typeof window.innerWidth);
  let styleOfOverlay = getComputedStyle(overlay);
  if (
    !menu.classList.contains("burger-open") &&
    window.innerWidth <= 767 &&
    styleOfOverlay.display === "none"
  ) {
    overlay.style.display = "block";
    menu.classList.toggle("burger-open");
    menu.style.right = "0%";
    burgerImage.style.transform = "rotate(90deg)";
    body.style.overflow = "hidden";
  } else {
    menu.classList.toggle("burger-open");
    overlay.style.display = "none";
    menu.style.right = "-100%";
    burgerImage.style.transform = "rotate(0deg)";
    body.style.overflow = "auto";
  }
}

burgerImage.addEventListener("click", openOrCloseBurger);
overlay.addEventListener("click", openOrCloseBurger);
// menuItem.forEach((element) =>
//   element.addEventListener("click", openOrCloseBurger)
// );
