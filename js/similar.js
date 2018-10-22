'use strict';
(function () {
  var filters = document.querySelector('form');
  var houseType = filters.elements.namedItem('housing-type');
  var housePrice = filters.elements.namedItem('housing-price');
  var houseRooms = filters.elements.namedItem('housing-rooms');
  var houseGuests = filters.elements.namedItem('housing-guests');
  var houseFeatures = filters.elements.namedItem('features');
  var houseWifi = houseFeatures[0];


  var typeValue = 'any';
  var priceValue = 'any';
  var roomValue = 'any';
  var guestsValue = 'any';
  var wifiValue = 'wifi';

  var pricing = {
    low: 10000,
    middle: 50000,
    high: 50000
  };
  var render = window.render;
  window.updateCard = function () {
    var filtered = render.ads.filter(function (ad) {
      return (
        compareType(ad.offer.type) &&
        comparePrice(ad.offer.price) &&
        compareRooms(ad.offer.rooms) &&
        compareGuests(ad.offer.guests) &&
        checkWifi(ad.offer.features['wifi'])
      );
    });

    function compareType(type) {
      if (typeValue === 'any') {
        return true;
      }
      return type === typeValue;
    }

    function compareRooms(number) {
      if (roomValue === 'any') {
        return true;
      }
      return number === parseInt(roomValue, 10);
    }

    function compareGuests(guestNumber) {
      if (guestsValue === 'any') {
        return true;
      }
      return guestNumber === parseInt(guestsValue, 10);
    }

    function comparePrice(price) {
      if (priceValue === 'any') {
        return true;
      }

      if (priceValue === 'high') {
        return price > pricing[priceValue];
      } else {
        return price < pricing[priceValue];
      }
    }

    function checkWifi(wifi) {
      for (var i = 0; i < houseFeatures; i++) {
        if (houseFeatures[i] === wifi) {
          wifi = wifiValue;
        }
        return wifi;
      }
    }
    render.filteredAds = filtered;
    window.map.checkCard();
    window.map.removePins();
    window.pin.setPins();
  };

  houseType.addEventListener('change', function (evt) {
    var target = evt.target;
    typeValue = target.value;
    window.updateCard();
  });

  housePrice.addEventListener('change', function (evt) {
    var target = evt.target;
    priceValue = target.value;
    window.updateCard();
  });

  houseRooms.addEventListener('change', function (evt) {
    var target = evt.target;
    roomValue = target.value;
    window.updateCard();
  });

  houseGuests.addEventListener('change', function (evt) {
    var target = evt.target;
    guestsValue = target.value;
    window.updateCard();
  });

  houseWifi.addEventListener('change', function (evt) {
    var target = evt.target;
    wifiValue = target.value;
    console.log(wifiValue);
    window.updateCard();
  });
})();
