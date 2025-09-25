$(function () {
    $(window).on('scroll', function () {
        var heroHeight = $('.hero').height();
        var scrollPosition = $(window).scrollTop();
        var navbarHeight = $('#mainNav').outerHeight();

        if (scrollPosition > heroHeight - navbarHeight) {
            $('#mainNav').addClass('navbar-scrolled');
        } 
        else {
            $('#mainNav').removeClass('navbar-scrolled');
        }
    });
});