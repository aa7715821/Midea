define(['jquery'], function() {
    return {
        tab: ! function() {
            // 1.鼠标滑过price，价格选择框显示，滑出隐藏
            $(".price").hover(function() {
                    $(".Price_choice").show();
                }, function() {
                    $(".Price_choice").hide();
                })
                // 2.鼠标滑到Price_choice价格选择框不消失，滑出消失
            $(".Price_choice").hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
                // $(this).removeClass('.Price_choice') //此行代码作废-暂不删除
            });
        }()
    }
});