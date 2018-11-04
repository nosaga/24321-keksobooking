'use strict';

(function () {
  var DIALOG_TOP = 130;
  var DIALOG_HEIGHT = 630;
  var data = window.Data;

  data.mapPinMain.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var coords = getCoords(data.mapPinMain);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    var adsCoords = data.adsDialog.getBoundingClientRect();
    document.body.insertAdjacentElement('afterbegin', data.mapPinMain);
    moveAt(e, shiftX, shiftY);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapCoords = setBounds(moveEvt);
      moveAt(mapCoords, shiftX, shiftY);
      return setFormCoords(mapCoords.pageX - shiftX + data.MainPinWidth / 2, mapCoords.pageY - shiftY + data.MainPinHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();
      return {
        left: box.left + window.pageXOffset,
        top: box.top + window.pageYOffset
      };
    }
    function moveAt(evt, x, y) {
      data.mapPinMain.style.left = evt.pageX - x + 'px';
      data.mapPinMain.style.top = evt.pageY - y + 'px';
    }

    function setFormCoords(x, y) {
      data.formAddress.value = Math.floor(x) + ', ' + Math.floor(y);
    }

    function setBounds(evt) {
      var coordsOnMove = {
        pageY: evt.pageY,
        pageX: evt.pageX,
      };
      if (coordsOnMove.pageY < adsCoords.top + DIALOG_TOP) {
        coordsOnMove.pageY = adsCoords.top + DIALOG_TOP;
      }
      if (coordsOnMove.pageY > DIALOG_HEIGHT) {
        coordsOnMove.pageY = DIALOG_HEIGHT;
      }
      if (coordsOnMove.pageX < adsCoords.left) {
        coordsOnMove.pageX = adsCoords.left;
      }
      if (coordsOnMove.pageX > adsCoords.right) {
        coordsOnMove.pageX = adsCoords.right;
      }
      return coordsOnMove;
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
