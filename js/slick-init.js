$(document).ready(function() {
    const observer = lozad('.lozad', {
        rootMargin: '40px 40px', // syntax similar to that of CSS Margin
        threshold: 0.1 // ratio of element convergence
    });
    observer.observe();

    //Слайдер наших клиентов
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
    //Слайдер отзывов
    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        fade: true,
        prevArrow: $('.review-slick-prev'),
        nextArrow: $('.review-slick-next')
    });

    //Кнопки Свернуть-Развернуть
    $('#collapseLinks').on('hidden.bs.collapse', function() {
        $('.btn-collapse').html(
            "Развернуть <i class='fa fa-chevron-down' aria-hidden='true'></i>"
        );
    });

    $('#collapseLinks').on('show.bs.collapse', function() {
        $('.btn-collapse').html(
            "Свернуть <i class='fa fa-chevron-up' aria-hidden='true'></i>"
        );
    });
});
