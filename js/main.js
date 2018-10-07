'use strict';

(function () {
  var data = window.data;
  document.addEventListener('DOMContentLoaded', window.pin.setPinCoords);
  data.mapPinMain.addEventListener('mouseup', window.map.mapActivationHandler);
  data.photosTile.children[0].remove();
  data.formReset.addEventListener('click', function () {
    window.map.mapDeactivationHandler();
  });
})();
