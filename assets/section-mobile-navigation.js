document.querySelectorAll('[data-section-type="mobile-navigation"]').forEach(function(container){

  if ( !document.querySelector('.mobile-nav__mobile-header .js-mini-cart-trigger') ) return false;
  document.querySelector('.mobile-nav__mobile-header .js-mini-cart-trigger').addEventListener("click", function() {
    WAU.Slideout._closeByName("slideout-mobile-navigation");
  });
});

document.addEventListener("shopify:section:select", function(event) {
  if ( !event.target.querySelector('[data-section-type="mobile-navigation"]') ) return false;
  WAU.Slideout._openByName("slideout-mobile-navigation");
});

document.addEventListener("shopify:section:deselect", function(event) {
  if ( !event.target.querySelector('[data-section-type="mobile-navigation"]') ) return false;
  WAU.Slideout._closeByName("slideout-mobile-navigation");
});

document.addEventListener("shopify:block:select", function(event) {
  if ( !event.target.querySelector('[data-section-type="mobile-navigation"]') ) return false;
  WAU.Slideout._openByName("slideout-mobile-navigation");
});
