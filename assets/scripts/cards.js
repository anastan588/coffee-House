const blocks = document.querySelectorAll('.menu_items_block');
const loadmoreButton = document.querySelector('.buttom_load_more');
const switchButtons = document.querySelectorAll('.menu_button_item');
let data = './../data/products.json';
const response = await fetch(data);
const products = await response.json();
console.log(products);
let dataForPopUp;

function loadBlocksInformation() {
  console.log(blocks);
  for (let i = 0; i < blocks.length; i++) {
    let dataToComplitBlock;
    if (blocks[i].classList.contains('block_coffee')) {
      dataToComplitBlock = products[0]['coffee'];
    }
    if (blocks[i].classList.contains('block_tea')) {
      dataToComplitBlock = products[1]['tea'];
    }
    if (blocks[i].classList.contains('block_dessert')) {
      dataToComplitBlock = products[2]['dessert'];
    }
    for (let j = 0; j < blocks[i].children.length; j++) {
      blocks[i].children[j].children[1].children[0].children[0].innerHTML =
        dataToComplitBlock[j].name;
      blocks[i].children[j].children[1].children[0].children[1].innerHTML =
        dataToComplitBlock[j].description;
      blocks[i].children[
        j
      ].children[1].children[1].innerHTML = `$${dataToComplitBlock[j].price}`;
    }
  }
}

let activeBlock;
function resizeVariable() {
  for (let key of switchButtons) {
    console.log(key);
    if (
      key.classList.contains('active_button') &&
      key.children[1].innerHTML.toLocaleLowerCase() === 'coffee'
    ) {
      activeBlock = blocks[0];
    }
    if (
      key.classList.contains('active_button') &&
      key.children[1].innerHTML.toLocaleLowerCase() === 'tea'
    ) {
      activeBlock = blocks[1];
    }
    if (
      key.classList.contains('active_button') &&
      key.children[1].innerHTML.toLocaleLowerCase() === 'dessert'
    ) {
      activeBlock = blocks[2];
    }
  }
  console.log(activeBlock);
}

loadBlocksInformation();
resizeVariable();

function changeBlocks(event) {
  console.log(event);
  const targetButton = event.currentTarget;
  console.log(targetButton);
  console.log(!targetButton.classList.contains('menu_button_item'));
  if (!targetButton.classList.contains('menu_button_item')) {
    return;
  }
  for (let i = 0; i < switchButtons.length; i++) {
    console.log(switchButtons[i]);
    switchButtons[i].classList.remove('active_button');
  }
  for (let j = 0; j < blocks.length; j++) {
    blocks[j].classList.add('display_none_menu');
  }
  for (let i = 0; i < switchButtons.length; i++) {
    console.log(switchButtons[i].children[1].innerHTML);
    console.log(targetButton.children[1].innerHTML);
    if (
      switchButtons[i].children[1].innerHTML.toLocaleLowerCase() ===
      targetButton.children[1].innerHTML.toLocaleLowerCase()
    ) {
      console.log(blocks[i]);
      switchButtons[i].classList.add('active_button');
      blocks[i].classList.remove('display_none_menu');
    }
  }
}

window.addEventListener('resize', resizeVariable);
switchButtons.forEach((element) => {
  element.addEventListener('click', (event) => changeBlocks(event));
});
