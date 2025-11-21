document.addEventListener('DOMContentLoaded', () => {

  // --- Modal Image ---
  function showImage(src) {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
      modalImage.src = src;
    }
  }

  // --- Carousel Track Auto Scroll ---
  const track = document.querySelector('.carousel-track');
  if (track) {
    let scrollAmount = 0;
    let speed = 1;
    let animation;

    function startCarousel() {
      animation = setInterval(() => {
        scrollAmount += speed;
        if (scrollAmount >= track.scrollWidth / 2) {
          scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
      }, 10);
    }

    track.addEventListener('mouseenter', () => clearInterval(animation));
    track.addEventListener('mouseleave', () => startCarousel());

    startCarousel();
  }

  // --- AOS Init ---
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide'
    });
  }

  // --- jQuery Plugins ---
  (function ($) {
    "use strict";

    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });

    // full height
    const fullHeight = function () {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });
    };
    fullHeight();

    // loader
    const loader = function () {
      setTimeout(function () {
        if ($('#ftco-loader').length > 0) {
          $('#ftco-loader').removeClass('show');
        }
      }, 1);
    };
    loader();

    // Scrollax
    if ($.Scrollax) { $.Scrollax(); }

    // Owl Carousel
    const carousel = function () {
      $('.home-slider').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 0,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: false,
        autoplayHoverPause: false,
        items: 1
      });

      $('.carousel-testimony').owlCarousel({
        autoplay: true,
        center: true,
        loop: true,
        items: 1,
        margin: 30,
        stagePadding: 0,
        nav: false,
        responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 2 } }
      });
    };
    carousel();

    // Dropdown hover/click
    $('nav .dropdown').hover(
      function () {
        $(this).addClass('show');
        $(this).find('.dropdown-menu').addClass('show');
        $(this).find('> a').attr('aria-expanded', true);
      }, 
      function () {
        $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
        $(this).find('> a').attr('aria-expanded', false);
      }
    );

    $('nav .dropdown > a').on('click', function (e) {
      e.preventDefault();
      const $this = $(this).parent('.dropdown');
      const dropdownMenu = $this.find('.dropdown-menu');
      if ($this.hasClass('show')) {
        $this.removeClass('show');
        dropdownMenu.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
      } else {
        $('nav .dropdown').removeClass('show');
        $('nav .dropdown-menu').removeClass('show');
        $('nav .dropdown > a').attr('aria-expanded', false);
        $this.addClass('show');
        dropdownMenu.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
      }
    });

    $(document).on('click touchstart', function (e) {
      if (!$(e.target).closest('nav .dropdown').length) {
        $('nav .dropdown').removeClass('show');
        $('nav .dropdown-menu').removeClass('show');
        $('nav .dropdown > a').attr('aria-expanded', false);
      }
    });

    // Scroll effects
    const scrollWindow = function () {
      $(window).scroll(function () {
        const st = $(this).scrollTop();
        const navbar = $('.ftco_navbar');
        const sd = $('.js-scroll-wrap');

        if (st > 150) navbar.addClass('scrolled'); 
        else navbar.removeClass('scrolled sleep');

        if (st > 350) {
          navbar.addClass('awake');
          sd.addClass('sleep');
        } else {
          navbar.removeClass('awake').addClass('sleep');
          sd.removeClass('sleep');
        }
      });
    };
    scrollWindow();

    // Counter
    const counter = function () {
      $('#section-counter').waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          const comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
          $('.number').each(function () {
            const $this = $(this), num = $this.data('number');
            $this.animateNumber({ number: num, numberStep: comma_separator_number_step }, 7000);
          });
        }
      }, { offset: '95%' });
    };
    counter();

    // Content WayPoint animations
    const contentWayPoint = function () {
      let i = 0;
      $('.ftco-animate').waypoint(function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          i++;
          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .ftco-animate.item-animate').each(function (k) {
              const el = $(this);
              setTimeout(function () {
                const effect = el.data('animate-effect');
                if (effect === 'fadeIn') el.addClass('fadeIn ftco-animated');
                else if (effect === 'fadeInLeft') el.addClass('fadeInLeft ftco-animated');
                else if (effect === 'fadeInRight') el.addClass('fadeInRight ftco-animated');
                else el.addClass('fadeInUp ftco-animated');
                el.removeClass('item-animate');
              }, k * 50, 'easeInOutExpo');
            });
          }, 100);
        }
      }, { offset: '95%' });
    };
    contentWayPoint();

    // Magnific popup
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      gallery: { enabled: true, navigateByImgClick: true, preload: [0,1] },
      zoom: { enabled: true, duration: 300 }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

    // Datepicker / Timepicker
    $('.appointment_date').datepicker({ 'format': 'm/d/yyyy', 'autoclose': true });
    $('.appointment_time').timepicker();

  })(jQuery);


  // --- 3D Carousel Update ---
  function update3DCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let activeIndex = [...items].findIndex(i => i.classList.contains('active'));

    items.forEach(i => i.classList.remove("prev-item", "next-item"));

    const prevIndex = (activeIndex - 1 + items.length) % items.length;
    const nextIndex = (activeIndex + 1) % items.length;

    items[prevIndex].classList.add("prev-item");
    items[nextIndex].classList.add("next-item");
  }

  const myCarousel = document.getElementById('myCarousel');
  if (myCarousel) {
    $('#myCarousel').on('slid.bs.carousel', update3DCarousel);
    update3DCarousel();
  }

}); // end DOMContentLoaded
