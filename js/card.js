'use strict';

(function () {
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
  window.card = {
    generateAds: function () {
      var ad = [];
      for (var i = 0; i < 8; i++) {
        ad.push(
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
      return ad;
    },
    renderAd: function (ad) {
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
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          __closeCard();
        }
      }
    }
  };

  window.card.ads = window.card.generateAds();
})();
