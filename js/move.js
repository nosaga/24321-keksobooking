'use strict';

(function () {
  var DIALOG_TOP = 130;
  var DIALOG_HEIGHT = 630;

  window.data.mapPinMain.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var coords = getCoords(window.data.mapPinMain);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    var adsCoords = window.data.adsDialog.getBoundingClientRect();

    document.body.insertAdjacentElement('afterbegin', window.data.mapPinMain);
    moveAt(e, shiftX, shiftY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      console.log(!setBounds(moveEvt));
      if (!setBounds(moveEvt)) {
        return false;
      }
      moveAt(moveEvt, shiftX, shiftY);
      return setFormCoords(moveEvt.pageX - shiftX + window.data.mainPinWidth / 2, moveEvt.pageY - shiftY + window.data.mainPinHeight);
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
      window.data.mapPinMain.style.left = e.pageX - x + 'px';
      window.data.mapPinMain.style.top = e.pageY - y + 'px';
    }

    function setFormCoords(x, y) {
      window.data.formAddress.value = Math.floor(x) + ', ' + Math.floor(y);
    }

    function setBounds(evt) {
      if (evt.pageX < adsCoords.left) {
        return false;
      } else if (evt.pageX > adsCoords.right) {
        return false;
      } else if (evt.pageY < adsCoords.top + DIALOG_TOP) {
        return false;
      } else if (evt.pageY > DIALOG_HEIGHT) {
        return false;
      } else {
        return true;
      }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
