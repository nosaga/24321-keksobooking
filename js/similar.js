'use strict';
(function () {
  var filters = document.querySelector('form');
  var houseType = filters.elements.namedItem('housing-type');
  var housePrice = filters.elements.namedItem('housing-price');
  var houseRooms = filters.elements.namedItem('housing-rooms');
  var houseGuests = filters.elements.namedItem('housing-guests');
  var featuresAll = document.querySelector('#housing-features');
  var featuresWifi = document.querySelector('#filter-wifi');
  var featuresParking = document.querySelector('#filter-parking');
  var featuresDishwasher = document.querySelector('#filter-dishwasher');
  var featuresWasher = document.querySelector('#filter-washer');
  var featuresElevator = document.querySelector('#filter-elevator');
  var featuresConditioner = document.querySelector('#filter-conditioner');

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
  window.updateCard = function () {
    var filtered = render.ads.filter(function (ad) {
      return (
        compareType(ad.offer.type) &&
        comparePrice(ad.offer.price) &&
        compareRooms(ad.offer.rooms) &&
        compareGuests(ad.offer.guests) &&
        checkFeatures(ad.offer.features, featuresParking, parkingValue) &&
        checkFeatures(ad.offer.features, featuresWifi, wifiValue) &&
        checkFeatures(ad.offer.features, featuresDishwasher, dishwasherValue) &&
        checkFeatures(ad.offer.features, featuresWasher, washerValue) &&
        checkFeatures(ad.offer.features, featuresElevator, elevatorValue) &&
        checkFeatures(ad.offer.features, featuresConditioner, conditionerValue)
      );
    });

    console.log(filtered);

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

    function checkFeatures(featuresItem, featuresChecked, featureValue) {
      var featureAvailable;

      if (!featuresChecked.checked) {
        return true;
      }

      if (featuresChecked.checked) {
        for (var i = 0; i < featuresItem.length; i++) {
          if (featuresItem[i] === featureValue) {
            featureAvailable = featuresItem[i];
          }
        }
      }
      return featureAvailable;
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

  featuresAll.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value === 'wifi') {
      wifiValue = target.value;
      window.updateCard();
    } else if (target.value === 'dishwasher') {
      dishwasherValue = target.value;
      window.updateCard();
    } else if (target.value === 'washer') {
      washerValue = target.value;
      window.updateCard();
    } else if (target.value === 'parking') {
      parkingValue = target.value;
      window.updateCard();
    } else if (target.value === 'elevator') {
      elevatorValue = target.value;
      window.updateCard();
    } else if (target.value === 'conditioner') {
      conditionerValue = target.value;
      window.updateCard();
    }
  });
})();
