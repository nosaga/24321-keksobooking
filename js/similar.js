'use strict';
var filters = document.querySelector('form');
var houseType = filters.elements.namedItem('housing-type');
var housePrice = filters.elements.namedItem('housing-price');

houseType.addEventListener('change', function () {
  var target = event.target;
  houseType.value = target.value;
  console.log(houseType.value);
  window.updateCard(houseType.value);
});

housePrice.addEventListener('change', function () {
  var target = event.target;
  housePrice.value = target.value;
  console.log(housePrice.value);
  window.updateCard(housePrice.value);
});


(function () {
  var render = window.render;
  window.updateCard = function (typeValue, typePrice) {
    typeValue = houseType.value;
    typePrice = housePrice.value;
    if (typeValue === 'any' && typePrice === 'any') {
      render.filteredAds = render.ads;
    } else {
      var sameTypesAndPrice = render.ads.filter(function (ad) {
        return ad.offer.type === typeValue && ad.offer.price < 10000 ||
          ad.offer.price > 50000 ||
          ad.offer.price >= 10000 && ad.offer.price <= 50000;
      });
      var sameTypes = render.ads.filter(function (ad) {
        return ad.offer.type === typeValue;
        console.log(sameTypes);
      });
      var samePrice = render.ads.filter(function (ad) {
        if (typePrice === 'low') {
          return ad.offer.price < 10000;
        } else if (typePrice === 'high') {
          return ad.offer.price > 50000;
        } else {
          return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        }
      });
      var filterAds = sameTypesAndPrice;
      filterAds = filterAds.concat(sameTypes);
      filterAds = filterAds.concat(samePrice);
      console.log(filterAds);
      var uniqueAds =
      filterAds.filter(function (ad, i) {
        return filterAds.indexOf(ad) === i;
      });
      render.filteredAds = uniqueAds;
      return render.filteredAds;
    }
  };
})();
