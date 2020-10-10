require(['config'], function() {
    require(['jquery'], function() {
        ! function($) {
            // 手机二维码
            $(".icon_phone1").hover(function() {
                $(".wx img").show();
            }, function() {
                $(".wx img").hide();
            });

            // 购物车显示效果
            $(".icon_cart").hover(function() {
                $(".cart_login").show();
            }, function() {
                $(".cart_login").hide();
            })

            $(".cart_login").hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });

        }(jQuery)
    })
})