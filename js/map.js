'use strict';

window.data.mapPinMain.addEventListener('mouseup', mapActivationHandler);
window.data.photosTile.children[0].remove();

function mapActivationHandler() {
  window.data.adsDialog.classList.remove('map--faded');
  window.data.form.classList.remove('ad-form--disabled');
  for (var i = 0; i < window.data.formFields.length; i++) {
    window.data.formFields[i].removeAttribute('disabled');
  }
  window.pin.setPins();
  window.pin.setPinCoords();
}

document.addEventListener('DOMContentLoaded', window.pin.setPinCoords);
window.showAds = function (index) {
  var ad = window.card.renderAd(window.data.ads[index]);
  var previousAd = document.querySelector('.map__card');
  checkAd(previousAd, ad);
};

var checkAd = function (currentAd, newAd) {
  if (window.data.adsDialog.contains(currentAd)) {
    window.data.adsDialog.removeChild(currentAd);
    window.data.adsDialog.insertBefore(newAd, window.data.adsBar);
  } else {
    window.data.adsDialog.insertBefore(newAd, window.data.adsBar);
  }
};


