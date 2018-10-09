'use strict';

(function () {

  window.updateCard = function () {
    var sameTypes = window.render.ads.filter(function (ad) {
      return ad.offer.type === 'house';
    });
    return sameTypes;
  };


  window.getSimilar = function (ads) {
    var titles = ads.map(function (ad) {
      return ad.offer.title;
    })
    console.log(titles);
  };

  window.getSimilarType = function (ads) {
    var types = ads.filter(function (ad) {
      return ad.offer.type === 'house';
    }).
    map(function (ad) {
      return ad.offer.title;
    })
    console.log(types);
  };
})();
