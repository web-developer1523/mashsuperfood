const SELECTOR = '[data-section-type="product"].featured-product';

function loadAssets(container) {

  const loader = new WAU.Helpers.scriptLoader();

  loader.load([jsAssets.flickity]).finally(() => {

    if ( container.dataset.productVideo === 'true' ) {
      loader.load([jsAssets.productVideo]).finally(() => {});
    }
    if ( container.dataset.productModel === 'true' ) {
      loader.load([jsAssets.productModel]).finally(() => {});
    }
    if ( container.dataset.clickToEnlarge === 'true' ) {
      loader.load([jsAssets.zoom]).finally(() => {});
    }
    if (container.dataset.productComplementaryProducts === 'true') {
      loader.load([jsAssets.productComplementaryProducts]).finally(() => {});
    }
    if (container.dataset.productPickupAvailability === 'true') {
      loader.load([jsAssets.productPickupAvailability]).finally(() => {});
    }

    loader.load([jsAssets.product]).finally(() => {});
  });
};

document.querySelectorAll(SELECTOR)?.forEach(function(container) {
  loadAssets(container);
});

document.addEventListener("shopify:section:select", function(event) {
  if (event.target.querySelector('[data-section-type="product"]')) {
    loadAssets(event.target);
  }
});

document.addEventListener("shopify:block:select", function(event) {
  if (event.target.querySelector('[data-section-type="product"]')) {
    loadAssets(event.target);
  }
});
