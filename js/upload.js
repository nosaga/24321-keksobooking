'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  function hideSuccessMessage() {
    window.data.successMessage.classList.add('hidden');
    document.removeEventListener('keydown', escPress);
  }

  function hideErrorMessage() {
    window.data.errorMessage.classList.add('hidden');
  }

  function escPress(evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      hideSuccessMessage();
    }
  }

  var showSuccessMessage = function () {
    window.data.main.appendChild(window.data.successMessage);
    document.addEventListener('keydown', escPress);
    document.addEventListener('click', function () {
      hideSuccessMessage();
    });
  };

  var showErrorMessage = function () {
    window.data.main.appendChild(window.data.errorMessage);
    window.data.closeButton.addEventListener('click', function () {
      hideErrorMessage();
    });
    document.addEventListener('click', function () {
      hideErrorMessage();
    });
  };

  var onSuccessUpload = function () {
    showSuccessMessage();
    window.map.mapDeactivationHandler();
  };

  var onErrorUpload = function () {
    showErrorMessage();
  };

  var onLoad = function (xhr) {
    if (xhr.status === 200) {
      onSuccessUpload();
    } else {
      onErrorUpload();
    }
  };
  var onError = function (response) {
    return response;
  };

  window.data.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(window.data.form), onLoad, onError);
  });
})();

