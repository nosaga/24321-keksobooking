'use strict';
(function () {
  var form = document.querySelector('form');
  var featuresAll = document.querySelector('#housing-features');
  var filter = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
  };
  var pricing = {
    low: 10000,
    middle: 50000,
    high: 50000
  };
  var render = window.render;
  window.updateCard = window.debounce(function () {

    var compareType = function (type) {
      if (filter['housing-type'] === 'any') {
        return true;
      }
      return type === filter['housing-type'];
    }

    var compareRooms = function (number) {
      if (filter['housing-rooms'] === 'any') {
        return true;
      }
      return number === parseInt(filter['housing-rooms'], 10);
    }

    var compareGuests = function (guestNumber) {
      if (filter['housing-guests'] === 'any') {
        return true;
      }
      return guestNumber === parseInt(filter['housing-guests'], 10);
    }

    var comparePrice = function (price) {
      if (filter['housing-price'] === 'any') {
        return true;
      }

      if (filter['housing-price'] === 'high') {
        return price > pricing[filter['housing-price']];
      } else {
        return price < pricing[filter['housing-price']];
      }
    }

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
    }

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

  var onFilter = function (evt) {
    var target = evt.target;
    if (!filter[target.name]) {
      return;
    }
    filter[evt.target.name] = target.value;
    window.updateCard();
  };

  form.addEventListener('change', onFilter);
  featuresAll.addEventListener('change', window.updateCard);
})();
