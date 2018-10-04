'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var dialog = document.querySelector('.map');
  var pinWidth = 65;
  var pinHeight = 87;
  var form = document.querySelector('.ad-form');
  var formAddressField = form.elements.address;
  var DIALOG_TOP = 130;
  var DIALOG_HEIGHT = 630;

  mainPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var coords = getCoords(mainPin);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    var adsCoords = dialog.getBoundingClientRect();

    document.body.insertAdjacentElement('afterbegin', mainPin);
    moveAt(e, shiftX, shiftY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!setBounds(moveEvt)) {
        return false;
      }
      moveAt(moveEvt, shiftX, shiftY);
      return setFormCoords(moveEvt.pageX - shiftX + pinWidth / 2, moveEvt.pageY - shiftY + pinHeight);
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
      mainPin.style.left = evt.pageX - x + 'px';
      mainPin.style.top = evt.pageY - y + 'px';
    }

    function setFormCoords(x, y) {
      formAddressField.value = Math.floor(x) + ', ' + Math.floor(y);
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
