'use strict';

(function () {
  var data = window.data;
  var pin = window.pin;
  window.map = {
    mapDeactivationHandler: function () {
      window.map.checkClass();
      window.map.checkCard();
      window.map.removePins();
      pin.setMainPinCoords();
      data.form.reset();
    },
    checkClass: function () {
      if (!(data.adsDialog.matches('.map--faded'))) {
        data.adsDialog.classList.add('map--faded');
      }
    },
    checkCard: function () {
      if ((data.adsDialog.contains(document.querySelector('.map__card')))) {
        document.querySelector('.map__card').classList.add('hidden');
      }
    },
    removePins: function () {
      for (var i = 0; i < data.mapPins.children.length; i++) {
        if (data.mapPins.children[i].hasAttribute('data-index')) {
          data.mapPins.removeChild(data.mapPins.children[i]);
        }
      }
    },
    mapActivationHandler: function () {
      data.adsDialog.classList.remove('map--faded');
      data.form.classList.remove('ad-form--disabled');
      for (var i = 0; i < data.formFields.length; i++) {
        data.formFields[i].removeAttribute('disabled');
      }
      pin.setPins();
      pin.setPinCoords();
    },
    showAds: function (index) {
      var ad = window.card.renderAd(window.card.ads[index]);
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
