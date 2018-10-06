'use strict';

(function () {
  var DIALOG_TOP = 130;
  var DIALOG_HEIGHT = 630;
  var data = window.data;

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

      if (!setBounds(moveEvt)) {
        return false;
      }
      moveAt(moveEvt, shiftX, shiftY);
      return setFormCoords(moveEvt.pageX - shiftX + data.mainPinWidth / 2, moveEvt.pageY - shiftY + data.mainPinHeight);
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
      if (evt.pageX < adsCoords.left ||
        evt.pageX > adsCoords.right ||
        evt.pageY < adsCoords.top + DIALOG_TOP ||
        evt.pageY > DIALOG_HEIGHT) {
        return false;
      }
      return true;
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
