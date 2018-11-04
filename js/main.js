'use strict';

(function () {
  var data = window.Data;
  var map = window.map;
  document.addEventListener('DOMContentLoaded', window.pin.setPinCoords);
  data.mapPinMain.addEventListener('mouseup', window.map.activationHandler);
  data.photosTile.children[0].remove();
  data.formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    map.deactivationHandler();
  });
})();


