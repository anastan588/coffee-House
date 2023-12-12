const blocks = document.querySelectorAll('.menu_items_block');
const switchButtons = document.querySelectorAll('.menu_button_item');
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup_title');
const popupDescripton = document.querySelector('.popup_description');
const popupSizeSText = document.querySelector('.size_amount_S');
const popupSizeMText = document.querySelector('.size_amount_M');
const popupSizeLText = document.querySelector('.size_amount_L');
const popupAdditivetext1 = document.querySelector('.additives_name_1');
const popupAdditivetext2 = document.querySelector('.additives_name_2');
const popupAdditivetext3 = document.querySelector('.additives_name_3');
const popupTotalPrice = document.querySelector('.total_price');
const popupImage = document.querySelector('.popup_img_container');
const popupCloseButton = document.querySelector('.popup_close_button');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.body');
const popupSizeButtons = document.querySelectorAll('.size_button');
const popupSAdditivesButtons = document.querySelectorAll('.additives_button');

console.log(popup);

let data = './../data/products.json';
const response = await fetch(data);
const products = await response.json();
let dataForPopUp;

function openPopupWindow(event) {
  event.stopPropagation();
  let menuCard = event.target.closest('.menu_item');
  console.log(menuCard);
  if (!menuCard) {
    return;
  }

  for (let i = 0; i < switchButtons.length; i++) {
    if (switchButtons[i].classList.contains('active_button')) {
      if (
        switchButtons[i].children[1].innerHTML.toLocaleLowerCase() === 'coffee'
      ) {
        dataForPopUp = products[0]['coffee'];
      }
      if (
        switchButtons[i].children[1].innerHTML.toLocaleLowerCase() === 'tea'
      ) {
        dataForPopUp = products[1]['tea'];
      }
      if (
        switchButtons[i].children[1].innerHTML.toLocaleLowerCase() === 'dessert'
      ) {
        dataForPopUp = products[2]['dessert'];
      }
    }
  }
  console.log(dataForPopUp);
  for (let i = 0; i < dataForPopUp.length; i++) {
    console.log(menuCard.children[1].children[0].children[0].innerHTML);
    if (
      dataForPopUp[i].name ===
      menuCard.children[1].children[0].children[0].innerHTML
    ) {
      popupTitle.innerHTML = dataForPopUp[i].name;
      popupDescripton.innerHTML = dataForPopUp[i].description;
      popupSizeSText.innerHTML = dataForPopUp[i].sizes.s.size;
      popupSizeMText.innerHTML = dataForPopUp[i].sizes.m.size;
      popupSizeLText.innerHTML = dataForPopUp[i].sizes.l.size;
      popupAdditivetext1.innerHTML = dataForPopUp[i].additives[0].name;
      popupAdditivetext2.innerHTML = dataForPopUp[i].additives[1].name;
      popupAdditivetext3.innerHTML = dataForPopUp[i].additives[2].name;
      popupTotalPrice.innerHTML = `${dataForPopUp[i].price}$`;
      popupImage.style.backgroundImage = dataForPopUp[i].img;
    }
  }
  popup.classList.add('open_popup');
  overlay.style.display = 'block';
  overlay.style.zIndex = '4';
  overlay.style.top = '0';
  body.style.overflowY = 'hidden';
}

function closePopupWindow(event) {
  let element = event.target;
  //console.log(element);
  //console.log(this);
  //console.log(popUpContainer);
  if (popup !== null) {
    popup.classList.remove('open_popup');
    overlay.style.display = 'none';
    overlay.style.removeProperty('z-index');
    overlay.style.removeProperty('top');
    body.style.overflowY = 'auto';
    for (let i = 0; i < popupSizeButtons.length; i++) {
        popupSizeButtons[i].classList.remove('active_button_popup');
  }
  for (let i = 0; i < popupSAdditivesButtons.length; i++) {
    popupSAdditivesButtons[i].classList.remove('active_button_popup');
}
}
}

function countPopPrice(event) {
  const targetButton = event.currentTarget;
  console.log(targetButton);
  console.log(targetButton.classList.contains('size_button'));
  if (
    !targetButton.classList.contains('size_button') &&
    !targetButton.classList.contains('additives_button')
  ) {
    return;
  }
  let dataForCurrentPopupCard;

  let price = parseFloat(popupTotalPrice.innerHTML);
  console.log(price);
  for (let i = 0; i < dataForPopUp.length; i++) {
    if (dataForPopUp[i].name === popupTitle.innerHTML) {
      dataForCurrentPopupCard = dataForPopUp[i];
    }
  }
  console.log(dataForCurrentPopupCard);
  console.log(price);
  const startPrice = parseFloat(dataForCurrentPopupCard.price);
  console.log(startPrice);
  if (targetButton.classList.contains('size_button')) {
    console.log(targetButton.classList.contains('active_button_popup'));
    if (!targetButton.classList.contains('active_button_popup')) {
      for (let i = 0; i < popupSizeButtons.length; i++) {
        if (popupSizeButtons[i].classList.contains('active_button_popup')) {
          popupSizeButtons[i].classList.remove('active_button_popup');
          if (price > startPrice) {
            if (
              popupSizeButtons[i].children[0].innerHTML.toLocaleLowerCase() ===
              's'
            ) {
              price =
                price -
                parseFloat(
                  dataForCurrentPopupCard.sizes.s['add-price']
                ).toFixed(2);
            }
            if (
              popupSizeButtons[i].children[0].innerHTML.toLocaleLowerCase() ===
              'm'
            ) {
              price =
                price -
                parseFloat(
                  dataForCurrentPopupCard.sizes.m['add-price']
                ).toFixed(2);
            }
            if (
              popupSizeButtons[i].children[0].innerHTML.toLocaleLowerCase() ===
              'l'
            ) {
              price =
                price -
                parseFloat(
                  dataForCurrentPopupCard.sizes.l['add-price']
                ).toFixed(2);
            }
          }
        }
      }
      targetButton.classList.add('active_button_popup');
      console.log(
        parseFloat(dataForCurrentPopupCard.sizes.s['add-price']).toFixed(2)
      );
      if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 's') {
        price =
          price + parseFloat(dataForCurrentPopupCard.sizes.s['add-price']);
        console.log(price);
      }
      if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 'm') {
        price =
          price + parseFloat(dataForCurrentPopupCard.sizes.m['add-price']);
        console.log(price);
      }
      if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 'l') {
        price =
          price + parseFloat(dataForCurrentPopupCard.sizes.l['add-price']);
        console.log(price);
      }
    }
    // } else {
    //   targetButton.classList.remove('active_button_popup');
    //   if (price > startPrice) {
    //     if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 's') {
    //       price =
    //         price -
    //         parseFloat(dataForCurrentPopupCard.sizes.s['add-price']).toFixed(2);
    //     }
    //     if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 'm') {
    //       price =
    //         price -
    //         parseFloat(dataForCurrentPopupCard.sizes.m['add-price']).toFixed(2);
    //     }
    //     if (targetButton.children[0].innerHTML.toLocaleLowerCase() === 'l') {
    //       price =
    //         price -
    //         parseFloat(dataForCurrentPopupCard.sizes.l['add-price']).toFixed(2);
    //     }
    //   }
    // }
  }
  if (targetButton.classList.contains('additives_button')) {
    console.log(targetButton.classList.contains('active_button_popup'));
    if (!targetButton.classList.contains('active_button_popup')) {
      targetButton.classList.add('active_button_popup');
      console.log( dataForCurrentPopupCard.additives[0].name);
      console.log( parseFloat(dataForCurrentPopupCard.additives[0]['add-price']));
      console.log(targetButton.children[1].innerHTML.toLocaleLowerCase());

      if (
        targetButton.children[1].innerHTML.toLocaleLowerCase() ===
        dataForCurrentPopupCard.additives[0].name.toLocaleLowerCase()
      ) {
        price =
          price + parseFloat(dataForCurrentPopupCard.additives[0]['add-price']);
        console.log(price);
      }
      if (
        targetButton.children[1].innerHTML.toLocaleLowerCase() ===
        dataForCurrentPopupCard.additives[1].name.toLocaleLowerCase()
      ) {
        price =
          price + parseFloat(dataForCurrentPopupCard.additives[1]['add-price']);
        console.log(price);
      }
      if (
        targetButton.children[1].innerHTML.toLocaleLowerCase() ===
        dataForCurrentPopupCard.additives[2].name.toLocaleLowerCase()
      ) {
        price =
          price + parseFloat(dataForCurrentPopupCard.additives[2]['add-price']);
        console.log(price);
      }
    } else {
      targetButton.classList.remove('active_button_popup');
      if (price > startPrice) {
        if (
          targetButton.children[1].innerHTML.toLocaleLowerCase() ===
          dataForCurrentPopupCard.additives[0].name.toLocaleLowerCase()
        ) {
          price =
            price -
            parseFloat(dataForCurrentPopupCard.additives[0]['add-price']);
          console.log(price);
        }
        if (
          targetButton.children[1].innerHTML.toLocaleLowerCase() ===
          dataForCurrentPopupCard.additives[1].name.toLocaleLowerCase()
        ) {
          price =
            price -
            parseFloat(dataForCurrentPopupCard.additives[1]['add-price']);
          console.log(price);
        }
        if (
          targetButton.children[1].innerHTML.toLocaleLowerCase() ===
          dataForCurrentPopupCard.additives[2].name.toLocaleLowerCase()
        ) {
          price =
            price -
            parseFloat(dataForCurrentPopupCard.additives[2]['add-price']);
          console.log(price);
        }
      }
    }
  }
  console.log(price);
  console.log(`${price.toString()}$`);
  popupTotalPrice.innerHTML = `${price.toString()}$`;
}

blocks.forEach((element) =>
  element.addEventListener('click', (event) => openPopupWindow(event))
);
popupCloseButton.addEventListener('click', (event) => closePopupWindow(event));
overlay.addEventListener('click', (event) => closePopupWindow(event));

popupSizeButtons.forEach((element) =>
  element.addEventListener('click', (event) => countPopPrice(event))
);

popupSAdditivesButtons.forEach((element) =>
  element.addEventListener('click', (event) => countPopPrice(event))
);
