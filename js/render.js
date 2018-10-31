'use strict';

(function () {
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  var getSortedItem = function (items) {
    return items.sort(compareRandom);
  };
  var checkField = function (field) {
    if (!isNaN(field)) {
      return field;
    }

    return field.length ? field : '';
  };
 /* var checkFeatures = function (feature, param, featureClass) {
    if (feature === param) {
      featureClass.textContent = checkField(feature);
    } else {
      featureClass.classList.add('visually-hidden');
    }
  };*/
  var data = window.data;
  window.render = {
    renderAd: function (ad) {
      var adElement = data.adsTemplate.cloneNode(true);
      adElement.querySelector('.popup__close').setAttribute('tabindex', '0');
      adElement.querySelector('.popup__title').textContent = checkField(ad.offer.title);
      adElement.querySelector('.popup__text--address').textContent = checkField(ad.offer.address);
      adElement.querySelector('.popup__text--price').textContent = checkField(ad.offer.price);
      adElement.querySelector('.popup__type').textContent = checkField(window.data.TypeItems[ad.offer.type]);
      if (checkField(ad.offer.rooms) && checkField(ad.offer.guests)) {
        adElement.querySelector('.popup__text--capacity').textContent = checkField(ad.offer.rooms) + ' комнаты для ' + checkField(ad.offer.guests) + ' гостей';
      } else {
        adElement.querySelector('.popup__text--capacity').textContent = '';
      }
      if (checkField(ad.offer.checkin) && checkField(ad.offer.checkout)) {
        adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkField(ad.offer.checkin) + ' выезд до ' + checkField(ad.offer.checkout);
      } else {
        adElement.querySelector('.popup__text--time').textContent = '';
      }
      for (var i = 0; i < checkField(ad.offer.features.length); i++) {
        /*checkFeatures(ad.offer.features[i], 'wifi', adElement.querySelector('.popup__feature--wifi'));*/
        if (ad.offer.features[i] === 'wifi') {
          console.log(ad.offer.features[i]);
          adElement.querySelector('.popup__feature--wifi').textContent = ad.offer.features[i];
        } else if (ad.offer.features[i] === 'dishwasher') {
          adElement.querySelector('.popup__feature--dishwasher').textContent = checkField(ad.offer.features[i]);
        } else if (ad.offer.features[i] === 'parking') {
          adElement.querySelector('.popup__feature--parking').textContent = checkField(ad.offer.features[i]);
        } else if (ad.offer.features[i] === 'washer') {
          adElement.querySelector('.popup__feature--washer').textContent = checkField(ad.offer.features[i]);
        } else if (ad.offer.features[i] === 'elevator') {
          adElement.querySelector('.popup__feature--elevator').textContent = checkField(ad.offer.features[i]);
        } else if (ad.offer.features[i] === 'conditioner') {
          adElement.querySelector('.popup__feature--conditioner').textContent = checkField(ad.offer.features[i]);
        } else {
          adElement.querySelector('.popup__feature--wifi').classList.add('visually-hidden');
        }
      }
      /*adElement.querySelector('.popup__features').textContent = checkField(ad.offer.features);*/
      adElement.querySelector('.popup__description').textContent = checkField(ad.offer.description);
      adElement.querySelector('.popup__avatar').src = checkField(ad.author.avatar);
      var fragmentPhotos = document.createDocumentFragment();
      getSortedItem(data.photosItems);
      for (var i = 0; i < data.photosItems.length; i++) {
        var photoTiles = data.photosTemplate.cloneNode(true);
        photoTiles.src = data.photosItems[i];
        fragmentPhotos.appendChild(photoTiles);
      }
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
})();
