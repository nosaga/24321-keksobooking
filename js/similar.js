'use strict';

(function () {
  var render = window.render;
  window.updateCard = function () {
    var sameTypesAndPrice = render.ads.filter(function (ad) {
      return ad.offer.type === 'house' && ad.offer.price <= 10000;
    });

    var sameTypes = render.ads.filter(function (ad) {
      return ad.offer.type === 'house';
    });

    var samePrice = render.ads.filter(function (ad) {
      return ad.offer.price <= 10000;
    });

    var filterAds = sameTypesAndPrice;
    filterAds = filterAds.concat(sameTypes);
    filterAds = filterAds.concat(samePrice);
    filterAds = filterAds.concat(render.ads);

    var uniqueAds =
    filterAds.filter(function (ad, i) {
      return filterAds.indexOf(ad) === i;
    });

    console.log(uniqueAds);
    render.renderAd(uniqueAds[0]);
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
