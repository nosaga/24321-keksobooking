'use strict';

(function () {
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  var getSortedItem = function (items) {
    return items.sort(compareRandom);
  };
  var data = window.data;
  window.render = {
    renderAd: function (ad) {
      var adElement = data.adsTemplate.cloneNode(true);
      adElement.querySelector('.popup__close').setAttribute('tabindex', '0');
      adElement.querySelector('.popup__title').innerHTML = ad.offer.title;
      adElement.querySelector('.popup__text--address').innerHTML = ad.offer.address;
      adElement.querySelector('.popup__text--price').innerHTML = ad.offer.price;
      adElement.querySelector('.popup__type').innerHTML = window.data.typeItems[ad.offer.type];
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
})();
