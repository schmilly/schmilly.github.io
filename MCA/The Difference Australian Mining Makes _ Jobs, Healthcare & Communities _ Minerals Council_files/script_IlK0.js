/* ======
 Fixed Header
 ====== */
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("header__fixed-header");
  } else {
    header.classList.remove("header__fixed-header");
  }
});

/* ======
 Mobile Menu Toggle
 ====== */
jQuery(document).ready(function ($) {

  function initMobileMenu() {
    if (window.innerWidth <= 991 && !document.body.classList.contains('mobile-menu-init')) {
      document.body.classList.add('mobile-menu-init');

      const navbarToggler = document.querySelector('.navbar-toggler');
      const menu = document.querySelector('.header__navbar_menu');

      if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
          navbarToggler.classList.toggle('button-toggled');

          const navbarContainer = navbarToggler.closest('.navbar-container');
          if (navbarContainer) {
            navbarContainer.classList.toggle('navbar-expanded');

            const menuContainer = navbarContainer.querySelector('.header__navbar--container');
            if (menuContainer) {
              menuContainer.classList.toggle('menu-toggled');
            }
          }
        });
      }

      if (menu) {
        let baseCount = menu.children.length;
        const expandedMap = new WeakMap();
        let grandChildCount = 0;

        function setMenuVars() {
          menu.style.setProperty('--menu--childs', baseCount);
          menu.style.setProperty('--menu--grand--childs', grandChildCount);
        }

        setMenuVars();

        const toggleLinks = menu.querySelectorAll('.menu-item-has-children > a');
        toggleLinks.forEach(link => {
          const parentItem = link.parentElement;
          expandedMap.set(parentItem, false);

          link.addEventListener('click', (e) => {
            e.preventDefault();

            const subMenu = link.nextElementSibling;
            if (!subMenu) return;

            const isExpanded = expandedMap.get(parentItem);
            const subChildrenCount = subMenu.querySelectorAll(':scope > li').length;

            subMenu.classList.toggle('submenu-open', !isExpanded);

            if (!isExpanded) {
              grandChildCount += subChildrenCount;
            } else {
              grandChildCount -= subChildrenCount;
            }

            expandedMap.set(parentItem, !isExpanded);
            setMenuVars();
          });

          link.addEventListener('touchend', function (e) {
            e.preventDefault();
            link.click();
          });
        });

        const mo = new MutationObserver(() => {
          baseCount = menu.children.length;
          setMenuVars();
        });
        mo.observe(menu, { childList: true });
      }
    }

    else if (window.innerWidth > 991 && document.body.classList.contains('mobile-menu-init')) {
      document.body.classList.remove('mobile-menu-init');
    }
  }

  initMobileMenu();

  window.addEventListener('resize', () => {
    initMobileMenu();
  });


});

/* ======
 Custom Video Player
 ====== */
document.addEventListener("DOMContentLoaded", function () {
  const video =
    document.getElementById("banner-video") ||
    document.querySelector(".hero__banner_video video") ||
    document.querySelector("video");

  if (!video) return;

  const playButton = document.getElementById("play-button");
  const soundToggle = document.getElementById("sound-toggle");
  const icon = soundToggle ? soundToggle.querySelector("i") : null;

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  let clickLocked = false;
  let isVideoInView = false;

  video.removeAttribute("autoplay");

  function safePlay() {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  setTimeout(() => {
    video.muted = true;
    safePlay();
  }, 2000);

  if (playButton) {
    if (isTouchDevice) {
      playButton.classList.add("hidden");
    } else {
      video.removeAttribute("controls");
    }

    playButton.addEventListener("click", () => {
      video.dataset.userInteracted = "true";
      video.muted = false;
      safePlay();
      playButton.classList.add("hidden");
    });
  }

  video.addEventListener("click", () => {
    if (clickLocked) return;

    if (video.paused) {
      safePlay();
    } else {
      video.pause();
      clickLocked = true;
      setTimeout(() => (clickLocked = false), 300);
    }
  });

  video.addEventListener("playing", () => {
    if (!isTouchDevice && playButton) {
      playButton.classList.add("hidden");
    }
  });

  video.addEventListener("pause", () => {
    if (!isTouchDevice && playButton) {
      playButton.classList.remove("hidden");
    }
  });

  function isTabActive() {
    return document.visibilityState === "visible";
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVideoInView = entry.isIntersecting;

        if (isVideoInView && isTabActive()) {
          safePlay();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(video);

  document.addEventListener("visibilitychange", () => {
    if (isTabActive() && isVideoInView) {
      safePlay();
    } else {
      video.pause();
    }
  });

  if (soundToggle && icon) {
    soundToggle.addEventListener("click", () => {
      video.muted = !video.muted;
      icon.className = video.muted
        ? "fa-solid fa-volume-xmark"
        : "fa-solid fa-volume-up";

      safePlay();
    });
  }
});

/* ======
 Fact Background Sync
 ====== */
const factsSync = document.getElementsByClassName("facts__wrapper_card");

if (factsSync) {
  jQuery(function ($) {
    const $cards = $('.facts__wrapper_card');

    $cards.first().addClass('is-active');

    $cards.on('mouseenter', function () {
      $cards.removeClass('is-active');
    });
  });
}

/* ======
 Fact Carousel
 ====== */
(function ($) {
  const $carousel = $(".facts__wrapper");

  if (!$carousel.length) return;

  const mq = window.matchMedia("(max-width: 991.98px)");
  let owlInitialized = false;

  function toggleCarousel(e) {
    if (e.matches) {
      if (!owlInitialized) {
        $carousel.owlCarousel({
          loop: true,
          autoplay: false,
          autoplayTimeout: 9000,
          autoplaySpeed: 1000,
          margin: 0,
          items: 2,
          nav: false,
          navText: [
            '<i class="fa-solid fa-chevron-left"></i> Latest',
            'Previous <i class="fa-solid fa-chevron-right"></i>',
          ],
          dots: false,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 1,
              dots: true
            },
            768: {
              items: 2,
              dots: true
            }
          }
        });

        owlInitialized = true;
      }
    }

    else {
      if (owlInitialized) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.removeClass("owl-loaded owl-hidden");
        $carousel.find(".owl-stage-outer").children().unwrap();
        owlInitialized = false;
      }
    }
  }

  toggleCarousel(mq);

  mq.addEventListener("change", toggleCarousel);

})(jQuery);

/* ======
 Modal Video
 ====== */
const modalVideo = document.getElementsByClassName("supporting__wrapper_facts-container_facts-modal");

if (modalVideo) {
  document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.supporting__wrapper_facts-container_facts-modal');

    modals.forEach(function(modal) {
      modal.addEventListener('hidden.bs.modal', function () {
        const iframe = modal.querySelector('iframe');

        if (iframe) {
          const src = iframe.src;
          iframe.src = '';
          iframe.src = src;
        }
      });
    });
  });
}

/* ======
 Auto Open Bootstrap Modal for EDMs
 ====== */
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;

  if (hash !== "#register-interest-modal") return;

  const modalElement = document.querySelector(hash);
  if (!modalElement) return;

  const referrer = document.referrer;
  const isExternal = !referrer && !referrer.includes(window.location.hostname);

  if (isExternal) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
});

/* ======
 Comment Carousel
 ====== */
const commentCarousel = document.getElementsByClassName("comments-section__wrapper_facts-container_facts-slider");

if (commentCarousel) {
  jQuery(document).ready(function ($) {
    const sliderClass = ".comments-section__wrapper_facts-container_facts-slider";

    const mobileBreakpoint = 992;

    let owlInitialized = false;
    let animationFrame = null;
    let isScrolling = false;
    let scrollAccumulator = 0;

    const slider = document.querySelector(sliderClass);

    if (!slider) return;

    const desktopSpeed = 0.75;
    const touchSpeed = 0.35;

    function isTouchDevice() {
      return window.matchMedia("(hover: none)").matches;
    }

    function autoScroll() {
      if (isScrolling) return;

      isScrolling = true;

      function step() {
        const speed = isTouchDevice() ? touchSpeed : desktopSpeed;

        scrollAccumulator += speed;

        const move = Math.floor(scrollAccumulator);

        if (move > 0) {
          slider.scrollLeft += move;
          scrollAccumulator -= move;
        }

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth
        ) {
          slider.scrollLeft = 0;
        }

        animationFrame = requestAnimationFrame(step);
      }

      animationFrame = requestAnimationFrame(step);
    }

    function stopScroll() {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      isScrolling = false;
    }

    function mouseEnterHandler() {
      autoScroll();
    }

    function mouseLeaveHandler() {
      stopScroll();
    }

    function touchClickHandler() {
      if (isScrolling) {
        stopScroll();
      } else {
        autoScroll();
      }
    }

    function enableDesktopMode() {
      stopScroll();

      if (isTouchDevice()) {
        autoScroll();

        slider.addEventListener("click", touchClickHandler);
      } else {
        slider.addEventListener("mouseenter", mouseEnterHandler);
        slider.addEventListener("mouseleave", mouseLeaveHandler);
        slider.addEventListener("click", touchClickHandler);
      }
    }

    function disableDesktopMode() {
      stopScroll();

      slider.removeEventListener("mouseenter", mouseEnterHandler);
      slider.removeEventListener("mouseleave", mouseLeaveHandler);
      slider.removeEventListener("click", touchClickHandler);
    }

    function enableOwl() {
      if (owlInitialized) return;

      $(sliderClass).owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplaySpeed: 2000,
        autoplayHoverPause: true,
        margin: 25,
        nav: true,
        navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>',],
        dots: false,
        responsive: {
          0: {
            items: 1,
            margin: 0,
          },
          768: {
            items: 2,
          }
        }
      });

      owlInitialized = true;
    }

    function disableOwl() {
      if (!owlInitialized) return;

      $(sliderClass).trigger("destroy.owl.carousel");

      $(sliderClass).removeClass("owl-loaded");

      $(sliderClass).find(".owl-stage-outer").children().unwrap();

      owlInitialized = false;
    }

    function refreshSliderMode() {
      const screenWidth = window.innerWidth;

      stopScroll();

      disableDesktopMode();

      if (screenWidth < mobileBreakpoint) {
        enableOwl();
      } else {
        disableOwl();

        enableDesktopMode();
      }
    }

    refreshSliderMode();

    let resizeTimer;

    $(window).on("resize orientationchange", function () {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(function () {
        refreshSliderMode();
      }, 250);
    });

    const pointerQuery = window.matchMedia("(hover: none)");

    pointerQuery.addEventListener("change", function () {
      refreshSliderMode();
    });
  });
}

/* ======
 Career Page Redirection with Countdown
 ====== */
const pageRedirection = document.getElementById('countdown');

if (pageRedirection) {
  const modalEl = document.getElementById('thankyou-modal');
  const countdownEl = document.getElementById('countdown');
  const redirectUrl = "https://minerals.org.au/careers/";

  modalEl.addEventListener('shown.bs.modal', function () {
    let seconds = 10;
    countdownEl.textContent = seconds;

    const countdownTimer = setInterval(function () {
      seconds--;
      countdownEl.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(countdownTimer);
        window.location.href = redirectUrl;
      }
    }, 1000);
  });
}

/* ======
 Comment Slider Read More Toggle
 ====== */
document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.read-more-toggle');

  function checkAndSetButtonVisibility(button, copyElement) {
    const maxHeightLimit = 125;
    const scrollHeight = copyElement.scrollHeight;

    if (scrollHeight > maxHeightLimit) {
      button.style.display = 'inline-block';
    } else {
      button.style.display = 'none';
    }
  }

  toggleButtons.forEach(button => {
    const container = button.closest('.comments-section__wrapper_facts-container_facts-slider-wrapper-copy-container');
    const copyElement = container.querySelector('.comments-section__wrapper_facts-container_facts-slider-wrapper-copy');

    checkAndSetButtonVisibility(button, copyElement);

    button.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        copyElement.style.maxHeight = '125px';
        copyElement.style.overflow = 'hidden';
        this.textContent = 'Read More';
        this.setAttribute('aria-expanded', 'false');
      } else {
        copyElement.style.maxHeight = 'none';
        copyElement.style.overflow = 'visible';
        this.textContent = 'Read Less';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  window.addEventListener('resize', function() {
    toggleButtons.forEach(button => {
      const container = button.closest('.comments-section__wrapper_facts-container_facts-slider-wrapper-copy-container');
      const copyElement = container.querySelector('.comments-section__wrapper_facts-container_facts-slider-wrapper-copy');
      checkAndSetButtonVisibility(button, copyElement);
    });
  });
});

/* ======
 Event Page Social Share Icons
 ====== */
const socialShare = document.getElementsByClassName('social-share__icon');

if (socialShare) {
  jQuery('.social-share__icon').on('click', function (e) {
    e.preventDefault();
    const platform = jQuery(this).data('platform');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Demystifying the 2026 Federal Budget - MCA Event');
    let shareUrl = '';

    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

    if (shareUrl){

      const width = 800;
      const height = 500;

      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);

      window.open(
        shareUrl,
        'shareWindow',
        `width=${width},height=${height},top=${top},left=${left},noopener,noreferrer`
      );

    }
  });
}

/* ======
 Number Count
 ====== */
document.addEventListener("DOMContentLoaded", () => {
  const statSelectors = [
    '.contribution-stats__card-number'
  ];

  const stats = document.querySelectorAll(statSelectors.join(','));

  if (!stats.length) return;

  // Wrap numbers with span
  stats.forEach(el => {
    el.innerHTML = el.innerHTML.replace(
      /(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/g,
      '<span class="stat-number" data-target="$1">0</span>'
    );
  });

  const counters = document.querySelectorAll(".stat-number");

  const animateCount = (el, target, duration = 3000) => {
    const decimals = (target.toString().split('.')[1] || '').length;

    const startTime = performance.now();

    const updateCount = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = target * progress;

      el.textContent = current.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        const target = parseFloat(
          el.dataset.target.replace(/,/g, "")
        );

        animateCount(el, target);

        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.6
  });

  counters.forEach(counter => observer.observe(counter));
});