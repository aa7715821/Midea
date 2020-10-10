require(['config'], function() {
    require(['jquery', 'jq_cookie'], function() {
        ! function($) {
            let sid = location.search.substring(1).split('=')[1];
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
                $('.spic img').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                let picarr = data.piclisturl.split(','); //数据转换成数组
                let strhtml = '';
                $.each(picarr, function(index, value) {
                    strhtml += `
                        <li>
                            <img src="${value}"/>
                        </li>
                    `;
                });
                $('.list ul').html(strhtml);
            });

            // // 购物车
            // let arrsid = []; //商品的sid
            // let arrnum = []; //商品数量

            // //提前设定cookie的键值
            // //目的就是判断商品是第一次添加进购物车，还是多次。
            // function getcookie() {
            //     if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
            //         arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
            //         arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
            //     } else { //cookie不存在
            //         arrsid = [];
            //         arrnum = [];
            //     }
            // }

            // $('.p-btn a').on('click', function() {
            //     getcookie(); //如果cookie存在，取到cookie，转换成数组

            //     if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
            //         arrsid.push(sid); //添加当前商品的sid
            //         $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
            //         arrnum.push($('#count').val()); //添加商品的数量
            //         $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
            //     } else { //存在,商品的数量累加
            //         //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
            //         let index = $.inArray(sid, arrsid); //sid在数组中的位置
            //         let num = parseInt(arrnum[index]); //sid对应的数量
            //         //原来的数量+新添加数量，一起存入cookie
            //         arrnum[index] = num + parseInt($('#count').val()); //原来的数量+新添加数量进行赋值
            //         $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
            //     }
            // })


        }(jQuery)
    })
})