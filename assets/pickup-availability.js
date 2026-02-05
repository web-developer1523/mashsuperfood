// TODO: Add intersection observer
if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', class PickupAvailability extends HTMLElement {
    constructor() {

      super();

      this.variantId = this.dataset.variantId;
      this.productTitle = this.dataset.productTitle;
      this.hasOnlyDefaultVariant = (this.dataset.hasOnlyDefaultVariant === 'true') ? true : false;
      this.baseUrl = this.dataset.baseUrl;

      this.loadAvailability(this.variantId, this.productTitle);
    }

    set instance(instance) {
      if (!instance) return false;
      this.events = instance;
      this.handleEvents();
    }

    get instance() {
      return this.events;
    }

    handleEvents() {
      if (this.events) {
        this.events.on("storeavailability:variant", (id, title) => {
          this.loadAvailability(id, title)
        });

        this.events.on("storeavailability:unavailable", () => {
          this.style.display = 'none';
        });
      }
    }

    loadAvailability(id, title) {

      const container = this;
      const blockId = this.dataset.blockId;
      const variantSectionUrl = this.baseUrl + '/variants/' + id + '/?section_id=pickup-availability';
      container.innerHTML = '';
      const newStr = `store-availability--${blockId}`;

      fetch(variantSectionUrl)
      .then((response) => {
        return response.text();
      })
      .then((storeAvailabilityHTML) => {

        if (storeAvailabilityHTML.trim() === '') {
          console.warn('Error, no HTML content returned.');
          return;
        }

        container.innerHTML = storeAvailabilityHTML;
        container.innerHTML = container.firstElementChild.innerHTML;

        // Update buttons
        container.querySelectorAll('[popovertarget]')?.forEach((button) => {
          button.setAttribute('popovertarget', newStr);
        });

        // Update Slideout Id
        container.querySelector('[id^=store-availability--]')?.setAttribute('id', newStr);

        container.style.opacity = 1;

        container.style.display = "block";

        // Get container element
        const containerEl = container.querySelector('.store-availability-container');

        // Set display
        if (containerEl) {
          containerEl.classList.remove('fadeOut');
          containerEl.classList.display = "block";
        }

        // Get content
        const content = container.querySelector('.store-availability__pickup-details');

        // Fade in content
        if (content) {
          content.classList.add('fadeIn');
        }

        if ( document.querySelector('[data-pick-up-available="false"]') ) {
          container.style.display = "none";
          console.warn('Error. No pickup available with data attribute set to true.');
          return false;
        } else {
          container.style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.warn(error);
      });

    }
  });
}
