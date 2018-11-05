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
  guests.addEventListener('change', function (evt) {
    var target = evt.target;
    var roomValue = parseInt(rooms.value, 10);
    var guestValue = parseInt(target.value, 10);
    checkCapacity(roomValue, guestValue, target, rooms.value);
  });

  rooms.addEventListener('change', function (evt) {
    var target = evt.target;
    var roomValue = parseInt(target.value, 10);
    var guestValue = parseInt(guests.value, 10);
    checkCapacity(roomValue, guestValue, target);
  });
  function checkCapacity(roomNum, guestNum, target) {
    if (roomNum === 100 && guestNum !== 0) {
      target.setCustomValidity('100 комнат не для гостей');
    } else if (guestNum === 0 && roomNum !== 100) {
      target.setCustomValidity('100 комнат не для гостей');
    } else if (roomNum >= guestNum) {
      target.setCustomValidity('');
    } else {
      target.setCustomValidity('Количество гостей не может быть больше ' + rooms.value);
    }
  }

  type.addEventListener('change', function (evt) {
    var target = evt.target;
    var typeValue = target.value;
    price.placeholder = PRICING[typeValue];
    checkValidity(typeValue, PRICING[typeValue], target);
  });

  price.addEventListener('change', function (e) {
    var target = e.target;
    var typeValue = type.value;
    var priceValue = target.value;
    checkValidity(priceValue, PRICING[typeValue], target);
  });
  function checkValidity(pricing, accomodation, target) {
    if (parseInt(pricing, 10) < accomodation) {
      target.setCustomValidity('минимальная цена за ночь ' + accomodation);
    } else {
      target.setCustomValidity('');
    }
  }

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
