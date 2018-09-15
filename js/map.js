'use strict';
var adsDialog = document.querySelector('.map');
adsDialog.classList.remove('map--faded');

var mapPins = adsDialog.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var adsBar = adsDialog.querySelector('.map__filters-container')
var adsTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var getRandom = function (items) {
  var randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem;
};

var getRandomNumber = function (max, min) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

var getTypeItems = function (obj, feature, keyArr) {
  keyArr = [];
  for (var key in obj) {
    feature = obj[key];
    keyArr.push(feature);
  }
  var randomKey = getRandom(keyArr)
  return randomKey;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getSortedItem = function (items, photo) {
  items.sort(compareRandom);
  for (var i = 0; i < items.length; i++) {
    photo = items[i];
  }
  return photo;
};

var getUniqueItem = function (items, unique) {
  unique = items.splice(0, 1);
  return unique;
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

var typeItems = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var checkinItems = ['12:00', '13:00', '14:00'];
var checkoutItems = checkinItems;
var featuresItems = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photosItems = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
var pinSize = 40;

var generateAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(
        {
          author: {
            avatar: 'img/avatars/user' + getUniqueItem(srcItems) + '.png',
          },
          offer: {
            title: getRandom(titleItmes),
            address: '',
            price: getRandomNumber(1000, 1000000).toLocaleString(),
            type: getTypeItems(typeItems),
            rooms: getRandomNumber(0, 5),
            guests: getRandomNumber(0, 5),
            checkin: getRandom(checkinItems),
            checkout: getRandom(checkoutItems),
            features: getRandom(featuresItems),
            description: '',
            photos: getSortedItem(photosItems),
          },
          location: {
            x: getRandomNumber(300, 800) - pinSize,
            y: getRandomNumber(130, 630) - pinSize
          }
        }
    );
  }
  return ads;
};

var ads = generateAds();

var renderPins = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left:' + pin.location.x + 'px;' + 'top:' + pin.location.y + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragmentPins.appendChild(renderPins(ads[i]));
}
mapPins.appendChild(fragmentPins);

var renderAds = function (ad) {
  var adElement = adsTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').innerHTML = ad.offer.title;
  adElement.querySelector('.popup__text--address').innerHTML = ad.offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price;
  adElement.querySelector('.popup__type').innerHTML = ad.offer.type;
  adElement.querySelector('.popup__text--capacity').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__features').innerHTML = ad.offer.features;
  adElement.querySelector('.popup__description').innerHTML = ad.offer.description;
  adElement.querySelector('.popup__photos').querySelector('.popup__photo').src = ad.offer.photos;
  adElement.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
  adElement.querySelector('.popup__photos').querySelector('.popup__photo').src = ad.offer.photos;
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return adElement;
};

var fragmentAds = document.createDocumentFragment();
fragmentAds.appendChild(renderAds(ads[0]));
adsDialog.insertBefore(fragmentAds, adsBar);
