'use strict';
(function () {
  var filters = document.querySelector('form');
  var houseType = filters.elements.namedItem('housing-type');
  var housePrice = filters.elements.namedItem('housing-price');

  var typeValue = 'any';
  var priceValue = 'any';

  var pricing = {
    low: 10000,
    middle: 50000,
    high: 50000
  };
  var render = window.render;
  window.updateCard = function () {
    if (typeValue === 'any' && priceValue === 'any') {
      render.filteredAds = render.ads;
    } else {
      var sameTypes = render.ads.filter(function (ad) {
        return ad.offer.type === typeValue;
      });

      var samePrice = render.ads.filter(function (ad) {
        if (priceValue === 'high') {
          return ad.offer.price > pricing[priceValue];
        } else {
          return ad.offer.price < pricing[priceValue];
        }
      });

      var filterAds = [];
      filterAds = sameTypes.filter(function (ad) {
        return samePrice.filter(function (adCompare) {
          return ad.offer.type === adCompare.offer.type;
        }).length === 0;
      });

      console.log(filterAds);

      var uniqueAds =
        filterAds.filter(function (ad, i) {
          return filterAds.indexOf(ad) === i;
        });
      console.log(uniqueAds)
      render.filteredAds = uniqueAds;
      //удалить все пины не в этой функции
      // вызвать setPins
    }
  };

  houseType.addEventListener('change', function (evt) {
    var target = evt.target;
    console.log(evt.target);
    typeValue = target.value;
    window.updateCard();
  });

  housePrice.addEventListener('change', function (evt) {
    var target = evt.target;
    priceValue = target.value;
    window.updateCard();
  });
})();
