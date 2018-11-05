'use strict';

(function () {
  var data = window.data;
  var pin = window.pin;
  window.map = {
    deactivationHandler: function () {
      window.map.checkClass();
      window.map.checkCard();
      window.map.removePins();
      pin.setSvg();
      data.form.reset();
      data.form.elements.price.placeholder = '1000';
      pin.setPinCoords();
      pin.setPinStyle();
    },
    checkClass: function () {
      if (!(data.adsDialog.matches('.map--faded'))) {
        data.adsDialog.classList.add('map--faded');
      }
    },
    checkCard: function () {
      if (data.adsDialog.contains(document.querySelector('.map__card'))) {
        document.querySelector('.map__card').classList.add('hidden');
      }
    },
    removePins: function () {
      var buttons = data.mapPins.querySelectorAll('button');
      buttons.forEach(function (button) {
        data.mapPins.removeChild(button);
      });
    },
    activationHandler: function () {
      window.load('https://js.dump.academy/keksobooking/data', function () {
        pin.setPins();
        pin.setPinCoords();
        pin.setSvg();
      });

      data.adsDialog.classList.remove('map--faded');
      data.form.classList.remove('ad-form--disabled');
      data.formFields.forEach(function (field) {
        field.removeAttribute('disabled');
      });
    },
    showAds: function (index) {
      var ad = window.render.renderAd(window.render.filteredAds[index]);
      var previousAd = document.querySelector('.map__card');
      window.map.checkAd(previousAd, ad);
    },
    checkAd: function (currentAd, newAd) {
      if (data.adsDialog.contains(currentAd)) {
        data.adsDialog.removeChild(currentAd);
        data.adsDialog.insertBefore(newAd, data.adsBar);
      } else {
        data.adsDialog.insertBefore(newAd, data.adsBar);
      }
    }
  };
})();
