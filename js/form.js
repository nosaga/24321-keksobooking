'use strict';

(function () {
  var data = window.data;
  var rooms = data.form.elements.rooms;
  var guests = data.form.elements.capacity;
  var price = data.form.elements.price;
  var type = data.form.elements.type;
  var time = document.querySelector('.ad-form__element--time');


  var Pricing = {
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
    var priceValue = target.value;
    if (priceValue < Pricing[typeValue]) {
      target.setCustomValidity('минимальная цена за ночь ' + Pricing[typeValue]);
    } else {
      target.setCustomValidity('');
    }
  });

  type.addEventListener('change', function (evt) {
    var target = evt.target;
    var typeValue = target.value;
    price.placeholder = Pricing[typeValue];
  });

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
