define(['jquery', 'jq_cookie'], function() {
    return {
        main: ! function() {
            var sid = location.search.substring(1).split('=')[1];
            //判断sid是否存在
            if (!sid) {
                sid = 1;
            }
            // 链接数据库，渲染购物车
            $.ajax({
                url: 'http://localhost/8-17_HTML/Midea/php/getsid.php',
                data: {
                    datasid: sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(1);
                $('.spic img').attr('src', data.url);
                $('.bf img').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                var picarr = data.piclisturl.split(','); //数据转换成数组
                var strhtml = '';
                $.each(picarr, function(index, value) {
                    strhtml +=
                        '<li><img src=' + value + '></li>';
                });
                $('.list .Chart').html(strhtml);
            });

            // 数量加减
            $('.plus').click(function() {
                $('.num').val(Number($('.num').val()) + 1);
            })
            $('.mins').click(function() {
                $('.num').val(Number($('.num').val()) - 1);
                if ($('.num').val() == 0) {
                    $('.num').val(1)
                }
            })

            // 购物车下单商品存储到cookie

            var arrnum = [];
            var arrsid = [];

            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                    arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                } else { //cookie不存在
                    arrsid = [];
                    arrnum = [];
                }
            }

            $('.p-btn a').on('click', function() {
                getcookie(); //如果cookie存在，取到cookie的值，并且变成了数组。
                //如果arrsid里面存在当前商品的sid，说明商品已经存在，否则商品是第一次购买。
                //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
                //value:查找的值
                //array:数组
                if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
                    arrsid.push(sid); //添加当前商品的sid
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                    arrnum.push($('.num').val()); //添加商品的数量
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                } else { //存在,商品的数量累加
                    //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
                    var index = $.inArray(sid, arrsid); //sid在数组中的位置
                    var num = parseInt(arrnum[index]); //sid对应的数量
                    //原来的数量+新添加数量，一起存入cookie
                    arrnum[index] = num + parseInt($('.num').val()); //原来的数量+新添加数量进行赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                }


            })

        }()
    }
});