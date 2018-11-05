'use strict';

(function () {
  var data = window.data;
  var card = window.render;
  window.pin = {
    renderPins: function (i) {
      var pin = card.filteredAds[i];
      var pinElement = data.mapPinTemplate.cloneNode(true);
      pinElement.style.top = pin.location.y + 'px';
      pinElement.style.left = pin.location.x + 'px';
      pinElement.dataset.index = i;
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      pinElement.addEventListener('click', clickPinHandler);
      return pinElement;

      function clickPinHandler(evt) {
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
      for (var i = 0; i < window.render.filteredAds.length; i++) {
        fragmentPins.appendChild(window.pin.renderPins(i));
        if (i >= 4) {
          break;
        }
      }
      data.mapPins.appendChild(fragmentPins);
    },
    setSvg: function () {
      var svg = document.querySelector('svg');
      return document.body.contains(document.querySelector('.map--faded')) ?
        (svg.style.transform = 'rotate(-20deg) scale(1)') :
        (svg.style.transform = 'rotate(120deg) scale(0)');
    },
    setPinCoords: function () {
      var x = Math.floor(data.mapPinMain.offsetLeft + data.MAIN_PIN_WIDTH / 2);
      var y = Math.floor(data.mapPinMain.offsetTop + data.MAIN_PIN_HEIGHT);
      data.formAddress.setAttribute('readonly', '');
      data.formAddress.value = x + ', ' + y;
    },
    setPinStyle: function () {
      var adsCoords = data.adsDialog.getBoundingClientRect();
      data.mapPinMain.style.left = adsCoords.width / 2 + data.MAIN_PIN_WIDTH / 2 + 'px';
      data.mapPinMain.style.top = adsCoords.height / 2 + 'px';
    }
  };
})();


