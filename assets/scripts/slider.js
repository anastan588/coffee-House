const sliderMove = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const sliderState = document.querySelector('.slider');

const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

const sliderButton = document.querySelectorAll('.inner_background');


let sliderMeter = 0;
let sliderPositon = 0;
let touchStartX = 0;
let touchEndX = 0;
let prevArrow = '';
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
  event.stopPropagation();

  console.log('left');
 

  sliderButton[sliderMeter].classList.remove('slider_background');
  sliderButton[sliderMeter].classList.remove('animation_start');
  sliderButton[sliderMeter].classList.remove('slider_button_1');
  if (event !== undefined) {
    pauseSlideTransition();
    sliderButton[sliderMeter].classList.remove('stop-animation');
  }

  if (sliderMeter !== 0 && (sliderPositon !== 0)) {
    sliderPositon = sliderPositon - sliderStep;
    sliderMove.style.left = `-${sliderPositon}px`;

    sliderMeter = sliderMeter - 1;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
  } else {
    sliderPositon = 960;
    sliderMove.style.left = `-${sliderPositon}px`;
    sliderMeter = 2;
    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
  }

  // arrowLeft.classList.add('pointer_events');
  // arrowRight.classList.add('pointer_events');
  setTimeout(() => {
    if (event !== undefined) {
      resumeSlideTransition();
    }
    // arrowLeft.classList.remove('pointer_events');
    // arrowRight.classList.remove('pointer_events');
  }, 2000);
  prevArrow = 'left';
}

function moveSlideToRight(event) {
  console.log('right');

  
  // event.stopPropagation()
  sliderButton[sliderMeter].classList.remove('slider_background');
  sliderButton[sliderMeter].classList.remove('animation_start');
  sliderButton[sliderMeter].classList.remove('slider_button_1');
  if (event !== undefined) {
    pauseSlideTransition();
    sliderButton[sliderMeter].classList.remove('stop-animation');
  }

  if (sliderMeter < 2) {
    sliderPositon = sliderPositon + sliderStep;
    sliderMove.style.left = `-${sliderPositon}px`;


    sliderMeter = sliderMeter + 1;

    sliderButton[sliderMeter].classList.add('slider_background');
    sliderButton[sliderMeter].classList.add('animation_start');
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
  setTimeout(() => {
    if (event !== undefined) {
      resumeSlideTransition();
    }

    // arrowLeft.classList.remove('pointer_events');
    // arrowRight.classList.remove('pointer_events');
  }, 4000);
  prevArrow = 'left';
}

arrowLeft.addEventListener('click', (event) => {

  moveSlideToleft(event);
});

arrowRight.addEventListener('click', (event) => {

  moveSlideToRight(event);
});

sliderMove.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].clientX;

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
function startSlideTransition(event) {
  slideInterval = setInterval(moveSlideToRight, 4000);

}

// Function to pause the slide transition
function pauseSlideTransition(event) {

  clearInterval(slideInterval);
  sliderButton[sliderMeter].classList.add('stop-animation');
  isPaused = true;
}

// Function to resume the slide transition
function resumeSlideTransition(event) {
  if (isPaused) {
    startSlideTransition();
    sliderButton[sliderMeter].classList.remove('stop-animation');
    isPaused = false;
  }
}

sliderMove.addEventListener('mouseover', (event) =>
  pauseSlideTransition(event)
);

sliderMove.addEventListener('mouseout', (event) =>
  resumeSlideTransition(event)
);

sliderMove.addEventListener('touchstart', (event) =>
  pauseSlideTransition(event)
);
sliderMove.addEventListener('touchend', (event) =>
  resumeSlideTransition(event)
);

startSlideTransition();
