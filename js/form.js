'use strict';

(function () {
  for (var l = 0; l < window.data.formFields.length; l++) {
    window.data.formFields[l].setAttribute('disabled', 'disabled');
  }
  var rooms = window.data.form.elements.rooms;
  var guests = window.data.form.elements.capacity;

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
})();
