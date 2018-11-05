'use strict';
(function () {
  var form = document.querySelector('form');
  var featuresAll = document.querySelector('#housing-features');
  var FILTER = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
  };
  var PRICING = {
    low: 10000,
    middle: 50000,
    high: 50000
  };
  var render = window.render;
  window.updateCard = window.debounce(function () {

    var compareType = function (type) {
      if (FILTER['housing-type'] === 'any') {
        return true;
      }
      return type === FILTER['housing-type'];
    };

    var compareRooms = function (number) {
      if (FILTER['housing-rooms'] === 'any') {
        return true;
      }
      return number === parseInt(FILTER['housing-rooms'], 10);
    };

    var compareGuests = function (guestNumber) {
      if (FILTER['housing-guests'] === 'any') {
        return true;
      }
      return guestNumber === parseInt(FILTER['housing-guests'], 10);
    };

    var comparePrice = function (price) {
      if (FILTER['housing-price'] === 'any') {
        return true;
      }
      if (FILTER['housing-price'] === 'middle') {
        return price < PRICING.middle && price > PRICING.low;
      }
      if (FILTER['housing-price'] === 'high') {
        return price > PRICING[FILTER['housing-price']];
      } else {
        return price < PRICING[FILTER['housing-price']];
      }
    };

    var checkFeatures = function (ad) {
      var available = true;
      var inputs = featuresAll.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {
          continue;
        }

        if (ad.offer.features.indexOf(inputs[i].value) === -1) {
          available = false;
          break;
        }
        available = true;
      }
      return available;
    };

    var filtered = render.ads.filter(function (ad) {
      return (
        compareType(ad.offer.type) &&
        comparePrice(ad.offer.price) &&
        compareRooms(ad.offer.rooms) &&
        compareGuests(ad.offer.guests) &&
        checkFeatures(ad)
      );
    });

    render.filteredAds = filtered;
    window.map.checkCard();
    window.map.removePins();
    window.pin.setPins();
  });

  var filterHandler = function (evt) {
    var target = evt.target;
    if (!FILTER[target.name]) {
      return;
    }
    FILTER[evt.target.name] = target.value;
    window.updateCard();
  };

  form.addEventListener('change', filterHandler);
  featuresAll.addEventListener('change', window.updateCard);
})();
