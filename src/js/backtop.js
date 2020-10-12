define(['jquery'], function() {
    return {
        tab: ! function() {
            $('.detail_floating .items_s').on('click', function() {
                $('html').animate({
                    scrollTop: 0 //运动不仅可以改变css，还可以设置html属性
                });
            });
        }()
    }
});