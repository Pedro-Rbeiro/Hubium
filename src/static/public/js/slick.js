$(document).ready(() => {
  $('.carousel-container').slick({
    dots: true,
    infinite: false,
    speed: 300,
    cssEase: 'cubic-bezier(.25,.1,.25,1)',
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [{
      breakpoint: 2561,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 10,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 2200,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: true
      }
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.carousel-promote').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    cssEase: 'cubic-bezier(.25,.1,.25,1)',
  });
})