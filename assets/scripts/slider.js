const sliderMove = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const sliderState = document.querySelector('.slider');

const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

const sliderButton = document.querySelectorAll('.inner_background');
console.log(sliderButton);

let sliderMeter = 0;
let sliderPositon = 0;
let touchStartX = 0;
let touchEndX = 0;

let sliderStep;

function setSliderStep() {
  const screenWidth = window.innerWidth;

  if (screenWidth > 760) {
    sliderStep = 480;
  } else if (screenWidth > 700) {
    sliderStep = 430;
  } else if (screenWidth > 660) {
    sliderStep = 410;
  } else if (screenWidth > 620) {
    sliderStep = 390;
  } else if (screenWidth > 600) {
    sliderStep = 370;
  } else if (screenWidth > 500) {
    sliderStep = 360;
  } else {
    sliderStep = 348;
  }
}
setSliderStep();

function moveSlideToleft(event) {
  sliderButton[sliderMeter].classList.remove('slider_background');
  sliderButton[sliderMeter].classList.remove('animation_start');
  sliderButton[sliderMeter].classList.remove('slider_button_1');
  event.stopPropagation();
  if (sliderMeter < 2) {
    sliderPositon = sliderPositon - sliderStep;
    sliderMove.style.left = `${sliderPositon}px`;
    console.log(sliderPositon);
    sliderMeter = sliderMeter + 1;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
    console.log(sliderButton[sliderMeter]);
  } else {
    sliderPositon = 0;
    sliderMove.style.left = `${sliderPositon}px`;
    sliderMeter = 0;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
  }
  // arrowLeft.classList.add('pointer_events');
  // arrowRight.classList.add('pointer_events');
  // setTimeout(()=> {

  //     arrowLeft.classList.remove('pointer_events');
  //     arrowRight.classList.remove('pointer_events');
  // },2000)
}

function moveSlideToRight(event) {
  sliderButton[sliderMeter].classList.remove('slider_background');
  sliderButton[sliderMeter].classList.remove('animation_start');
  sliderButton[sliderMeter].classList.remove('slider_button_1');
  //   event.stopPropagation();
  if (sliderMeter < 2) {
    sliderPositon = sliderPositon + sliderStep;
    sliderMove.style.left = `-${sliderPositon}px`;
    console.log(sliderPositon);
    sliderMeter = sliderMeter + 1;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
    console.log(sliderButton[sliderMeter]);
  } else {
    sliderPositon = 0;
    sliderMove.style.left = `-${sliderPositon}px`;
    sliderMeter = 0;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
  }
  //   sliderMove.style.transition = 'left 0.5s ease-in-out';
  // arrowLeft.classList.add('pointer_events');
  // arrowRight.classList.add('pointer_events');
  // setTimeout(()=> {
  //     arrowLeft.classList.remove('pointer_events');
  //     arrowRight.classList.remove('pointer_events');
  // },2000)
}

arrowLeft.addEventListener('click', (event) => {
  console.log(event.target);
  moveSlideToleft(event);
});

arrowRight.addEventListener('click', (event) => {
  console.log(event.target);
  moveSlideToRight(event);
});

sliderMove.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].clientX;
  console.log(touchStartX);
});

sliderMove.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      moveSlideToRight(event);
    } else {
      moveSlideToleft(event);
    }
  }
});

let slideInterval;
let isPaused = false;

// Function to start the slide transition
function startSlideTransition() {
  slideInterval = setInterval(moveSlideToRight, 4000);
  console.log(slideInterval);
}

// Function to pause the slide transition
function pauseSlideTransition() {
  console.log(isPaused);
  clearInterval(slideInterval);
  sliderButton[sliderMeter].classList.add('stop-animation');
  isPaused = true;
}

// Function to resume the slide transition
function resumeSlideTransition() {
  console.log(isPaused);
  if (isPaused) {
    startSlideTransition();
    sliderButton[sliderMeter].classList.remove('stop-animation');
    isPaused = false;
  }
}

sliderMove.addEventListener('mouseover', pauseSlideTransition);

sliderMove.addEventListener('mouseout', resumeSlideTransition);

sliderMove.addEventListener('touchstart', pauseSlideTransition);
sliderMove.addEventListener('touchend', resumeSlideTransition);

startSlideTransition();
