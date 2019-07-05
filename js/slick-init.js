$(document).ready(function() {
    const observer = lozad('.lozad', {
        rootMargin: '40px 40px', // syntax similar to that of CSS Margin
        threshold: 0.1 // ratio of element convergence
    });
    observer.observe();

    $('#partnership').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        speed: 4000,
        infinite: true,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 80000,
        fade: true,
        prevArrow: $('.review-slick-prev'),
        nextArrow: $('.review-slick-next')
    });

    //Count years

    $('.anim-years-count').each(function() {
        var $this = $(this);
        $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
                duration: Math.round(+Math.random().toFixed(3) * 5000 + 1000),
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter));
                }
            }
        );
    });
});
