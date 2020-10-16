define(['jquery', 'jq_lazyload'], function() {
    return {
        detail: ! function() {
            var list = $('.list .list-detail');
            $.ajax({ //获取远程接口的值
                url: 'http://localhost/8-17_HTML/Midea/php/detail.php',
                dataType: 'json'
            }).done(function(data) {
                var strhtml = '';
                $.each(data, function(index, value) { //遍历数组和对象
                    strhtml +=
                        '<a href="detail.html?sid=' + value.sid + '"><li><img class="lazy" data-original=' + value.url + ' width="200" height="200" ><p>' + value.title + '</p><span class="sort">￥' + value.price + '</span><span>销量：' + value.sailnumber + '件</span><em>自营</em><i>用券减50</i></li></a>';
                });
                list.html(strhtml); //追加数据
                //实现懒加载效果
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            })
        }()
    }
});