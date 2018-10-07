'use strict';

(function () {
  var data = window.data;
  var card = window.card;
  window.pin = {
    renderPins: function (i) {
      var pinElement = data.mapPinTemplate.cloneNode(true);
      pinElement.style = 'left:' + card.ads[i].location.x + 'px;' + 'top:' + card.ads[i].location.y + 'px;';
      pinElement.setAttribute('data-index', i);
      pinElement.querySelector('img').src = card.ads[i].author.avatar;
      pinElement.querySelector('img').alt = card.ads[i].offer.title;
      pinElement.addEventListener('click', __handleClick);
      return pinElement;

      function __handleClick(evt) {
        var pins = document.querySelectorAll('.map__pin—active');
        for (var j = 0; j < pins.length; j++) {
          pins[j].classList.remove('map__pin-active');
        }
        var target = evt.target;
        target.classList.add('map__pin—active');
        window.map.showAds(target.closest('button').getAttribute('data-index'));
      }
    },
    setPins: function () {
      var fragmentPins = document.createDocumentFragment();
      for (var i = 0; i < card.ads.length; i++) {
        fragmentPins.appendChild(window.pin.renderPins(i));
      }
      data.mapPins.appendChild(fragmentPins);
    },
    setPinCoords: function () {
      var x = Math.floor((data.mapPinMain.offsetLeft + data.mainPinWidth / 2));
      var y = Math.floor(data.mapPinMain.offsetTop + data.mainPinHeight);
      data.formAddress.value = x + ', ' + y;
      data.formAddress.setAttribute('readonly', '');
    },
    setMainPinCoords: function () {
      data.mapPinMain.style = 'left:' + data.MAIN_PIN_COORDS_X + 'px;' + 'top:' + data.MAIN_PIN_COORDS_Y + 'px';
    }
  };
})();
