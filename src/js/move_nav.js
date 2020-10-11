require(['config'], function() {
    require(['jquery'], function() {
        ! function($) {
            $(window).on('scroll', function() {
                let $top = $(window).scrollTop(); //滚动条顶部的偏移
                if ($top >= 200) {
                    $('.move_nav').stop(true).animate({
                        top: 0
                    });
                } else {
                    $('.move_nav').stop(true).animate({
                        top: -80
                    });
                }
            });
        }(jQuery)
    })
})