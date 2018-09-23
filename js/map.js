'use strict';
var adsDialog = document.querySelector('.map');
adsDialog.classList.remove('map--faded');

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

setPins();

var renderAd = function (ad) {
  var adElement = adsTemplate.cloneNode(true);
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
  return adElement;
};

var showAds = function (index) {
  var ad = renderAd(ads[index]);
  adsDialog.insertBefore(ad, adsBar);
};
