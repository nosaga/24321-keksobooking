'use strict';

(function () {
  var data = window.data;
  var rooms = data.form.elements.rooms;
  var guests = data.form.elements.capacity;
  var price = data.form.elements.price;
  var type = data.form.elements.type;
  var checkin = data.form.elements.timein;
  var checkout = data.form.elements.timeout;

  for (var l = 0; l < data.formFields.length; l++) {
    data.formFields[l].setAttribute('disabled', 'disabled');
  }
  guests.addEventListener('change', function (evt) {
    var target = evt.target;
    var roomValue = parseInt(rooms.value, 10);
    var guestValue = parseInt(target.value, 10);
    if (roomValue === 100 && guestValue !== 0) {
      target.setCustomValidity('100 комнат не для гостей');
    } else if (guestValue === 0 && roomValue !== 100) {
      target.setCustomValidity('100 комнат не для гостей');
    } else if (roomValue >= guestValue) {
      target.setCustomValidity('');
    } else {
      target.setCustomValidity('Количество гостей не может быть больше ' + rooms.value);
    }
  });


  price.addEventListener('change', function (e) {
    var target = e.target;
    var typeValue = type.value;
    var priceValue = parseInt(target.value, 10);


    if (typeValue === 'flat' && priceValue < 1000) {
      target.setCustomValidity('минимальная цена за ночь 1 000');
    } else if (typeValue === 'house' && priceValue < 5000) {
      target.setCustomValidity('минимальная цена за ночь 5 000');
    } else if (typeValue === 'palace' && priceValue < 10000) {
      target.setCustomValidity('минимальная цена за ночь 10 000');
    } else if (typeValue === 'bungalo' && priceValue < 0) {
      target.setCustomValidity('минимальная цена за ночь 0');
    } else {
      target.setCustomValidity('');
    }
  });

  type.addEventListener('change', function (evt) {
    var target = evt.target;
    var typeValue = target.value;
    if (typeValue === 'flat') {
      price.placeholder = '1000';
    } else if (typeValue === 'house') {
      price.placeholder = '5000';
    } else if (typeValue === 'palace') {
      price.placeholder = '10 000';
    } else {
      price.placeholder = '0';
    }
  });

  checkin.addEventListener('change', function (e) {
    var target = e.target;
    var checkinValue = target.value;
    if (checkinValue === '12:00') {
      checkout.value = '12:00';
    } else if (checkinValue === '13:00') {
      checkout.value = '13:00';
    } else if (checkinValue === '14:00') {
      checkout.value = '14:00';
    }
  });

  checkout.addEventListener('change', function (e) {
    var target = e.target;
    var checkoutValue = target.value;
    if (checkoutValue === '12:00') {
      checkin.value = '12:00';
    } else if (checkoutValue === '13:00') {
      checkin.value = '13:00';
    } else if (checkoutValue === '14:00') {
      checkin.value = '14:00';
    }
  });
})();
