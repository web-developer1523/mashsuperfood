VideoControls = {
  init(container) {
    const buttons = container.querySelectorAll('.js-play-video');

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const posterWrapper = button.closest('.featured-video-image');
        const itemInner = button.closest('.featured-video-wrapper');
        const video = itemInner.querySelector('.js-video');
        const videoType = button.getAttribute('data-video-type');

        console.log(videoType);

        if (!posterWrapper) return;

        // Hide the poster overlay
        posterWrapper.classList.add('hidden');

          if (!video) return;

          // Start playback manually on click
          video.play();

          // Optional: clicking video pauses it and re-shows overlay
          video.addEventListener('click', function handleClick() {
            video.pause();
            posterWrapper.classList.remove('hidden');
            video.removeEventListener('click', handleClick);
          });
      });
    });
  }
};


document.querySelectorAll('[data-section-type="featured-video"]').forEach(function(container){
  if ( container.querySelectorAll('.js-play-video').length > 0 ) {
    VideoControls.init(container);
  }
});

document.addEventListener("shopify:section:select", function(event) {
  if ( !event.target.querySelector('[data-section-type="featured-video"]') ) return false;
  var container = event.target.querySelector('[data-section-type="featured-video"]');
  VideoControls.init(container);
});