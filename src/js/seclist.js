define(['jquery'], function() {
    return {
        seclist: ! function() {
            // 1.鼠标经过li，cartlist显示，否则隐藏。
            $('.nav .side li').hover(function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('.cartlist').show();
                //3.切换li元素，cartlist里面内容跟着切换(索引匹配)
                $('.cartlist .item').eq($(this).index()).show().siblings().hide();

            }, function() {
                $('.cartlist').hide();
                $(this).removeClass('active')
            });
            //2.cartlist显示，鼠标经过cartlist，显示自身，否则隐藏。
            $('.cartlist').hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });
        }()
    }
});