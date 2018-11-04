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
  var checkFeatures = function (feature, featureClass) {
    if (feature === -1) {
      featureClass.classList.add('visually-hidden');
    } else {
      featureClass.textContent = '';
    }
  };
  var data = window.Data;
  window.render = {
    renderAd: function (ad) {
      var adElement = data.adsTemplate.cloneNode(true);
      adElement.querySelector('.popup__close').setAttribute('tabindex', '0');
      adElement.querySelector('.popup__title').textContent = checkField(ad.offer.title);
      adElement.querySelector('.popup__text--address').textContent = checkField(ad.offer.address);
      adElement.querySelector('.popup__text--price').textContent = checkField(ad.offer.price);
      adElement.querySelector('.popup__type').textContent = checkField(window.Data.TypeItems[ad.offer.type]);
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
      if (checkField(ad.offer.features)) {
        for (var i = 0; i < data.FeaturesItems.length; i++) {
          var feature = data.FeaturesItems[i];
          checkFeatures(ad.offer.features.indexOf(feature), adElement.querySelector('.popup__feature--' + feature));
        }
      }
      adElement.querySelector('.popup__description').textContent = checkField(ad.offer.description);
      adElement.querySelector('.popup__avatar').src = checkField(ad.author.avatar);
      var fragmentPhotos = document.createDocumentFragment();
      getSortedItem(ad.offer.photos);
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var photoTiles = data.photosTemplate.cloneNode(true);
        photoTiles.src = ad.offer.photos[i];
        fragmentPhotos.appendChild(photoTiles);
      }
      adElement.querySelector('.popup__photos').appendChild(fragmentPhotos);
      adElement.querySelector('.popup__close').addEventListener('click', __closeCard);
      document.addEventListener('keydown', __closeEscPress);
      return adElement;
      function __closeCard() {
        adElement.classList.add('hidden');
        document.removeEventListener('keydown', __closeEscPress);
      }
      function __closeEscPress(evt) {
        if (evt.keyCode === data.ESC_KEYCODE) {
          __closeCard();
        }
      }
    }
  };
})();
