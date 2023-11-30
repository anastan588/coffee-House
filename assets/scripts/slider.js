const sliderMove = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const sliderState = document.querySelector('.slider');

const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');

const sliderButton = document.querySelectorAll('.inner_background');
console.log(sliderButton);

let sliderMeter = 0;
let sliderPositon = 0;
let sliderStep = 480;


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
        sliderMove.style.left= `${sliderPositon}px`;
        sliderMeter = 0;
        sliderButton[sliderMeter].classList.add('slider_background');
        sliderButton[sliderMeter].classList.add('animation_start');   
    }
    arrowLeft.classList.add('pointer_events');
    arrowRight.classList.add('pointer_events');
    setTimeout(()=> {
        
        arrowLeft.classList.remove('pointer_events');
        arrowRight.classList.remove('pointer_events');
    },2000)
};


function moveSlideToRight(event) {
    sliderButton[sliderMeter].classList.remove('slider_background'); 
    sliderButton[sliderMeter].classList.remove('animation_start');   
    sliderButton[sliderMeter].classList.remove('slider_button_1');   
    event.stopPropagation();
    if (sliderMeter < 2) {
    sliderPositon = sliderPositon + sliderStep;
    sliderMove.style.left= `-${sliderPositon}px`;
    console.log(sliderPositon); 
    sliderMeter = sliderMeter + 1;   
    sliderButton[sliderMeter].classList.add('slider_background'); 
    sliderButton[sliderMeter].classList.add('animation_start');    
    console.log(sliderButton[sliderMeter]);
}
   
    else {
         sliderPositon = 0;
        sliderMove.style.left = `-${sliderPositon}px`;
        sliderMeter = 0;
        sliderButton[sliderMeter].classList.add('slider_background'); 
        sliderButton[sliderMeter].classList.add('animation_start');   
    }
    arrowLeft.classList.add('pointer_events');
    arrowRight.classList.add('pointer_events');
    setTimeout(()=> {
        arrowLeft.classList.remove('pointer_events');
        arrowRight.classList.remove('pointer_events');
    },2000)
    
}


arrowLeft.addEventListener('click', (event)=> {
   console.log(event.target);
   moveSlideToleft(event);
});

arrowRight.addEventListener('click', (event)=> {
    console.log(event.target);
    moveSlideToRight(event);
 });