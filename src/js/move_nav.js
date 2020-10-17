define(['jquery'], function() {
    return {
        move: ! function() {
            $(window).on('scroll', function() {
                var $top = $(window).scrollTop(); //滚动条顶部的偏移
                if ($top >= 100) {
                    $('.move_nav').stop(true).animate({
                        top: 0
                    });
                } else {
                    $('.move_nav').stop(true).animate({
                        top: -80
                    });
                }
            });
        }()
    }
});