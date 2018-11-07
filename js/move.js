'use strict';

(function () {
  var DIALOG_TOP = 130;
  var DIALOG_HEIGHT = 630;
  var data = window.data;

  data.mapPinMain.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        pageX: box.left + window.pageXOffset,
        pageY: box.top + window.pageYOffset
      };
    };
    var setBounds = function (evt) {
      var coordsOnMove = {
        pageY: evt.pageY - shiftY,
        pageX: evt.pageX - shiftX,
      };

      if (coordsOnMove.pageY < DIALOG_TOP) {
        coordsOnMove.pageY = DIALOG_TOP;
      }
      if (coordsOnMove.pageY > DIALOG_HEIGHT) {
        coordsOnMove.pageY = DIALOG_HEIGHT;
      }
      if (coordsOnMove.pageX < adsCoords.left) {
        coordsOnMove.pageX = adsCoords.left;
      }
      if (coordsOnMove.pageX + data.MAIN_PIN_WIDTH > adsCoords.right) {
        coordsOnMove.pageX = adsCoords.right - data.MAIN_PIN_WIDTH;
      }

      return coordsOnMove;
    };
    var setFormCoords = function (x, y) {
      data.formAddress.value = Math.floor(x) + ', ' + Math.floor(y);
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapCoords = setBounds(moveEvt);
      moveAt(mapCoords);
      return setFormCoords(mapCoords.pageX + data.MAIN_PIN_WIDTH / 2, mapCoords.pageY + data.MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    var coords = getCoords(data.mapPinMain);
    var shiftX = e.pageX - coords.pageX;
    var shiftY = e.pageY - coords.pageY;
    var adsCoords = data.adsDialog.getBoundingClientRect();

    document.body.insertAdjacentElement('afterbegin', data.mapPinMain);
    moveAt(coords);
    function moveAt(evt) {
      data.mapPinMain.style.left = evt.pageX + 'px';
      data.mapPinMain.style.top = evt.pageY + 'px';
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
