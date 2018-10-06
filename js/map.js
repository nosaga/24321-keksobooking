'use strict';

(function () {
  var data = window.data;
  var pin = window.pin;
  data.mapPinMain.addEventListener('mouseup', mapActivationHandler);
  data.photosTile.children[0].remove();

  function mapActivationHandler() {
    data.adsDialog.classList.remove('map--faded');
    data.form.classList.remove('ad-form--disabled');
    for (var i = 0; i < data.formFields.length; i++) {
      data.formFields[i].removeAttribute('disabled');
    }
    pin.setPins();
    pin.setPinCoords();
  }

  function mapDeactivationHandler() {
    data.adsDialog.classList.add('map--faded');
    data.adsDialog.removeChild(document.querySelector('.map__card'));
    data.adsDialog.removeChild(document.querySelector('.map__pins'));
  }

  document.addEventListener('DOMContentLoaded', pin.setPinCoords);
  window.showAds = function (index) {
    var ad = window.card.renderAd(window.card.ads[index]);
    var previousAd = document.querySelector('.map__card');
    checkAd(previousAd, ad);
  };

  var checkAd = function (currentAd, newAd) {
    if (data.adsDialog.contains(currentAd)) {
      data.adsDialog.removeChild(currentAd);
      data.adsDialog.insertBefore(newAd, data.adsBar);
    } else {
      data.adsDialog.insertBefore(newAd, data.adsBar);
    }
  };

  window.data.formReset.addEventListener('click', function () {
    window.data.form.reset();
    mapDeactivationHandler();
  });

})();
