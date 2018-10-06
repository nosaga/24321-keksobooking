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
  var data = window.data;
  window.card = {
    generateAds: function () {
      var ad = [];
      for (var i = 0; i < 8; i++) {
        ad.push(
            {
              author: {
                avatar: 'img/avatars/user' + getRandom(data.srcItems, true) + '.png',
              },
              offer: {
                title: getRandom(data.titleItmes),
                address: '',
                price: getRandomNumber(1000, 1000000),
                type: data.typeItems[getRandom(data.types)],
                rooms: getRandomNumber(0, 5),
                guests: getRandomNumber(0, 5),
                checkin: getRandom(data.checkinItems),
                checkout: getRandom(data.checkoutItems),
                features: getRandom(data.featuresItems),
                description: '',
                photos: getSortedItem(data.photosItems),
              },
              location: {
                x: getRandomNumber(300, 800) - data.pinWidth / 2,
                y: getRandomNumber(130, 630) - data.pinWidth
              }
            }
        );
      }
      return ad;
    },
    renderAd: function (ad) {
      var adElement = data.adsTemplate.cloneNode(true);
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
      getSortedItem(data.photosItems);
      for (var i = 0; i < data.photosItems.length; i++) {
        var photoTiles = data.photosTemplate.cloneNode(true);
        photoTiles.src = data.photosItems[i];
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
        if (evt.keyCode === data.ESC_KEYCODE) {
          __closeCard();
        }
      }
    }
  };

  window.card.ads = window.card.generateAds();
})();
