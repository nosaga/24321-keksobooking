'use strict';

(function () {
  window.pin = {
    renderPins: function (i) {
      var pinElement = window.data.mapPinTemplate.cloneNode(true);
      pinElement.style = 'left:' + window.card.ads[i].location.x + 'px;' + 'top:' + window.card.ads[i].location.y + 'px;';
      pinElement.setAttribute('data-index', i);
      pinElement.querySelector('img').src = window.card.ads[i].author.avatar;
      pinElement.querySelector('img').alt = window.card.ads[i].offer.title;
      pinElement.addEventListener('click', __handleClick);
      return pinElement;

      function __handleClick(evt) {
        var pins = document.querySelectorAll('.map__pin—active');
        for (var j = 0; j < pins.length; j++) {
          pins[j].classList.remove('map__pin-active');
        }
        var target = evt.target;
        target.classList.add('map__pin—active');
        window.showAds(target.closest('button').getAttribute('data-index'));
      }
    },
    setPins: function () {
      var fragmentPins = document.createDocumentFragment();
      for (var i = 0; i < window.card.ads.length; i++) {
        fragmentPins.appendChild(window.pin.renderPins(i));
      }
      window.data.mapPins.appendChild(fragmentPins);
    },
    setPinCoords: function () {
      var x = Math.floor((window.data.mapPinMain.offsetLeft + window.data.mainPinWidth / 2));
      var y = Math.floor(window.data.mapPinMain.offsetTop + window.data.mainPinHeight);
      window.data.formAddress.value = x + ', ' + y;
      window.data.formAddress.setAttribute('readonly', '');
    }
  };
})();
