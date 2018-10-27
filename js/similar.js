'use strict';
(function () {
  var form = document.querySelector('form');
  var houseType = form.elements.namedItem('housing-type');
  var housePrice = form.elements.namedItem('housing-price');
  var houseRooms = form.elements.namedItem('housing-rooms');
  var houseGuests = form.elements.namedItem('housing-guests');
  var featuresAll = document.querySelector('#housing-features');
  var featuresWifi = document.querySelector('#filter-wifi');
  var featuresParking = document.querySelector('#filter-parking');
  var featuresDishwasher = document.querySelector('#filter-dishwasher');
  var featuresWasher = document.querySelector('#filter-washer');
  var featuresElevator = document.querySelector('#filter-elevator');
  var featuresConditioner = document.querySelector('#filter-conditioner');

  var filter = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
  };

  var typeValue = 'any';
  var priceValue = 'any';
  var roomValue = 'any';
  var guestsValue = 'any';
  var wifiValue = 'wifi';
  var dishwasherValue = 'dishwasher';
  var washerValue = 'washer';
  var parkingValue = 'parking';
  var elevatorValue = 'elevator';
  var conditionerValue = 'conditioner';

  var pricing = {
    low: 10000,
    middle: 50000,
    high: 50000
  };
  var render = window.render;
  window.updateCard = window.debounce(function () {
    var filtered = render.ads.filter(function (ad) {
      return (
        compareType(ad.offer.type) &&
        comparePrice(ad.offer.price) &&
        compareRooms(ad.offer.rooms) &&
        compareGuests(ad.offer.guests) &&
        checkFeatures(ad)
      );
    });

    console.log(filtered);

    function compareType(type) {
      if (filter['housing-type'] === 'any') {
        return true;
      }
      return type === filter['housing-type'];
    }

    function compareRooms(number) {
      if (filter['housing-rooms'] === 'any') {
        return true;
      }
      return number === parseInt(filter['housing-rooms'], 10);
    }

    function compareGuests(guestNumber) {
      if (filter['housing-guests'] === 'any') {
        return true;
      }
      return guestNumber === parseInt(filter['housing-guests'], 10);
    }

    function comparePrice(price) {
      if (filter['housing-price'] === 'any') {
        return true;
      }

      if (filter['housing-price'] === 'high') {
        return price > pricing[filter['housing-price']];
      } else {
        return price < pricing[filter['housing-price']];
      }
    }

    render.filteredAds = filtered;
    window.map.checkCard();
    window.map.removePins();
    window.pin.setPins();
  });

  function checkFeatures(ad) {
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
