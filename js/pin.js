'use strict';

(function () {
  var data = window.Data;
  var card = window.render;
  window.pin = {
    renderPins: function (i) {
      var pin = card.filteredAds[i];
      var pinElement = data.mapPinTemplate.cloneNode(true);
      /*pinElement.style = 'left:' + pin.location.x + 'px;' + 'top:' + pin.location.y + 'px;';*/
      /*pinElement.style.left = pin.location.x + 'px;';*/
      pinElement.style.top = pin.location.y + 'px';
      pinElement.style.left = pin.location.x + 'px';
      console.log(pin.location.x);
      console.log(pin.location.y);
      pinElement.setAttribute('data-index', i);
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      pinElement.addEventListener('click', __clickPinHandler);
      return pinElement;

      function __clickPinHandler(evt) {
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
      if (document.body.contains(document.querySelector('.map--faded')) === true) {
        svg.style.transform = 'rotate(-20deg) scale(1)';
      } else {
        svg.style.transform = 'rotate(120deg) scale(0)';
      }
    },
    setPinCoords: function () {
      var x = Math.floor(data.mapPinMain.offsetLeft + data.MainPinWidth / 2);
      var y = Math.floor(data.mapPinMain.offsetTop + data.MainPinHeight);
      data.formAddress.setAttribute('readonly', '');
      data.formAddress.value = x + ', ' + y;
    },
  };
})();


