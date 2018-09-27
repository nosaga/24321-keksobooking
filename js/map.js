'use strict';
var adsDialog = document.querySelector('.map');

var form = document.querySelector('.ad-form');
var formFields = document.querySelectorAll('fieldset');
for (var l = 0; l < formFields.length; l++) {
  formFields[l].setAttribute('disabled', 'disabled');
}

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', mapActivationHandler);

var formAddress = form.elements.address;

var mapPins = adsDialog.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var adsBar = adsDialog.querySelector('.map__filters-container');
var adsTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var photosTile = document.querySelector('#card')
  .content
  .querySelector('.popup__photos');

var photosTemplate = photosTile
  .querySelector('.popup__photo');
photosTile.children[0].remove();

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

var srcItems = [
  '01', '02', '03', '04', '05', '06', '07', '08'
];

var titleItmes = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = ['palace', 'flat', 'house', 'bungalo'];

var typeItems = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var checkinItems = ['12:00', '13:00', '14:00'];
var checkoutItems = checkinItems;
var featuresItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosItems = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinHeight = 70;
var pinWidth = 50;
var mainPinHeight = 87;
var mainPinWidth = 65;


/* get coords for addres input */
var setPinCoords = function () {
  var x = Math.floor((mapPinMain.offsetLeft + mainPinWidth / 2));
  var y = Math.floor(mapPinMain.offsetTop + mainPinHeight);
  formAddress.value = x + ', ' + y;
  formAddress.setAttribute('readonly', '');
};

function mapActivationHandler() {
  adsDialog.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
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
            avatar: 'img/avatars/user' + getRandom(srcItems, true) + '.png',
          },
          offer: {
            title: getRandom(titleItmes),
            address: '',
            price: getRandomNumber(1000, 1000000),
            type: typeItems[getRandom(types)],
            rooms: getRandomNumber(0, 5),
            guests: getRandomNumber(0, 5),
            checkin: getRandom(checkinItems),
            checkout: getRandom(checkoutItems),
            features: getRandom(featuresItems),
            description: '',
            photos: getSortedItem(photosItems),
          },
          location: {
            x: getRandomNumber(300, 800) - pinWidth / 2,
            y: getRandomNumber(130, 630) - pinHeight
          }
        }
    );
  }
  return ads;
};

var ads = generateAds();

var renderPins = function (i) {
  var pinElement = mapPinTemplate.cloneNode(true);
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
  mapPins.appendChild(fragmentPins);
};

var ESC_KEYCODE = 27;
var renderAd = function (ad) {
  var adElement = adsTemplate.cloneNode(true);
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
  getSortedItem(photosItems);
  for (var i = 0; i < photosItems.length; i++) {
    var photoTiles = photosTemplate.cloneNode(true);
    photoTiles.src = photosItems[i];
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
  if (adsDialog.contains(currentAd)) {
    adsDialog.removeChild(currentAd);
    adsDialog.insertBefore(newAd, adsBar);
  } else {
    adsDialog.insertBefore(newAd, adsBar);
  }
};

var roomsNumberInput = form.elements.rooms;
var guestsNumberInput = form.elements.capacity;

guestsNumberInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value > '1' && roomsNumberInput.value === '1') {
    target.setCustomValidity('Количество гостей не должно превышать 1');
  } else if (target.value > '2' && roomsNumberInput.value <= '2') {
    target.setCustomValidity('Количество гостей не должно превышать 2');
  } else if (target.value > '3' && roomsNumberInput.value === '3') {
    target.setCustomValidity('Количество гостей не должно превышать 3');
  } else if (roomsNumberInput.value === '100' && target.value === 'не для гостей') {
    target.setCustomValidity('не для гостей');
  } else {
    target.setCustomValidity('');
  }
});
