'use strict';

(function () {
  var data = window.data;
  var rooms = data.form.elements.rooms;
  var guests = data.form.elements.capacity;
  var price = data.form.elements.price;
  var type = data.form.elements.type;
  var time = document.querySelector('.ad-form__element--time');
  var PRICING = {
    flat: 1000,
    house: 5000,
    palace: 10000,
    bungalo: 0
  };
  for (var l = 0; l < data.formFields.length; l++) {
    data.formFields[l].setAttribute('disabled', 'disabled');
  }
  var checkCapacity = function () {
    var roomValue = parseInt(rooms.value, 10);
    var guestValue = parseInt(guests.value, 10);
    if (roomValue === 100 && guestValue !== 0) {
      guests.setCustomValidity('100 комнат не для гостей');
    } else if (guestValue === 0 && roomValue !== 100) {
      guests.setCustomValidity('100 комнат не для гостей');
    } else if (roomValue >= guestValue) {
      guests.setCustomValidity('');
    } else {
      guests.setCustomValidity('Количество гостей не может быть больше ' + rooms.value);
    }
  };
  var checkTypeAndPrice = function () {
    var typeValue = type.value;
    var priceValue = price.value;
    if (parseInt(priceValue, 10) < PRICING[typeValue]) {
      price.setCustomValidity('минимальная цена за ночь ' + PRICING[typeValue]);
    } else {
      price.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', checkCapacity);
  guests.addEventListener('change', checkCapacity);
  type.addEventListener('change', function (evt) {
    var target = evt.target;
    var typeValue = target.value;
    price.placeholder = PRICING[typeValue];
    checkTypeAndPrice();
  });
  price.addEventListener('change', checkTypeAndPrice);
  time.addEventListener('change', function (e) {
    var checkin = data.form.elements.timein;
    var checkout = data.form.elements.timeout;
    var target = e.target;
    if (target.value === checkin.value) {
      checkout.value = checkin.value;
    }
    checkin.value = checkout.value;
  });
})();
