'use strict';

(function () {
  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
  };
  var onError = function (message) {
    return message;
  };
  var onLoad = function (data) {
    window.render.ads = data;
    window.render.filteredAds = data;
  };
  load('https://js.dump.academy/keksobooking/data', onLoad, onError);
})();
