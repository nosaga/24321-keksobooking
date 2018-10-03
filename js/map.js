'use strict';

for (var l = 0; l < window.data.formFields.length; l++) {
  window.data.formFields[l].setAttribute('disabled', 'disabled');
}
window.data.mapPinMain.addEventListener('mouseup', mapActivationHandler);
window.data.photosTile.children[0].remove();

var getRandom = function (items, unique) {
  var randomIndex = Math.floor(Math.random() * items.length);
  if (unique) {
    return items.splice(randomIndex, 1);
  } else {
    return items[randomIndex];
  }
};

var getRandomNumber = function (max, min) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getSortedItem = function (items) {
  return items.sort(compareRandom);
};

/* get coords for addres input */
var setPinCoords = function () {
  var x = Math.floor((window.data.mapPinMain.offsetLeft + window.data.mainPinWidth / 2));
  var y = Math.floor(window.data.mapPinMain.offsetTop + window.data.mainPinHeight);
  window.data.formAddress.value = x + ', ' + y;
  window.data.formAddress.setAttribute('readonly', '');
};

function mapActivationHandler() {
  window.data.adsDialog.classList.remove('map--faded');
  window.data.form.classList.remove('ad-form--disabled');
  for (var i = 0; i < window.data.formFields.length; i++) {
    window.data.formFields[i].removeAttribute('disabled');
  }
  setPins();
  setPinCoords();
}

document.addEventListener('DOMContentLoaded', setPinCoords);

var generateAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(
        {
          author: {
            avatar: 'img/avatars/user' + getRandom(window.data.srcItems, true) + '.png',
          },
          offer: {
            title: getRandom(window.data.titleItmes),
            address: '',
            price: getRandomNumber(1000, 1000000),
            type: window.data.typeItems[getRandom(window.data.types)],
            rooms: getRandomNumber(0, 5),
            guests: getRandomNumber(0, 5),
            checkin: getRandom(window.data.checkinItems),
            checkout: getRandom(window.data.checkoutItems),
            features: getRandom(window.data.featuresItems),
            description: '',
            photos: getSortedItem(window.data.photosItems),
          },
          location: {
            x: getRandomNumber(300, 800) - window.data.pinWidth / 2,
            y: getRandomNumber(130, 630) - window.data.pinWidth
          }
        }
    );
  }
  return ads;
};

var ads = generateAds();

var renderPins = function (i) {
  var pinElement = window.data.mapPinTemplate.cloneNode(true);
  pinElement.style = 'left:' + ads[i].location.x + 'px;' + 'top:' + ads[i].location.y + 'px;';
  pinElement.setAttribute('data-index', i);
  pinElement.querySelector('img').src = ads[i].author.avatar;
  pinElement.querySelector('img').alt = ads[i].offer.title;
  pinElement.addEventListener('click', __handleClick);
  return pinElement;

  function __handleClick(evt) {
    var pins = document.querySelectorAll('.map__pin—active');
    for (var j = 0; j < pins.length; j++) {
      pins[j].classList.remove('map__pin-active');
    }
    var target = evt.target;
    target.classList.add('map__pin—active');
    showAds(target.closest('button').getAttribute('data-index'));
  }
};

var setPins = function () {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragmentPins.appendChild(renderPins(i));
  }
  window.data.mapPins.appendChild(fragmentPins);
};

var ESC_KEYCODE = 27;
var renderAd = function (ad) {
  var adElement = window.data.adsTemplate.cloneNode(true);
  adElement.querySelector('.popup__close').setAttribute('tabindex', '0');
  adElement.querySelector('.popup__title').innerHTML = ad.offer.title;
  adElement.querySelector('.popup__text--address').innerHTML = ad.offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price;
  adElement.querySelector('.popup__type').innerHTML = ad.offer.type;
  adElement.querySelector('.popup__text--capacity').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__features').innerHTML = ad.offer.features;
  adElement.querySelector('.popup__description').innerHTML = ad.offer.description;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  var fragmentPhotos = document.createDocumentFragment();
  getSortedItem(window.data.photosItems);
  for (var i = 0; i < window.data.photosItems.length; i++) {
    var photoTiles = window.data.photosTemplate.cloneNode(true);
    photoTiles.src = window.data.photosItems[i];
    fragmentPhotos.appendChild(photoTiles);
  }
  window.checkData(ad, adElement);
  adElement.querySelector('.popup__photos').appendChild(fragmentPhotos);
  adElement.querySelector('.popup__close').addEventListener('click', __closeCard);
  document.addEventListener('keydown', __closeEscPress);
  return adElement;
  function __closeCard() {
    adElement.classList.add('hidden');
  }
  function __closeEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      __closeCard();
    }
  }
};

var showAds = function (index) {
  var ad = renderAd(ads[index]);
  var previousAd = document.querySelector('.map__card');
  checkAd(previousAd, ad);
};

var checkAd = function (currentAd, newAd) {
  if (window.data.adsDialog.contains(currentAd)) {
    window.data.adsDialog.removeChild(currentAd);
    window.data.adsDialog.insertBefore(newAd, window.data.adsBar);
  } else {
    window.data.adsDialog.insertBefore(newAd, window.data.adsBar);
  }
};


